import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//crear comentario
export const createComment = createAsyncThunk(
  "comment/createComment",

  async (data) => {
    const response = await fetch("http://127.0.0.1:8000/api/comments/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.token}`,
      },
      body: JSON.stringify({
        ...data.comment,
      }),
    });

    return response.json();
  }
);

//editar comentario
export const editComment = createAsyncThunk(
  "comment/editComment",

  async (data) => {
    //console.log(data)
    const response = await fetch(
      `http://127.0.0.1:8000/api/comments/${data.comment.id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.token}`,
        },
        body: JSON.stringify({
          ...data.comment,
        }),
      }
    );

    return response.json();
  }
);

//eliminar comentario
export const deleteComment = createAsyncThunk(
  "comment/deleteComment",

  async (data) => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/comments/${data.room.id}/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.token}`,
        },
      }
    );

    return response.json();
  }
);

//obtener comentario
export const getComment = createAsyncThunk(
  "commet/getComment",

  async (data) => {
    //console.log(data)
    const response = await fetch(
      `http://127.0.0.1:8000/api/getComment/${data.id}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.token}`,
        },
      }
    );

    return response.json();
  }
);

//obtener comentarios
export const listComments = createAsyncThunk(
  "comment/listComments",

  async (data) => {
    //console.log(data);
    const response = await fetch(`http://127.0.0.1:8000/api/comments/${data.room_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.token}`,
      },
    });

    return response.json();
  }
);

//almacenar comment actual
export const setCommentCurrent = createAsyncThunk(
  "comment/setCommentCurrent",
  (data) => {
    localStorage.setItem("commentCurrent", JSON.stringify({ ...data }));

    return {
      Comment: data,
    };
  }
);

//obtener comment actual
export const getCommentCurrent = createAsyncThunk(
  "comment/getCommentCurrent",
  () => {
    const comment = localStorage.getItem("CommentCurrent");
    return {
      Comment: JSON.parse(comment),
    };
  }
);

export const cleanAlert = createAsyncThunk(
  "comment/cleanAlert",

  () => {
    return {};
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comments: [],
    commentCurrent: {},
    message: "",
    loading: false,
    errorRedux: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    //crear comentario
    builder.addCase(createComment.pending, (state) => {
      state.loading = true;
      state.errorRedux = null;
      state.message = "";
    });
    builder.addCase(createComment.fulfilled, (state, action) => {
      //console.log(action.payload);
      if (action.payload.message) {
        state.message = action.payload.message;
      } else {
        state.errorRedux = action.payload.error;
      }
      state.loading = false;
    });
    builder.addCase(createComment.rejected, (state) => {
      state.loading = false;
      state.errorRedux = "Ocurrio un error al crear el comentario";
    });

    // obtener comentarios
    builder.addCase(listComments.pending, (state) => {
      state.loading = true;
      state.errorRedux = null;
      state.message = "";
    });
    builder.addCase(listComments.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload);
      if (action.payload.Comments) {
        state.comments = [...action.payload.Comments];
      } else {
        state.errorRedux = action.payload.error;
      }
    });
    builder.addCase(listComments.rejected, (state) => {
      state.loading = false;
      state.errorRedux = "Ocurrio un error al obtener los comentarios";
    });

    // obtener comentario
    builder.addCase(getComment.pending, (state) => {
      state.loading = true;
      state.errorRedux = null;
      state.message = "";
    });
    builder.addCase(getComment.fulfilled, (state, action) => {
      state.loading = false;
      //console.log(action.payload);
      if (action.payload.Comment) {
        state.commentCurrent = { ...action.payload.Comment };
      } else {
        state.errorRedux = action.payload.error;
      }
    });
    builder.addCase(getComment.rejected, (state) => {
      state.loading = false;
      state.errorRedux = "Ocurrio un error al obtener el comentario";
    });

    //editar comentario
    builder.addCase(editComment.pending, (state) => {
      state.loading = true;
      state.errorRedux = null;
      state.message = "";
    });
    builder.addCase(editComment.fulfilled, (state, action) => {
      //console.log(action.payload)
      if (action.payload.message) {
        state.message = action.payload.message;
      } else {
        state.errorRedux = action.payload.error;
      }
      state.loading = false;
    });
    builder.addCase(editComment.rejected, (state) => {
      state.loading = false;
      state.errorRedux = "Ocurrio un error al editar el comentario";
    });

    //eliminar comentario
    builder.addCase(deleteComment.pending, (state) => {
      state.loading = true;
      state.errorRedux = null;
      state.message = "";
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      if (action.payload.message) {
        state.message = action.payload.message;
      } else {
        state.errorRedux = action.payload.error;
      }
      state.loading = false;
    });
    builder.addCase(deleteComment.rejected, (state) => {
      state.loading = false;
      state.errorRedux = "Ocurrio un error al eliminar el comentario";
    });

    //setear comentario actual
    builder.addCase(setCommentCurrent.pending, (state) => {
      state.loading = true;
      state.errorRedux = null;
      state.message = "";
    });
    builder.addCase(setCommentCurrent.fulfilled, (state, action) => {
      state.loading = false;
      state.commentCurrent = { ...action.payload.Comment };
    });
    builder.addCase(setCommentCurrent.rejected, (state) => {
      state.loading = false;
      state.errorRedux = null;
      state.message = "";
    });

    //obtener comentario actual
    builder.addCase(getCommentCurrent.pending, (state) => {
      state.loading = true;
      state.errorRedux = null;
      state.message = "";
    });
    builder.addCase(getCommentCurrent.fulfilled, (state, action) => {
      state.loading = false;
      state.commentCurrent = { ...action.payload.Comment };
    });
    builder.addCase(getCommentCurrent.rejected, (state) => {
      state.loading = false;
      state.errorRedux = null;
      state.message = "";
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

export default commentSlice.reducer;
