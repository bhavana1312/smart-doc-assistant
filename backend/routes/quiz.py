from fastapi import APIRouter, Request, HTTPException
from db.mongo import users_collection
from services.generate_questions import generate_mcq_from_text


router = APIRouter()

@router.post("/")
async def generate_questions(request: Request):
    body = await request.json()
    email = body.get("email")
    if not email:
        raise HTTPException(status_code=400, detail="Email required")

    user = users_collection.find_one({"email": email})
    if not user or "pdfs" not in user or len(user["pdfs"]) == 0:
        raise HTTPException(status_code=404, detail="No PDFs found for user")

    pdf_text = user["pdfs"][-1]["text"]  # take last uploaded
    questions = generate_mcq_from_text(pdf_text)  # your own function
    print(questions)
    return {"questions": questions}
