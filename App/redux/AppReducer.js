import { createSlice } from "@reduxjs/toolkit";




const AppReducer = createSlice({
    name: 'AppReducer',
    initialState: {
        showCallMakerPopUp: false,
        ShowItinerary: false
    },
    reducers:{
        updateShowCallMaker : (state, action) => {
            state.showCallMakerPopUp = !state.showCallMakerPopUp
        },
        updateShowItinerary : (state, action) => {
            state.ShowItinerary = !state.ShowItinerary
        }
    }
})


export const { updateShowCallMaker, updateShowItinerary } = AppReducer.actions;

// Export the reducer
export default AppReducer.reducer;