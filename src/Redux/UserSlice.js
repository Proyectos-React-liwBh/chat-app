import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const insertUser = createAsyncThunk(
  "user/insertUser",

  async (data) => {
    const response = await fetch("http://127.0.0.1:8000/api/auth/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
      }),
    });

    return response.json();
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",

  async (data) => {
    console.log(data);
    const response = await fetch("http://127.0.0.1:8000/api/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
      }),
    });

    return response.json();
  }
);

//Todo requiere token
export const editUser = createAsyncThunk(
  "user/editUser",

  async (data) => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/user/${data.id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${data.token}`,
        },
        body: JSON.stringify({
          ...data,
        }),
      }
    );

    return response.json();
  }
);

export const changePassword = createAsyncThunk(
  "user/changePassword",

  async (data) => {
    const response = await fetch("", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.token}`,
      },
      body: JSON.stringify({
        ...data,
      }),
    });

    return response.json();
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",

  async (data) => {
    const response = await fetch(`http://127.0.0.1:8000/api/user/${data.id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.token}`,
      },
      body: JSON.stringify({
        ...data,
      }),
    });

    return response.json();
  }
);

export const partialUpdateUser = createAsyncThunk(
  "user/partialUpdateUser",

  async (data) => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/user/${data.id}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${data.token}`,
        },
        body: JSON.stringify({
          avatar: data.avatar,
        }),
      }
    );

    return response.json();
  }
);

//Todo no requeren token, ni petición al servidor
export const getSessionUser = createAsyncThunk(
  "user/setSesionUsuario",

  () => {
    // Obtener la cadena de texto del Local Storage
    const storedLoggedIn = sessionStorage.getItem("user");

    let userSession = null;
    let token = null;
    let refresh = null;

    if (storedLoggedIn) {
      // Convertir la cadena JSON a un objeto JavaScript
      userSession = JSON.parse(storedLoggedIn);
      token = JSON.parse(sessionStorage.getItem("token"));
      refresh = JSON.parse(sessionStorage.getItem("refresh"));
    }

    return { userSession, token, refresh };
  }
);

export const closeSession = createAsyncThunk("user/closeSession", () => {
  //eliminar datos del localsotrage
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("refresh");

  return {};
});

export const cleanAlert = createAsyncThunk(
  "user/cleanAlert",

  () => {
    return {};
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: [],
    userCurrent: {},
    userSession: null,
    token: null,
    refresh: null,
    message: "",
    loading: false,
    errorRedux: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    //insertar usuario
    builder.addCase(insertUser.pending, (state) => {
      state.loading = true;
      state.errorRedux = null;
      state.message = "";
    });
    builder.addCase(insertUser.fulfilled, (state, action) => {
      if (action.payload.message) {
        state.message = action.payload.message;
      } else {
        state.errorRedux = action.payload.error;
      }
      state.loading = false;
    });
    builder.addCase(insertUser.rejected, (state) => {
      state.loading = false;
      state.errorRedux = "Ocurrio un error al crear el usuario";
    });

    // logear usuario
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.errorRedux = null;
      state.message = "";
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload);
      if (action.payload.user) {
        state.userSession = { ...action.payload.user };
        state.token = action.payload.access;
        state.refresh = action.payload.refresh;

        // Guardar en el Local Storage
        sessionStorage.setItem("user", JSON.stringify(action.payload.user));
        sessionStorage.setItem("token", JSON.stringify(action.payload.access));
        sessionStorage.setItem(
          "refresh",
          JSON.stringify(action.payload.refresh)
        );

        state.message = "Iniciando sesión...";
      } else {
        state.errorRedux = "Credenciales incorrectas o no validas!";
      }
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.loading = false;
      state.errorRedux = "Ocurrio un error al iniciar sesión";
    });

    //cambiar contraseña
    builder.addCase(changePassword.pending, (state) => {
      state.loading = true;
      state.errorRedux = null;
      state.message = "";
    });
    builder.addCase(changePassword.fulfilled, (state, action) => {
      if (action.payload.message) {
        state.message = action.payload.mensaje;
      } else {
        state.errorRedux = action.payload.error;
      }
      state.loading = false;
    });
    builder.addCase(changePassword.rejected, (state) => {
      state.loading = false;
      state.errorRedux = "Ocurrio un error al cambiar contraseña";
    });

    //editar usuario
    builder.addCase(editUser.pending, (state) => {
      state.loading = true;
      state.errorRedux = null;
      state.message = "";
    });
    builder.addCase(editUser.fulfilled, (state, action) => {
      if (action.payload.message) {
        state.message = action.payload.message;
        state.userSession = { ...action.payload.user };
      } else {
        state.errorRedux = action.payload.error;
      }
      state.loading = false;
    });
    builder.addCase(editUser.rejected, (state) => {
      state.loading = false;
      state.errorRedux = "Ocurrio un error al editar el usuario";
    });

    //actualizacion parcial de usuario
    builder.addCase(partialUpdateUser.pending, (state) => {
      state.loading = true;
      state.errorRedux = null;
      state.message = "";
    });
    builder.addCase(partialUpdateUser.fulfilled, (state, action) => {
      if (action.payload.message) {
        state.message = action.payload.message;
        state.userSession = { ...action.payload.user };
        sessionStorage.setItem("user", JSON.stringify(action.payload.user));
      } else {
        state.errorRedux = action.payload.error;
      }
      state.loading = false;
    });
    builder.addCase(partialUpdateUser.rejected, (state) => {
      state.loading = false;
      state.errorRedux = "Ocurrio un error al editar el usuario";
    });

    //eliminar usuario
    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
      state.errorRedux = null;
      state.message = "";
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      if (action.payload.message) {
        state.message = action.payload.message;
      } else {
        state.errorRedux = action.payload.error;
      }
      state.loading = false;
    });
    builder.addCase(deleteUser.rejected, (state) => {
      state.loading = false;
      state.errorRedux = "Ocurrio un error al eliminar el usuario";
    });

    // obtener sesion usuario
    builder.addCase(getSessionUser.pending, (state) => {
      state.loading = true;
      state.errorRedux = null;
      state.message = "";
    });
    builder.addCase(getSessionUser.fulfilled, (state, action) => {
      if (action.payload.userSession) {
        state.userSession = action.payload.userSession;
        state.token = action.payload.token;
        state.refresh = action.payload.refresh;
      }

      state.loading = false;
    });
    builder.addCase(getSessionUser.rejected, (state) => {
      state.loading = false;
      state.errorRedux = "Ocurrio un error al recargar sesion de usuario";
    });

    // cerrar sesión
    builder.addCase(closeSession.pending, (state) => {
      state.loading = false;
      state.errorRedux = null;
      state.message = "";
    });
    builder.addCase(closeSession.fulfilled, (state) => {
      state.userSession = null;
      state.message = "Cerrando sesión...";
      state.loading = false;
    });
    builder.addCase(closeSession.rejected, (state) => {
      state.loading = false;
      state.errorRedux = "Ocurrio un error al cerrar sesión";
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

export default userSlice.reducer;
