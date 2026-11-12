'use client';

import { useState } from "react";

export default function IntroPreview({ preview }) {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [won, setWon] = useState(false);

  function check() {
    const correct = answer === preview.lesson.check_answer;
    if (correct) {
      localStorage.setItem("automatex_first_win", answer);
      setWon(true);
      setFeedback("Correct. You have completed the introduction.");
    } else {
      setFeedback("Not quite. Revisit the explanations and try again.");
    }
  }

  return (
    <div className="intro-class">
      <div className="intro-concepts">
        {preview.primer.map((item, index) => (
          <article className="intro-concept" key={item.title}>
            <span className="intro-concept-index">0{index + 1}</span>
            <div><h3>{item.title}</h3><p>{item.body}</p></div>
          </article>
        ))}
      </div>

      <article className="intro-example">
        <div className="intro-example-copy">
          <p className="eyebrow mb-3">PUT IT IN CONTEXT</p>
          <h3>{preview.lesson.title}</h3>
          <p>{preview.lesson.body_md}</p>
        </div>
        <aside className="intro-story">
          <span className="eyebrow">A SIMPLE EXAMPLE</span>
          <strong>{preview.lesson.story_title}</strong>
          <p>{preview.lesson.story_md}</p>
          <b>{preview.lesson.story_lesson}</b>
        </aside>
      </article>

      <section className="intro-check">
        <div>
          <p className="eyebrow mb-3">QUICK KNOWLEDGE CHECK</p>
          <h3>{preview.lesson.check_prompt}</h3>
        </div>
        <div className="intro-options">
          {Object.entries(preview.lesson.check_options).map(([key, value]) => (
            <label key={key} className={`intro-option ${answer === key ? "is-selected" : ""}`}>
              <input type="radio" name="first-check" value={key} checked={answer === key} onChange={() => { setAnswer(key); setFeedback(""); }} />
              <span className="intro-option-key">{key}</span><span>{value}</span>
            </label>
          ))}
        </div>
        {feedback && <p className="intro-feedback" role="status">{feedback}</p>}
        {won ? (
          <a href="/sign-in?next=%2Fautomatex%2Fcourse" className="btn btn-primary inline-flex mt-5">Save my progress and continue <span aria-hidden="true" className="ml-2">↗</span></a>
        ) : (
          <button className="btn btn-primary mt-5" disabled={!answer} onClick={check}>Check answer</button>
        )}
      </section>
    </div>
  );
}
