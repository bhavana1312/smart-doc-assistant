📄 Smart Document Assistant

Your intelligent assistant for document understanding, quizzing, and learning analytics.

🔗 Demo: Watch on YouTube

✨ Features

📄 Upload any PDF document

🤖 Ask questions based on the document using RAG (Retrieval-Augmented Generation)

🧠 Get a quiz generated from your document content

📈 View a performance report with weak area detection

📝 Download your results in PDF format

🌙 Dark mode support

🔐 User authentication (register/login)

📊 Visualize your learning with charts

💠 Tech Stack

Frontend

React (Vite)

TailwindCSS + Framer Motion

Recharts for visualizations

React Router

Backend

FastAPI

MongoDB for structured data

Qdrant for vector search

SentenceTransformers for embedding

Groq LLM for response generation

JWT for authentication

📂 Project Structure

smart-doc-assistant/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
├── backend/
│   ├── routes/
│   ├── db/
│   ├── utils/
│   ├── main.py

⚙️ Setup Instructions

1. Clone the repo

git clone https://github.com/your-username/smart-doc-assistant.git
cd smart-doc-assistant

2. Setup Backend (FastAPI)

cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload

Make sure you set your .env with:

MONGO_URI=your_mongo_uri
GROQ_API_KEY=your_groq_api_key

3. Setup Frontend (Vite + React)

cd frontend
npm install
npm run dev

Create a .env in frontend/:

VITE_BACKEND_URL=http://localhost:8000

🧪 End-to-End Features

Register/Login

Upload a PDF

Chat with the document using natural language

Generate Quiz auto-magically based on PDF

Take the quiz, see your score and report

Download your report as a PDF

View weak topic analysis and progress

📚 Example Use Cases

Students revising notes

Employees reviewing internal docs

AI-powered document comprehension

LMS/EdTech document automation

📊 Roadmap



🧑‍💻 Author

Bhavana Sree Naidu Yeluri🔗 Portfolio👨‍💼 GitHub • 💼 LinkedIn

📜 License

This project is licensed under the MIT License.
