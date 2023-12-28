import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//Todo usuario
//crear room
export const createRoom = createAsyncThunk(
  "room/createRoom",

  async (data) => {
    const response = await fetch("http://127.0.0.1:8000/api/rooms/user/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.token}`,
      },
      body: JSON.stringify({
        ...data.room,
      }),
    });

    return response.json();
  }
);

//editar room
export const editRoom = createAsyncThunk(
  "room/editRoom",

  async (data) => {
    //console.log(data)
    const response = await fetch(
      `http://127.0.0.1:8000/api/rooms/user/${data.room.id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${data.token}`,
        },
        body: JSON.stringify({
          ...data.room,
        }),
      }
    );

    return response.json();
  }
);

//eliminar room
export const deleteRoom = createAsyncThunk(
  "room/deleteRoom",

  async (data) => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/rooms/user/${data.room.id}/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${data.token}`,
        },
      }
    );

    return response.json();
  }
);

//obtener mis salas
export const getMyRooms = createAsyncThunk(
  "room/getMyRooms",

  async (data) => {
    //console.log(data)
    const response = await fetch(`http://127.0.0.1:8000/api/rooms/user/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${data}`,
      },
    });

    return response.json();
  }
);

//Todo seguir salas
//seguir room
export const followRoom = createAsyncThunk(
  "room/followRoom",

  async (data) => {
    //console.log(data)
    const response = await fetch(`http://127.0.0.1:8000/api/rooms/follow/${data.id}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${data.token}`,
      },
    });

    return response.json();
  }
);

//dejar de seguir room
export const unfollowRoom = createAsyncThunk(
  "room/unfollowRoom",

  async (data) => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/rooms/follow/${data.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${data.token}`,
        },
      }
    );

    return response.json();
  }
);

//obtener salas seguidas
export const getFollowRooms = createAsyncThunk(
  "room/getFollowRooms",

  async (data) => {
    //console.log(data)
    const response = await fetch(`http://127.0.0.1:8000/api/rooms/follow/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${data}`,
      },
    });

    return response.json();
  }
);

//Todo Salas
//obtener room por id
export const getRoom = createAsyncThunk(
  "room/getRoom",

  async (data) => {
    //console.log(data)
    const response = await fetch(
      `http://127.0.0.1:8000/api/rooms/${data.id}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${data.token}`,
        },
      }
    );

    return response.json();
  }
);

//obtener todas las rooms
export const listAllRooms = createAsyncThunk(
  "room/listAllRooms",

  async (data) => {
    //console.log(data);
    const response = await fetch(`http://127.0.0.1:8000/api/rooms/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${data}`,
      },
    });

    return  response.json();
  }
);

//Todo metodos del slice
//almacenar room actual
export const setRoomCurrent = createAsyncThunk(
  "room/setRoomCurrent",
  (data) => {
    localStorage.setItem("roomCurrent", JSON.stringify({ ...data }));

    return {
      room: data,
    };
  }
);

//obtener room actual
export const getRoomCurrent = createAsyncThunk("room/getRoomCurrent", () => {
  const room = localStorage.getItem("roomCurrent");
  return {
    room: JSON.parse(room),
  };
});

//limpiar state - alertas
export const cleanAlert = createAsyncThunk(
  "room/cleanAlert",

  () => {
    return {};
  }
);

