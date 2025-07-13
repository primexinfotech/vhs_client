import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    globalLoader : false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setGlobalLoader: (state, action) => {
            state.globalLoader = action.payload
        }
    }
});

export const { setGlobalLoader } = authSlice.actions;

export default authSlice.reducer;
