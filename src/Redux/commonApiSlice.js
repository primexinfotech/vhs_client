import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    getMenu: [],
};

export const commonApiSlice = createSlice({
    name: "commonApiSlice",
    initialState,
    reducers: {
        setGetMenu: (state, action) => {
            state.getMenu = action.payload.getMenu
        }
    }
});

export const { setGetMenu } = commonApiSlice.actions;

export default commonApiSlice.reducer;
