import React, { useState, useRef } from 'react';
import './Quiz.css';
import { data } from '../../assets/data';

const Quiz = () => {
    const [username, setUsername] = useState('');
    const [started, setStarted] = useState(false);
    const [index, setIndex] = useState(0);
    const [lock, setLock] = useState(false);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const Option1 = useRef(null);
    const Option2 = useRef(null);
    const Option3 = useRef(null);
    const Option4 = useRef(null);
    const option_array = [Option1, Option2, Option3, Option4];

    const question = data[index];

    const checkAns = (e, ans) => {
        if (!lock) {
            if (question.ans === ans) {
                e.target.classList.add("correct");
                setScore(prev => prev + 1);
            } else {
                e.target.classList.add("wrong");
                option_array[question.ans - 1].current.classList.add("correct");
            }
            setLock(true);
        }
    };

    const nextQuestion = () => {
        if (lock) {
            if (index < data.length - 1) {
                setIndex(index + 1);
                setLock(false);
                option_array.forEach(opt => {
                    opt.current.classList.remove("correct");
                    opt.current.classList.remove("wrong");
                });
            } else {
                setShowResult(true);
            }
        } else {
            alert("Please select an answer before moving on.");
        }
    };

    const startQuiz = () => {
        if (username.trim() !== '') {
            setStarted(true);
        } else {
            alert("Please enter your name!");
        }
    };

    const restartQuiz = () => {
        setStarted(false);
        setShowResult(false);
        setUsername('');
        setIndex(0);
        setScore(0);
        setLock(false);
    };

    const getMessage = () => {
        const percent = (score / data.length) * 100;
        if (percent === 100) return "🎉 Perfect score! You're a genius!";
        if (percent >= 70) return "👍 Great job!";
        if (percent >= 40) return "🙂 Not bad, but you can do better!";
        return "😕 Keep practicing!";
    };

    return (
        <div className='container'>
            {!started ? (
                <>
                    <h1>Welcome to the Quiz!</h1>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="name-input"
                    />
                    <button onClick={startQuiz}>Start Quiz</button>
                </>
            ) : showResult ? (
                <>
                    <h1>Quiz Completed ✅</h1>
                    <h2>Well done, {username}!</h2>
                    <p>Your Score: {score} / {data.length}</p>
                    <p>{getMessage()}</p>
                    <button onClick={restartQuiz}>Restart Quiz</button>
                </>
            ) : (
                <>
                    <h1>Hello {username} 👋</h1>
                    <hr />
                    <h2>{index + 1}. {question.question}</h2>
                    <ul>
                        <li ref={Option1} onClick={(e) => checkAns(e, 1)}>{question.option1}</li>
                        <li ref={Option2} onClick={(e) => checkAns(e, 2)}>{question.option2}</li>
                        <li ref={Option3} onClick={(e) => checkAns(e, 3)}>{question.option3}</li>
                        <li ref={Option4} onClick={(e) => checkAns(e, 4)}>{question.option4}</li>
                    </ul>
                    <button onClick={nextQuestion}>Next</button>
                    <div className="index">{index + 1} of {data.length} questions</div>
                </>
            )}
        </div>
    );
};

export default Quiz;
