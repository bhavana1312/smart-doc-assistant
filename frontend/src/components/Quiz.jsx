import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const mode = localStorage.getItem("darkMode") === "true";
    setDarkMode(mode);
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/generate-quiz?email=bhavana13sree@gmail.com`,
          { method: "POST" }
        );
        const data = await res.json();
        if (Array.isArray(data.response)) {
          setQuestions(data.response);
        } else if (typeof data.response === "string") {
          const parsed = JSON.parse(data.response);
          if (Array.isArray(parsed)) setQuestions(parsed);
        }
      } catch (err) {
        console.error("Quiz fetch error:", err);
      }
    };
    fetchQuestions();
  }, []);

  const handleOptionChange = (qIndex, option) => {
    setAnswers({ ...answers, [qIndex]: option });
  };

  const handleSubmit = () => {
    let sc = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.answer) sc++;
    });
    setScore(sc);
    setSubmitted(true);
  };

  const bgGradient = darkMode
    ? "bg-gradient-to-br from-gray-900 via-black to-gray-800"
    : "bg-gradient-to-br from-indigo-100 via-white to-pink-100";

  const cardBg = darkMode
    ? "bg-gray-900 text-white border-gray-700"
    : "bg-white text-gray-800 border-gray-200";

  return (
    <div
      className={`min-h-screen flex flex-col items-center px-4 sm:px-6 lg:px-8 py-10 ${bgGradient}`}
    >
      <motion.h2
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`text-3xl font-bold mb-8 ${
          darkMode ? "text-white" : "text-indigo-700"
        }`}
      >
        🧠 Quiz Time!
      </motion.h2>

      {!submitted && questions.length === 0 && (
        <motion.p
          className="text-gray-600 dark:text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Loading questions...
        </motion.p>
      )}

      {!submitted && questions.length > 0 && (
        <motion.div
          className="w-full max-w-3xl space-y-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {questions.map((q, idx) => (
            <motion.div
              key={idx}
              className={`p-6 rounded-3xl border shadow-md ${cardBg}`}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4 }}
            >
              <p className="font-semibold text-lg mb-4">
                {idx + 1}. {q.question}
              </p>
              <div className="space-y-2">
                {q.options.map((opt, oIdx) => (
                  <label key={oIdx} className="block">
                    <input
                      type="radio"
                      name={`q-${idx}`}
                      value={opt}
                      checked={answers[idx] === opt}
                      onChange={() => handleOptionChange(idx, opt)}
                      className="mr-2"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </motion.div>
          ))}

          <motion.div
            className="text-center"
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.03 }}
          >
            <button
              onClick={handleSubmit}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition"
            >
              Submit Quiz
            </button>
          </motion.div>
        </motion.div>
      )}

      {submitted && (
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-2xl font-semibold text-pink-600 dark:text-pink-300 mb-4">
            🎉 You scored {score} out of {questions.length}
          </p>
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/chat")}
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition"
          >
            Back to Chat
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
