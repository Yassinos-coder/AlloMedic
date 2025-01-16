import { createSlice } from "@reduxjs/toolkit";




const AppReducer = createSlice({
    name: 'AppReducer',
    initialState: {
        showCallMakerPopUp: false
    },
    reducers:{
        updateShowCallMaker : (state, action) => {
            state.showCallMakerPopUp = !state.showCallMakerPopUp
        }
    }
})


export const { updateShowCallMaker } = AppReducer.actions;

// Export the reducer
export default AppReducer.reducer;