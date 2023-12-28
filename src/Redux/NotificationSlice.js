import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//eliminar notificacion
export const deleteNotification = createAsyncThunk(
    "notification/deleteNotification",
  
    async (data) => {
      console.log(data);
      const response = await fetch(
        `http://127.0.0.1:8000/api/notification/${data.id}/`,
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

//obtener todas las rooms
export const listNotifications = createAsyncThunk(
    "notification/listNotifications",
  
    async (data) => {
      //console.log(data);
      const response = await fetch(`http://127.0.0.1:8000/api/notifications/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${data}`,
        },
      });
  
      return  response.json();
    }
  );

//limpiar state - alertas
export const cleanAlert = createAsyncThunk(
  "notification/cleanAlert",

  () => {
    return {};
  }
);

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notifications: [],
    notification: {},
    message: "",
    loading: false,
    errorRedux: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    //eliminar notificacion
    builder.addCase(deleteNotification.pending, (state) => {
      state.loading = true;
      state.errorRedux = null;
      state.message = "";
    });
    builder.addCase(deleteNotification.fulfilled, (state, action) => {
      console.log(action.payload)
      if (action.payload.message) {
        state.message = action.payload.message;
      } else {
        state.errorRedux = action.payload.error;
      }
      state.loading = false;
    });
    builder.addCase(deleteNotification.rejected, (state) => {
      state.loading = false;
      state.errorRedux = "Ocurrio un error al eliminar la notificación";
    });

    //obtener notificaciones
    builder.addCase(listNotifications.pending, (state) => {
      state.loading = true;
      state.errorRedux = null;
      state.message = "";
    });
    builder.addCase(listNotifications.fulfilled, (state, action) => {
      console.log(action.payload)
      if (action.payload.Notifications) {
        state.notifications = [...action.payload.Notifications];
      } else {
        state.errorRedux = action.payload.error;
      }
      state.loading = false;
    });
    builder.addCase(listNotifications.rejected, (state) => {
      state.loading = false;
      state.errorRedux = "Ocurrio un error al obtener las notificaciones";
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

export default notificationSlice.reducer;
