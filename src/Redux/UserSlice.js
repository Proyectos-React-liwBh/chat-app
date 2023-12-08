import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const insertUser = createAsyncThunk(
  "user/insertUser",

  async (data) => {
    const response = await fetch("", {
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
    const response = await fetch("", {
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

export const editUser = createAsyncThunk(
  "user/editUser",

  async (data) => {
    const response = await fetch("", {
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

export const changePassword = createAsyncThunk(
  "user/changePassword",

  async (data) => {
    const response = await fetch("", {
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

export const deleteUser = createAsyncThunk(
  "user/deleteUser",

  async (data) => {
    const response = await fetch("", {
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

export const getSessionUser = createAsyncThunk(
  "user/setSesionUsuario",

  () => {
    // Obtener la cadena de texto del Local Storage
    const storedLoggedIn = sessionStorage.getItem("user");

    let userSession = null;

    if (storedLoggedIn) {
      // Convertir la cadena JSON a un objeto JavaScript
      userSession = JSON.parse(storedLoggedIn);
    }

    return { userSession };
  }
);

export const closeSession = createAsyncThunk("user/closeSession", () => {
  //eliminar datos del localsotrage
  sessionStorage.removeItem("user");

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
      if (action.payload.user) {
        state.userSession = { ...action.payload.user };

        // Guardar en el Local Storage
        sessionStorage.setItem("user", JSON.stringify(action.payload.user));

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
      state.userSession = action.payload.userSession
        ? { ...action.payload.userSession }
        : null;
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
