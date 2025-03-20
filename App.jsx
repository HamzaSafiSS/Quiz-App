import { useState } from "react";
import "./index.css";

function App() {
  return (
    <div className="app-container">
      <h1 className="title">Quiz App</h1>
      <QuizController />
    </div>
  );
}

function QuizController() {
  const questions = [
    {
      question: "What is the Capital of Ethiopia?",
      options: ["Adaba", "Addis Ababa", "Hawassa"],
      correct: "Addis Ababa",
    },
    {
      question: "What is the Capital of Kenya?",
      options: ["Nairobi", "Moyale", "Hawassa"],
      correct: "Nairobi",
    },
    
  ];

  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleSubmit = (selected) => {
    if (selected === questions[currentQuestion].correct) {
      setScore((prevScore) => prevScore + 1);
    }
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  if (currentQuestion >= questions.length) {
    return <QuizDisplay currentQuestion={currentQuestion} score={score} totalQuestions={questions.length} />;
  }

  return (
    <div className="quiz-container">
      <QuizDisplay currentQuestion={currentQuestion} totalQuestions={questions.length} score={score} />
      <QuizForm question={questions[currentQuestion].question} options={questions[currentQuestion].options} onSubmit={handleSubmit} />
    </div>
  );
}

function QuizDisplay({ currentQuestion, totalQuestions, score }) {
  if (currentQuestion === totalQuestions) {
    return (
      <div className="result-container">
        <h2>Quiz Finished</h2>
        <p>Score: {score} / {totalQuestions}</p>
      </div>
    );
  }
  return (
    <div className="question-tracker">
      <p>{`Question ${currentQuestion} of ${totalQuestions}`}</p>
    </div>
  );
}

function QuizForm({ question, options, onSubmit }) {
  const [selected, setSelected] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(selected);
    setSelected("");
  };

  return (
    <form className="quiz-form" onSubmit={handleSubmit}>
      <p className="question">{question}</p>
      {options.map((option) => (
        <div key={option} className="option-container">
          <input
            type="radio"
            name="option"
            value={option}
            checked={selected === option}
            onChange={(e) => setSelected(e.target.value)}
          />
          <span>{option}</span>
        </div>
      ))}
      <button className="submit-button" type="submit">Submit</button>
    </form>
  );
}

export default App;
