import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    visibleToggle: false
}

export const ReducerSlice = createSlice({
    name:'curd',
    initialState,
    reducers: {
        toggleAction: (state) => {
            state.visualToggle = !state.visualToggle
        }
    }
})


export const {toggleAction} = ReducerSlice.actions;

export default ReducerSlice.reducer;