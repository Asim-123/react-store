import { createSlice } from "@reduxjs/toolkit";

const initialState = 0;

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increase: (state) => {
            return state + 1;
        },
        decrease: (state) => {
            return state - 1;
        }
    }
});

export const { increase, decrease } = counterSlice.actions
export default counterSlice.reducer