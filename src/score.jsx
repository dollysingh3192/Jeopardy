import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

function Score() {
    const score = useSelector(state => state.main.score);

    return (
        <>
            <h1 className="score">Score {score}</h1>
        </>
    )
}

export default Score;
