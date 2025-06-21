from fastapi import APIRouter
from pydantic import BaseModel
from models.embedder import get_embeddings
from services.vector_store import retrieve_top_k
from groq import Groq
from fastapi.responses import JSONResponse


router = APIRouter()

class QueryRequest(BaseModel):
    question: str
    top_k: int = 3

@router.post("/")
async def query_documents(data: QueryRequest):
    question = data.question
    top_k = data.top_k

    # Step 1: Embed the question
    query_embedding = get_embeddings([question])[0]

    # Step 2: Retrieve top-k similar chunks
    results = retrieve_top_k("documents", query_embedding, top_k)
    chunks = [r["text"] for r in results]

    # Step 3: Format context for LLM
    context = "\n\n".join(chunks)
    prompt = f"""You are a helpful assistant that answers user queries based on the provided document context.

Context:
{context}

Question: {question}
Answer:"""

    # Step 4: Groq LLM call
    client = Groq(api_key="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")

    chat_completion = client.chat.completions.create(
        model="llama3-70b-8192",  # or try "llama3-70b-8192"
        messages=[
            {"role": "system", "content": "Answer questions using only the given context."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.2,
        max_tokens=512
    )

    answer = chat_completion.choices[0].message.content

    return {
        "query": question,
        "results": results,
        "answer": answer
    }


from fastapi import APIRouter, Request, HTTPException
from db.mongo import users_collection
from services.generate_questions import generate_mcq_from_text
@router.post("/generate-quiz")
async def generate_quiz(email: str):
    # print("hi" )
    user = users_collection.find_one({"email": email})
    if not user or "pdfs" not in user or len(user["pdfs"]) == 0:
        raise HTTPException(status_code=404, detail="No PDFs found for user")

    pdf_text = user["pdfs"][-1]["text"]
    response = generate_mcq_from_text(pdf_text)
    # print(questions)
    # return {"response": response}
    return JSONResponse(content={"response": response})