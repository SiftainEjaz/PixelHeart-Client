import { createSlice } from '@reduxjs/toolkit';

const connectionSlice = createSlice({
    name: "connection",
    initialState: { data: [], status: 'idle' },
    reducers: {
        addConnections: (state, action) => {
            state.data = action.payload;
            state.status = 'success';
        },
        removeConnections: (state) => {
            state.data = [];
            state.status = 'idle';
        }
    }
})

export const { addConnections, removeConnections } = connectionSlice.actions;
export default connectionSlice.reducer;