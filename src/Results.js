import React from "react";
import questions from "./data";
import "./result.css";

export default function Results() {
  return (
    <div className="container">
      {questions.map((question, index) => (
        <div className="wrapper" key={index}>
          <h2>{question.question}</h2>
          <p>Correct answer: {question.options[question.answer]}</p>
          <p>{question.explainer}</p>
        </div>
      ))}
    </div>
  );
}
