import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  client: { visibleToggle: false, toggleWithId: undefined },
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
        }
    }
})


export const {toggleAction, toggleActionWhenwithId} = ReducerSlice.actions;

export default ReducerSlice.reducer;