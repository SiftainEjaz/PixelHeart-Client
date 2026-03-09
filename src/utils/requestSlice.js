import { createSlice } from '@reduxjs/toolkit';

const requestSlice = createSlice({
    name: "request",
    initialState: { data: [], status: "idle" },
    reducers: {
        addRequest: (state, action) => {
            state.data = action.payload;
            state.status = "success"
        },
        removeRequest: (state, action) => {
            state.data = state.data.filter((request) => request.fromUserId._id !== action.payload);
        }
    }
})

export const { addRequest, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;