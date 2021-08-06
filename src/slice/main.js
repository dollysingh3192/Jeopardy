import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    score: 0,
    count: 0,
    apiData: {},
    clue: {
        "question": "",
        "answer": ""
    },
    wagerAmount: 0
}

export const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        setScore: (state, action) => {
            state.score = state.score + action.payload
        },
        setCount: (state, action) => {
            state.count = state.count + action.payload
        },
        setApiResponses: (state, action) => {
            state.apiData = action.payload
        },
        setActiveClue: (state, action) => {
            state.clue = action.payload
        },
        setWagerAmount: (state, action) => {
            state.wagerAmount = action.payload
        }
    },
})

export const { setScore, setWagerAmount, setCount, setApiResponses, setActiveClue } = mainSlice.actions

export default mainSlice.reducer
