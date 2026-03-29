import {configureStore} from "@reduxjs/toolkit";
import roomReducer from "@/features/room/store/roomSlice"
import houseReducer from "@/features/room/store/houseSlice"
import floorReducer from "@/features/room/store/floorSlice"
export const store = configureStore({
    reducer : {
        room: roomReducer,
        house: houseReducer,
        floor: floorReducer

    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch