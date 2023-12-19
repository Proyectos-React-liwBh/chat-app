import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./UserSlice";
import roomSlice from "./RoomSlice";


export default configureStore({ 
    reducer: {
        user: userSlice,
        room: roomSlice
    }
});