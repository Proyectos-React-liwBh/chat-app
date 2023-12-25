import { useState, useEffect } from "react";
import Layout from "../../Components/Layout";
import Spinner from "../../Components/Spinner";
import { LiaComments } from "react-icons/lia";
import { FaPeopleRoof } from "react-icons/fa6";
import NewComment from "./NewComment";
import { useSelector, useDispatch } from "react-redux";
import { getRoom, cleanAlert } from "../../Redux/RoomSlice";
import { useParams } from "react-router-dom";
import {
  SweetAlertError,
} from "../../assets/SweetAlert/SweetAlert";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import DetailsRoom from "./DetailsRoom.jsx";
import DetailsRoomFull from "./DetailsRoomFull.jsx";
import ListComments from "./ListComments.jsx";
import useWebSocket from "../../Hooks/UseWebSocket";

const Room = () => {
  const dispatch = useDispatch();

  const [room, setRoom] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [usersCount, setUsersCount] = useState(0);

  const { token, userSession } = useSelector((state) => state.user);
  const { errorRedux, message } = useSelector((state) => state.room);
  const { id } = useParams();

  useEffect(() => {
    if (token) {
      dispatch(getRoom({ token, id })).then((state) => {
        setRoom({ ...state.payload.Room });
      });
    }
  }, [token]);

  useEffect(() => {
    if (errorRedux) {
      SweetAlertError(errorRedux);
      dispatch(cleanAlert());
    }
  }, [errorRedux, message]);

  const wsUrl = `ws://127.0.0.1:8000/ws/chat/${id}/`;

  const handleWebSocketCounter = (data) => {
    if (data.user_count) {
      setUsersCount(data.user_count);
    }
  }

  useWebSocket(wsUrl, id, handleWebSocketCounter);

 /*  useEffect(() => {
    // Conectar al WebSocket al entrar a la sala
    const websocket = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${id}/`);

    // Manejar la apertura de la conexión
    websocket.onopen = () => {
      console.log("Conectado WebSocket");
      // Enviar un mensaje de inicialización con el ID de la sala
      websocket.send(
        JSON.stringify({
          type: "add_user",
          message: "Nuevo usuario",
        })
      );
    };

    // Manejar los mensajes recibidos
    websocket.onmessage = async (e) => {
      let data = await JSON.parse(e.data);
      //console.log(data);

      if (data.user_count) {
        setUsersCount(data.user_count);
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
  }, [id]);
 */
  return (
    <Layout>
      {room ? (
        <main className="container min-vh-100 ">
          {/* info sala */}
          <section>
            {/* encabezado */}
            <div className="row py-3 d-flex align-items-center">
              <div className="col-12 col-md-6">
                <h3 className="text-center display-5 d-flex align-items-center">
                  <FaPeopleRoof className="me-2 " />
                  <span>{room.name}</span>
                </h3>
              </div>
              <div className="col-12 col-md-6">
                <div className="d-flex justify-content-md-end">
                  {showDetails ? (
                    <BiSolidUpArrow
                      onClick={() => setShowDetails(!showDetails)}
                      className="fs-4 text-secondary cursor-pointer"
                    />
                  ) : (
                    <BiSolidDownArrow
                      onClick={() => setShowDetails(!showDetails)}
                      className="fs-4 text-secondary cursor-pointer"
                    />
                  )}
                </div>
              </div>
            </div>

            {showDetails ? (
              <DetailsRoomFull room={room} usersCount={usersCount} id={id} />
            ) : (
              <DetailsRoom room={room} usersCount={usersCount} />
            )}
          </section>

          {/* chat */}
          <section>
            <h3 className="display-6 py-2">
              <LiaComments /> Comentarios
            </h3>

            <div className="container-chat ">
              {/* listar comentarios */}
              <ListComments room_id={id} userSession={userSession} />

              {/* formulario nuevo comentario */}
              <NewComment room={room} />
            </div>
          </section>
        </main>
      ) : (
        <div className="py-3">
          <Spinner />
        </div>
      )}
    </Layout>
  );
};

export default Room;
