import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setScore, setCount } from './slice/main';

function Card(props) {
    const dispatch = useDispatch();
    const [answer, setAnswer] = useState("");
    const [flag, setFlag] = useState(false);
    const [correct, setCorrect] = useState(false);
    const clue = props.clue;

    const clean = (input = "") => {
        var friendlyAnswer = input.toLowerCase();
        friendlyAnswer = friendlyAnswer.replace("<i>", "");
        friendlyAnswer = friendlyAnswer.replace("</i>", "");
        friendlyAnswer = friendlyAnswer.replace(/ /g, "");
        friendlyAnswer = friendlyAnswer.replace(/"/g, "");
        friendlyAnswer = friendlyAnswer.replace(/^a /, "");
        friendlyAnswer = friendlyAnswer.replace(/^an /, "");
        return friendlyAnswer.trim();
    }

    const onChange = (e) => {
        setAnswer(e.target.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();

        let isCorrect = clean(answer) === clean(clue.answer);
        if (isCorrect) {
            dispatch(setScore(clue.value));
            dispatch(setCount(1));
        }
        setCorrect(isCorrect);
        setFlag(true);

        //Disappear after a short bit
        setTimeout(() => {
            document.getElementById("cardCustom").style.left = '1500px';
            //reset the value
            setCorrect(false);
            setFlag(false);
            setAnswer("")
        }, 1500);
    }

    return (<>
        <div id="cardCustom" className="cardCustom">
            <div className="card-modal-custom">
                <div className="card-modal-custom-inner">
                    <h2>
                        Question
                    </h2>
                    <h3 className="clue-text">
                        {clue.question}
                    </h3>
                    <form onSubmit={onSubmit} autoComplete="off">
                        <input name="answer" value={answer} onChange={onChange} type="text" />
                        <button type="submit">Answer</button>
                    </form>
                    {
                        flag &&
                        <div className="result">
                            {correct && <p className="result_success">CORRECT</p>}
                            {
                                !correct &&
                                <>
                                    <p className="result_fail">INCORRECT</p>
                                    <p className="result_correct-answer">
                                        The correct answer is <span className="result_correct-answer-text">
                                            {clue.answer}
                                        </span>
                                    </p>
                                </>
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    </>)
}

export default Card;
