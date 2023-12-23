/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { SweetAlertError } from "../../assets/SweetAlert/SweetAlert";
import CardComment from "../Card/CardComment.jsx";
import { useSelector, useDispatch } from "react-redux";
import { listComments, cleanAlert } from "../../Redux/CommentSlice";
import { ToastContainer } from "react-toastify";
import { ToastWarning, ToastSuccess } from "../../assets/Toastify/toastify";

const ListComments = ({ room_id, userSession }) => {
  const dispatch = useDispatch();

  const { errorRedux } = useSelector((state) => state.comment);
  const { token } = useSelector((state) => state.user);
  const [page, setPage] = useState(2);
  const [chatListComments, setChatListComments] = useState([]);
  const refBoxComments = useRef(null);

  //al iniciar la sala obtener los ultimos 20 comentarios
  useEffect(() => {
    dispatch(listComments({ room_id, token })).then((state) => {
      setChatListComments([...state.payload.Comments.reverse()]);
    });
  }, [room_id, token]);

  //mostra error si lo hay
  useEffect(() => {
    if (errorRedux) {
      SweetAlertError(errorRedux);
      dispatch(cleanAlert());
    }
  }, [errorRedux]);

  useEffect(() => {
    if (chatListComments.length === 0) {
      return;
    }

    const handleScroll = () => {
      const container = refBoxComments.current;
      const scrollPosition = container.scrollTop;
      //console.log("Posición del scroll:", scrollPosition);
      if (scrollPosition === 0) {
        //notificacion de carga

        dispatch(listComments({ room_id, token, page })).then((state) => {
          if (
            state.payload.Comments &&
            state.payload.Comments[0].id !==
            chatListComments[chatListComments.length - 1].id
          ) {
            ToastSuccess("Cargando comentarios!", 500);
            setPage((prevPage) => prevPage + 1);

            setTimeout(() => {
              setChatListComments((prevComments) => [
                ...[...state.payload.Comments].reverse(),
                ...prevComments,
              ]);
            }, 700);
          } else {
            console.log("no hay mas comentarios");
            ToastWarning("No hay mas comentarios!", 1500);
            //notificacion de que no hay mas comentarios
          }
        });
      }
    };

    const container = refBoxComments.current;
    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [chatListComments]);

  //hacer scroll hacia abajo al actualizar la lista
  useEffect(() => {
    if (!refBoxComments || chatListComments.length === 0) {
      return;
    }
    // Hacer scroll hacia abajo al actualizar la lista
    refBoxComments.current.scrollTop = refBoxComments.current.scrollHeight;
  }, [chatListComments]);

  useEffect(() => {
    // Conectar al WebSocket al entrar a la sala
    const websocket = new WebSocket(
      `ws://127.0.0.1:8000/ws/comments/${room_id}/`
    );

    websocket.onopen = () => {
      console.log("Conectado WebSocket");
    };

    // Manejar los mensajes recibidos
    websocket.onmessage = async (e) => {
      let data = await JSON.parse(e.data);
      //console.log(data);

      switch (data.action) {
        case "create":
          //console.log(data.Comment)
          setChatListComments((prevComments) => [
            ...prevComments,
            data.Comment,
          ]);
          break;
        case "update":
          //console.log(data.Comment)
          setChatListComments((prevComments) =>
            prevComments.map((comment) =>
              comment.id === data.Comment.id ? data.Comment : comment
            )
          );
          break;
        case "delete":
          //console.log(data.Comment)
          setChatListComments((prevComments) =>
            prevComments.filter((comment) => comment.id !== data.Comment.id)
          );
          break;
        default:
          break;
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

  return (
    <div className="bg-chat">
      <ToastContainer />
      <div className="box-chat py-4 " ref={refBoxComments}>
        {chatListComments.map((comment) => (
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
