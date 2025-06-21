from groq import Groq

client = Groq(api_key="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")  # Replace or use env

def generate_mcq_from_text(pdf_text: str, num_questions: int = 5):
    # print("Quesrions")
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
        return eval(reply) if reply.startswith("[") else []
    except Exception as e:
        print("❌ Error generating MCQs:", e)
        return []