const roomSlice = createSlice({
  name: "room",
  initialState: {
    rooms: [],
    roomsFollow: [],
    roomCurrent: {},
    message: "",
    loading: false,
    errorRedux: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    //crear room
    builder.addCase(createRoom.pending, (state) => {
      state.loading = true;
      state.errorRedux = null;
      state.message = "";
    });
    builder.addCase(createRoom.fulfilled, (state, action) => {
      //console.log(action.payload);
      if (action.payload.message) {
        state.message = action.payload.message;
      } else {
        state.errorRedux = action.payload.error;
      }
      state.loading = false;
    });
    builder.addCase(createRoom.rejected, (state) => {
      state.loading = false;
      state.errorRedux = "Ocurrio un error al crear la sala";
    });

    //editar room
    builder.addCase(editRoom.pending, (state) => {
      state.loading = true;
      state.errorRedux = null;
      state.message = "";
    });
    builder.addCase(editRoom.fulfilled, (state, action) => {
      //console.log(action.payload)
      if (action.payload.message) {
        state.message = action.payload.message;
      } else {
        state.errorRedux = action.payload.error;
      }
      state.loading = false;
    });
    builder.addCase(editRoom.rejected, (state) => {
      state.loading = false;
      state.errorRedux = "Ocurrio un error al editar la sala";
    });

    //eliminar room
    builder.addCase(deleteRoom.pending, (state) => {
      state.loading = true;
      state.errorRedux = null;
      state.message = "";
    });
    builder.addCase(deleteRoom.fulfilled, (state, action) => {
      if (action.payload.message) {
        state.message = action.payload.message;
      } else {
        state.errorRedux = action.payload.error;
      }
      state.loading = false;
    });
    builder.addCase(deleteRoom.rejected, (state) => {
      state.loading = false;
      state.errorRedux = "Ocurrio un error al eliminar el usuario";
    });

    //obtener mis salas
    builder.addCase(getMyRooms.pending, (state) => {
      state.loading = true;
      state.errorRedux = null;
      state.message = "";
    });
    builder.addCase(getMyRooms.fulfilled, (state, action) => {
      //console.log(action.payload)
      if (action.payload.Rooms) {
        state.rooms =  [...action.payload.Rooms];
      } else {
        state.errorRedux = action.payload.error;
      }
      state.loading = false;
    });
    builder.addCase(getMyRooms.rejected, (state) => {
      state.loading = false;
      state.errorRedux = "Ocurrio un error al obtener las salas";
    });

    //obtener room por id
    builder.addCase(getRoom.pending, (state) => {
      state.loading = true;
      state.errorRedux = null;
      state.message = "";
    });
    builder.addCase(getRoom.fulfilled, (state, action) => {
      //console.log(action.payload)
      if (action.payload.Room) {
        state.roomCurrent = { ...action.payload.Room };
      } else {
        state.errorRedux = action.payload.error;
      }
      state.loading = false;
    });
    builder.addCase(getRoom.rejected, (state) => {
      state.loading = false;
      state.errorRedux = "Ocurrio un error al obtener la sala";
    });

    //obtener todas las rooms
    builder.addCase(listAllRooms.pending, (state) => {
      state.loading = true;
      state.errorRedux = null;
      state.message = "";
    });
    builder.addCase(listAllRooms.fulfilled, (state, action) => {
      //console.log(action.payload);
      if (action.payload.Rooms) {
        state.rooms = [ ...action.payload.Rooms ];
      } else {
        state.errorRedux = action.payload.error;
      }
      state.loading = false;
    });
    builder.addCase(listAllRooms.rejected, (state) => {
      state.loading = false;
      state.errorRedux = "Ocurrio un error al listar las salas";
    });

    //almacenar room actual
    builder.addCase(setRoomCurrent.pending, (state) => {
      state.loading = true;
      state.errorRedux = null;
      state.message = "";
    });
    builder.addCase(setRoomCurrent.fulfilled, (state, action) => {
      //almacenar en el local storage
      state.roomCurrent = { ...action.payload.room };
      state.loading = false;
    });
    builder.addCase(setRoomCurrent.rejected, (state) => {
      state.loading = false;
      state.errorRedux = "Ocurrio un error al almacenar la sala";
    });

    //obtener room actual
    builder.addCase(getRoomCurrent.pending, (state) => {
      state.loading = true;
      state.errorRedux = null;
      state.message = "";
    });
    builder.addCase(getRoomCurrent.fulfilled, (state, action) => {
      state.roomCurrent = { ...action.payload.room };
      state.loading = false;
    });
    builder.addCase(getRoomCurrent.rejected, (state) => {
      state.loading = false;
      state.errorRedux = "Ocurrio un error al obtener la sala";
    });

    //seguir una room
    builder.addCase(followRoom.pending, (state) => {
      state.loading = true;
      state.errorRedux = null;
      state.message = "";
    });
    builder.addCase(followRoom.fulfilled, (state, action) => {
      //console.log(action.payload)
      if (action.payload.message) {
        state.message = action.payload.message;
      } else {
        state.errorRedux = action.payload.error;
      }
      state.loading = false;
    });
    builder.addCase(followRoom.rejected, (state) => {
      state.loading = false;
      state.errorRedux = "Ocurrio un error al seguir la sala";
    });

    //dejar de seguir una room
    builder.addCase(unfollowRoom.pending, (state) => {
      state.loading = true;
      state.errorRedux = null;
      state.message = "";
    });
    builder.addCase(unfollowRoom.fulfilled, (state, action) => {
      if (action.payload.message) {
        state.message = action.payload.message;
      } else {
        state.errorRedux = action.payload.error;
      }
      state.loading = false;
    });
    builder.addCase(unfollowRoom.rejected, (state) => {
      state.loading = false;
      state.errorRedux = "Ocurrio un error al dejar de seguir la sala";
    });

    //obtener rooms seguidas
    builder.addCase(getFollowRooms.pending, (state) => {
      state.loading = true;
      state.errorRedux = null;
      state.message = "";
    });
    builder.addCase(getFollowRooms.fulfilled, (state, action) => {
      //console.log(action.payload)
      if (action.payload.Rooms) {
        state.roomsFollow = [ ...action.payload.Rooms];
      } else {
        state.errorRedux = action.payload.error;
      }
      state.loading = false;
    });
    builder.addCase(getFollowRooms.rejected, (state) => {
      state.loading = false;
      state.errorRedux = "Ocurrio un error al obtener las salas";
    });

    // limpiar state - alertas
    builder.addCase(cleanAlert.pending, (state) => {
      state.loading = false;
      state.errorRedux = null;
      state.message = null;
    });
    builder.addCase(cleanAlert.fulfilled, (state) => {
      state.loading = false;
      state.errorRedux = null;
      state.message = "";
    });
    builder.addCase(cleanAlert.rejected, (state) => {
      state.loading = false;
      state.errorRedux = null;
      state.message = "";
    });
  },
});

export default roomSlice.reducer;
