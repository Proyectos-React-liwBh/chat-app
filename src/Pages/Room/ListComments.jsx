/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { SweetAlertError } from "../../assets/SweetAlert/SweetAlert";
import CardComment from "../Card/CardComment.jsx";
import { useSelector, useDispatch } from "react-redux";
import { listComments, cleanAlert } from "../../Redux/CommentSlice";
import { ToastContainer } from "react-toastify";
import { ToastWarning, ToastSuccess } from "../../assets/Toastify/toastify";
import useWebSocket from "../../Hooks/UseWebSocket";
import { FaBell } from "react-icons/fa";

const ListComments = ({ room_id, userSession }) => {
  const dispatch = useDispatch();

  const { errorRedux } = useSelector((state) => state.comment);
  const { token } = useSelector((state) => state.user);
  const [page, setPage] = useState(2);
  const [chatListComments, setChatListComments] = useState([]);
  const refBoxComments = useRef(null);
  const [disableScrollDown, setDisableScrollDown] = useState(false);
  const [savedScrollHeight, setSavedScrollHeight] = useState(0);
  const [newComments, setNewComments] = useState(0);

  //hacer scroll hacia abajo
  const handleScrolDown = () => {
    const container = refBoxComments.current;
    container.scrollTop = container.scrollHeight;
    //console.log("handleScrolDown");
    //console.log("scrollHeight", container.scrollHeight);
    //reseteo el deshabilitar scroll hacia abajo
    setDisableScrollDown(false);
  };

  const handleSeeNewComments = () => {
    handleScrolDown();
    setNewComments(0);
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
      const lastComment = container.lastChild;
      const lastCommentPosition = lastComment.offsetTop + lastComment.offsetHeight;

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

      if (lastCommentPosition <= container.clientHeight + scrollPosition) {
        setNewComments(0);
      }

    };

    const container = refBoxComments.current;
    container.addEventListener("scroll", handleScroll);

    //mantener la posicion del scroll
    if (disableScrollDown) {
      const newScrollHeight = container.scrollHeight;
      const heightDifference = newScrollHeight - savedScrollHeight;
      container.scrollTop = heightDifference;
      //console.log("newScrollHeight", newScrollHeight);
      //console.log("savedScrollHeight", savedScrollHeight);
      //console.log("heightDifference", heightDifference);
    }

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [chatListComments]);

  //websocket
  const handleWebSocketListComments = (data) => {
    switch (data.action) {
      case "create":
        //console.log(data.Comment)
        setChatListComments((prevComments) => [...prevComments, data.Comment]);

        //notificacion de nuevo comentario
        if (data.Comment.user.id !== userSession.id) {
          //aumentar el contador de nuevos comentarios
          setNewComments((prevNewComments) => prevNewComments + 1);
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
  const wsUrl = `ws://127.0.0.1:8000/ws/comments/${room_id}/?token=${token}`;
  useWebSocket(wsUrl, room_id, handleWebSocketListComments);

  return (
    <div className="bg-chat">
      <ToastContainer />
      {newComments > 0 && (
        <div className="d-flex justify-content-end pt-2 pb-3">
          <div
            className="dropdown-toggle"
            id="newCommentsDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <FaBell className="text-white fs-5 bell-container" />
            {/* Counter  */}
            <span className="badge rounded-pill badge-notification bg-danger">
              {newComments}
            </span>
          </div>
          {/* Dropdown */}
          <ul
            className="dropdown-menu dropdown-menu-end bg-dark bg-gradient"
            aria-labelledby="newCommentsDropdown"
          >
            <li className="m-2" onClick={handleSeeNewComments}>
              <p className="text-center small text-white cursor-pointer new-comments">
                Hay{" "}
                {newComments === 1
                  ? "un nuevo comenterio"
                  : `${newComments} nuevos comentarios`}
              </p>
            </li>
          </ul>
        </div>
      )}
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
