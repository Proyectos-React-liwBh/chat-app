import { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Layout from "../../Components/Layout";
import Spinner from "../../Components/Spinner";
import UseDate from "../../Hooks/UseDate";
import { UseAvatarIcon } from "../../Hooks/UseAvatarIcon";
import { TiDocumentText } from "react-icons/ti";
import { BiSolidCircle } from "react-icons/bi";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { LiaComments } from "react-icons/lia";
import { FaPeopleRoof } from "react-icons/fa6";
import NewComment from "./NewComment";
import { useSelector, useDispatch } from "react-redux";
import { getRoom, cleanAlert, followRoom } from "../../Redux/RoomSlice";
import { useParams } from "react-router-dom";
import {
  SweetAlertError,
  SweetAlertSuccess,
} from "../../assets/SweetAlert/SweetAlert";

const Room = () => {
  const dispatch = useDispatch();

  const [room, setRoom] = useState(null);
  const [usersCount, setUsersCount] = useState(0);

  const { token, userSession } = useSelector((state) => state.user);
  const { errorRedux, message } = useSelector((state) => state.room);
  const { id } = useParams();

  const handleFollow = () => {
    dispatch(followRoom({ token, id }));
  };

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

    if (message) {
      SweetAlertSuccess(message);
      dispatch(cleanAlert());
    }
  }, [errorRedux, message]);



   useEffect(() => {
    // Conectar al WebSocket al entrar a la sala
    const websocket = new WebSocket(`ws://127.0.0.1:8000/ws/chat/`);
    
    // Manejar los mensajes recibidos
    websocket.onmessage = (e) => {
      let data = JSON.parse(e.data);

      console.log(data);

      if (data.type === 'connect') {
        console.log(data.message);
      }

      if (data.type === 'disconnect') {
        console.log(data.message);
      }
    };

    // Desconectar el WebSocket al salir de la sala
    return () => {
      console.log("Desconectado del WebSocket")
      websocket.close();
    };
  }, []);

  
  return (
    <Layout>
      {room ? (
        <main className="container min-vh-100 ">
          {/* info sala */}
          <section>
            {/* encabezado */}
            <div className="row py-5">
              <div className="col-12 col-md-6">
                <h3 className="text-center display-5 d-flex align-items-center">
                  <FaPeopleRoof className="me-2 " />
                  <span>{room.name}</span>
                </h3>
              </div>
            </div>
            {/* detalles */}
            <div className="row">
              <div className="col-12 col-md-6">
                <img
                  src={room.image}
                  alt={room.name}
                  className="img-fluid rounded"
                />
              </div>

              <div className="col-12 col-md-6 mt-4 mt-md-0 d-flex flex-column">
                <h5 className="d-flex align-items-center text-secondary">
                  <TiDocumentText className="me-3 fs-3" />{" "}
                  <span className="fw-bold">Descripción</span>
                </h5>

                <p className="text-muted flex-grow-1 py-5">
                  {room.description}
                </p>

                {/* creador */}
                <div className="">
                  <div className="py-3 d-flex justify-content-start align-items-center">
                    <span className="me-3">Creada por: </span>

                    <img
                      className="img-fluid me-2"
                      width={30}
                      height={30}
                      src={UseAvatarIcon(room.user.avatar).img}
                      alt="Avatar de usuario"
                    />

                    <span className="fw-bold">{room.user.username}</span>
                  </div>
                </div>

                {/*conectados - seguir */}
                <div className="pt-3 pt-md-0">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <BiSolidCircle
                        className={`fs-4 ${
                          usersCount > 0 ? "text-success" : "text-danger"
                        }`}
                      />
                      <span className="ms-2 text-muted small">
                        Conectados: {usersCount}
                      </span>
                    </div>

                    {room.user.id !== userSession.id && (
                      <div className="d-flex align-items-center">
                        <button
                          className="btn btn-dark d-flex align-items-center"
                          onClick={handleFollow}
                        >
                          <MdOutlineLibraryAdd className="me-2 fs-5" />
                          <small>Seguir</small>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* fechas */}
            <div className="row">
              {/* fecha creacion */}
              <div className="col-6 pt-3">
                <p className="text-muted small d-flex justify-content-start">
                  Creado el {UseDate(room.created_at)}
                </p>
              </div>

              {/* fecha actualizacion */}
              {room.created_at !== room.updated_at && (
                <div className="col-6 pt-3 d-flex justify-content-end">
                  <p className="text-muted small ">
                    Actualizado el {UseDate(room.updated_at)}
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* chat */}
          <section>
            <h3 className="display-6 py-2">
              <LiaComments /> Comentarios
            </h3>
            <div className="box-chat bg-chat shadow rounded min-vh-50 overflow-y-auto">
              <NewComment />
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
