import React, { useState, useEffect } from "react";
import questions from "./data";
import Results from "./Results";
import "./App.css";

export default function QuizApp() {
  // Declare state variables
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(20);
  const [selectedOption, setSelectedOption] = useState(null);

  // Decrement the time remaining every second
  useEffect(() => {
    let timer = setInterval(() => {
      setTimeRemaining(timeRemaining - 1);
    }, 1000);
    if (timeRemaining === 0 || currentQuestion === questions.length) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [timeRemaining, currentQuestion]);

  if (currentQuestion === questions.length) {
    return (
      <div className="result-container">
        <h1>Quiz Finished</h1>
        <p className="result">
          You got {correctAnswers} out of {questions.length} questions correct.
        </p>
        <Results />
        <button
          onClick={() => {
            setCurrentQuestion(0);
            setCorrectAnswers(0);
          }}
        >
          Play Again
        </button>
      </div>
    );
  }

  // Render the current question and options
  const { question, options, answer, explainer } = questions[currentQuestion];
  return (
    <div className="main-container">
      <div className="track-time">
        <p>
          {currentQuestion + 1} / {questions.length}
        </p>
        {timeRemaining > 0 ? (
          <div>
            <p>Time remaining: {timeRemaining} seconds</p>
          </div>
        ) : (
          <div>
            <p>Time is up</p>
          </div>
        )}
      </div>
      <h2 className="question">{question}</h2>
      <div className="options-container">
        {options.map((option, index) => (
          <button
            key={index}
            className="option"
            disabled={timeRemaining === 0}
            style={
              selectedOption === index
                ? { border: "4px solid green" }
                : selectedOption === null
                ? {}
                : { border: "" }
            }
            onClick={() => {
              setSelectedOption(index);
            }}
          >
            {option}
          </button>
        ))}
      </div>
      {selectedOption !== null || timeRemaining === 0 ? (




        <div className="next-btn">
          <button
            onClick={() => {
              if (options.indexOf(options[selectedOption]) === answer) {
                setCorrectAnswers(correctAnswers + 1);
              }

              setCurrentQuestion(currentQuestion + 1);
              setTimeRemaining(20);
              setSelectedOption(null);
            }}
          >
            {currentQuestion === questions.length - 1 ? "Show result" : "Next"}
          </button>
        </div>
      ) : null}
      {timeRemaining <= 0 ? (
        <div className="explain-container">
          <p>{explainer}</p>
        </div>
      ) : null}
    </div>
  );
}
