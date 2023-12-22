/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import {
  SweetAlertError,
  SweetAlertSuccess,
} from "../../assets/SweetAlert/SweetAlert";
import CardComment from "../Card/CardComment.jsx";
import { useSelector, useDispatch } from "react-redux";
import { listComments, cleanAlert } from "../../Redux/CommentSlice";

const ListComments = ({ room_id, userSession }) => {
  const dispatch = useDispatch();

  const { errorRedux, message, comments } = useSelector(
    (state) => state.comment
  );
  const { token } = useSelector((state) => state.user);

  const refBoxComments = useRef(null);

  useEffect(() => {
    dispatch(listComments({ room_id, token }));
  }, [room_id, token]);

  useEffect(() => {
    if (errorRedux) {
      SweetAlertError(errorRedux);
      dispatch(cleanAlert());
    }

    if (message) {
      SweetAlertSuccess(message);
      //dispatch(listComments({ room_id, token }));
      dispatch(cleanAlert());
    }
  }, [errorRedux, message]);
/*
  useEffect(() => {
    // Hacer scroll hacia abajo al actualizar la lista
    refBoxComments.current.scrollTop = refBoxComments.current.scrollHeight;
  }, [comments]); */

   useEffect(() => {
    // Conectar al WebSocket al entrar a la sala
    const websocket = new WebSocket(
      `ws://127.0.0.1:8000/ws/comments/${room_id}/`
    );

    // Manejar los mensajes recibidos
    websocket.onmessage = async (e) => {
      let data = await JSON.parse(e.data);
      //console.log(data);

      if (data.comments) {
        dispatch(listComments({ room_id, token }));
      }
    };

    // Desconectar el WebSocket al salir de la sala
    return () => {
      if (
        websocket.readyState === WebSocket.OPEN ||
        websocket.readyState === WebSocket.CONNECTING
      ) {
        // Solo cerrar si la conexión está abierta o en proceso de conexión
        websocket.close();
        console.log("Desconectado WebSocket");
      }
    };
  }, [room_id]);

  useEffect(() => {
    /* if (refBoxComments || comments.length === 0) {
      return;
    } */
    // Hacer scroll hacia abajo al actualizar la lista
    refBoxComments.current.scrollTop = refBoxComments.current.scrollHeight;

    console.log(refBoxComments.current.scrollTop, refBoxComments.current.scrollHeight)
    // Mostrar alert si se llega al último comentario
    const handleScroll = () => {
      const container = refBoxComments.current;
      const scrollPosition = container.scrollTop;
      //const scrollHeight = container.scrollHeight;
      //const clientHeight = container.clientHeight;

      //console.log(scrollPosition, clientHeight, scrollHeight)
      if (scrollPosition === 0) {
        alert("Primer comentario");
      }

    };

    refBoxComments.current.addEventListener("scroll", handleScroll);

    return () => {
      refBoxComments.current.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="bg-chat">
      <div className="box-chat py-4 " ref={refBoxComments}>
        {comments.map((comment) => (
          <div
            className={`row py-3 d-flex ${
              comment.user.id != userSession.id
                ? "justify-content-end"
                : "justify-content-start"
            }`}
            key={comment.id}
          >
            <div className="col-12 col-md-10 col-lg-8">
              <CardComment comment={comment} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListComments;
