import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  client: { visibleToggle: false, toggleWithId: undefined,numberPagination:1 },
};

export const ReducerSlice = createSlice({
    name:'curd',
    initialState,
    reducers: {
        toggleAction: (state) => {
            state.client.visibleToggle = !state.client.visibleToggle
        },
        toggleActionWhenwithId: (state , action) => {
            state.client.toggleWithId = action.payload
        },
        numberPaginationFun: (state, action) => {
            state.client.numberPagination = action.payload + 1
        }
    }
})


export const {toggleAction, toggleActionWhenwithId, numberPaginationFun} = ReducerSlice.actions;

export default ReducerSlice.reducer;