import { createSlice } from '@reduxjs/toolkit';

const feedSlice = createSlice({
    name : "feed",
    initialState : null,
    reducers : {
        addUsersToFeed : (state, action) => {
            return action.payload;
        },
        removeUsersFromFeed : (state,action) => {
            return state.filter((user) => user._id != action.payload);
        },
        removeFeed : (state, action) => {
            return null;
        }
    }
})

export const { addUsersToFeed, removeUsersFromFeed, removeFeed } = feedSlice.actions;
export default feedSlice.reducer;