from groq import Groq
import os
from dotenv import load_dotenv
from fastapi import  HTTPException


load_dotenv()
groq_api_key = os.getenv("GROQ_API_KEY") 
if not groq_api_key:
    raise HTTPException(status_code=500, detail="Groq API key not found in environment")

    
client = Groq(api_key=groq_api_key)


def generate_mcq_from_text(pdf_text: str, num_questions: int = 10):
    prompt = f"""
You are an educational assistant. Based on the academic content below, generate {num_questions} multiple choice questions (MCQs). 

Each question should include:
- A question
- Exactly 4 options
- The correct answer

Return the output in valid JSON like this:
[
  {{
    "question": "What is ...?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "answer": "Option A"
  }},
  ...
] No other statements other than this

Content:
\"\"\"
{pdf_text[:3500]}
\"\"\"
"""


    try:
        response = client.chat.completions.create(
            model="llama3-70b-8192",
            messages=[
                {"role": "system", "content": "You generate high-quality MCQs based on educational text."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
            max_tokens=1024,
        )
        
        reply = response.choices[0].message.content.strip()
        return reply
    except Exception as e:
        print("❌ Error generating MCQs:", e)
        return []
