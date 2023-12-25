/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { SweetAlertError } from "../../assets/SweetAlert/SweetAlert";
import CardComment from "../Card/CardComment.jsx";
import { useSelector, useDispatch } from "react-redux";
import { listComments, cleanAlert } from "../../Redux/CommentSlice";
import { ToastContainer } from "react-toastify";
import {
  ToastWarning,
  ToastSuccess,
  ToastInfo,
} from "../../assets/Toastify/toastify";
import useWebSocket from "../../Hooks/UseWebSocket";

const ListComments = ({ room_id, userSession }) => {
  const dispatch = useDispatch();

  const { errorRedux } = useSelector((state) => state.comment);
  const { token } = useSelector((state) => state.user);
  const [page, setPage] = useState(2);
  const [chatListComments, setChatListComments] = useState([]);
  const refBoxComments = useRef(null);
  const [disableScrollDown, setDisableScrollDown] = useState(false);
  const [savedScrollHeight, setSavedScrollHeight] = useState(0);

  //hacer scroll hacia abajo
  const handleScrolDown = () => {
    const container = refBoxComments.current;
    container.scrollTop = container.scrollHeight;
    //console.log("scrollHeight", container.scrollHeight);
    //reseteo el deshabilitar scroll hacia abajo
    setDisableScrollDown(false);
  };

  //al iniciar la sala obtener los ultimos 20 comentarios
  useEffect(() => {
    dispatch(listComments({ room_id, token })).then((state) => {
      setChatListComments([...state.payload.Comments.reverse()]);

      handleScrolDown();
    });
  }, [room_id, token]);

  //guardar la altura del scroll al cargar los comentarios
  useEffect(() => {
    if (chatListComments.length === 0 || !refBoxComments) {
      return;
    }

    setSavedScrollHeight(refBoxComments.current.scrollHeight);

    if (!disableScrollDown) {
      handleScrolDown();
    }
  }, [chatListComments]);

  //mostra error si lo hay
  useEffect(() => {
    if (errorRedux) {
      SweetAlertError(errorRedux);
      dispatch(cleanAlert());
    }
  }, [errorRedux]);

  //infinit scroll
  useEffect(() => {
    if (chatListComments.length === 0) {
      return;
    }

    const handleScroll = () => {
      const container = refBoxComments.current;
      const scrollPosition = container.scrollTop;
      //console.log("Posición del scroll:", scrollPosition);
      if (scrollPosition === 0) {
        dispatch(listComments({ room_id, token, page })).then((state) => {
          if (
            state.payload.Comments &&
            state.payload.Comments[0].id !==
              chatListComments[chatListComments.length - 1].id
          ) {
            //notificacion de carga
            ToastSuccess("Cargando comentarios!", 500);
            //aumentar la pagina
            setPage((prevPage) => prevPage + 1);
            //desabilitar scroll hacia abajo
            setDisableScrollDown(true);
            //agregar los comentarios antiguos
            setTimeout(() => {
              setChatListComments((prevComments) => [
                ...[...state.payload.Comments].reverse(),
                ...prevComments,
              ]);
            }, 700);
          } else {
            //console.log("no hay mas comentarios");
            //notificacion de que no hay mas comentarios
            ToastWarning("No hay mas comentarios!", 1500);
          }
        });
      }
    };

    const container = refBoxComments.current;
    container.addEventListener("scroll", handleScroll);

    //mantener la posicion del scroll
    if (disableScrollDown) {
      const newScrollHeight = container.scrollHeight;
      console.log("newScrollHeight", newScrollHeight);
      console.log("savedScrollHeight", savedScrollHeight);
      const heightDifference = newScrollHeight - savedScrollHeight;
      console.log("heightDifference", heightDifference);
      container.scrollTop = heightDifference;
    }

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [chatListComments]);

  const handleWebSocketListComments = (data) => {
    switch (data.action) {
      case "create":
        //console.log(data.Comment)
        setChatListComments((prevComments) => [...prevComments, data.Comment]);

        //notificacion de nuevo comentario
        if (data.Comment.user.id !== userSession.id) {
          ToastInfo(
            "Nuevo comentario!, click para ver.",
            3000,
            handleScrolDown
          );
        } else {
          handleScrolDown();
        }

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

  const wsUrl = `ws://127.0.0.1:8000/ws/comments/${room_id}/`;

  useWebSocket(wsUrl, room_id, handleWebSocketListComments);

  //websocket
/*   useEffect(() => {
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

          //notificacion de nuevo comentario
          if (data.Comment.user.id !== userSession.id) {
            ToastInfo(
              "Nuevo comentario!, click para ver.",
              3000,
              handleScrolDown
            );
          } else {
            handleScrolDown();
          }

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
  }, [room_id]); */

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
