import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./UserSlice";
import roomSlice from "./RoomSlice";
import commentSlice from "./CommentSlice";


export default configureStore({ 
    reducer: {
        user: userSlice,
        room: roomSlice,
        comment: commentSlice,
    }
});