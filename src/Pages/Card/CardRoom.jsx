/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiSolidCircle } from "react-icons/bi";

const CardRoom = ({ room }) => {
  const navigate = useNavigate();
  const [showDescription, setShowDescription] = useState(false);

  const [usersCount, setUsersCount] = useState(0);

  const limitName = (name) => {
    if (name.length > 20) {
      return `${name.substring(0, 20)}...`;
    } else {
      return name;
    }
  };

  useEffect(() => {
    if (room.user_count) {
      setUsersCount(room.user_count);
    }
  }, [room]);

  useEffect(() => {
    // Conectar al WebSocket al entrar a la sala
    const websocket = new WebSocket(`ws://127.0.0.1:8000/ws/user_count/${room.id}/`);

    // Manejar la apertura de la conexión
    websocket.onopen = () => {
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

      console.log(data);

      if (data.user_count) {
        setUsersCount(data.user_count);
      }
    };

    // Desconectar el WebSocket al salir de la sala
    return () => {
      websocket.close();
      console.log("desconectado socket");
    };
  }, []);


  return (
    <div className="">
      <div className="card-room">
        <div className="card shadow">
          <div className="card-body">
            <h4 className="card-title text-center">{limitName(room.name)}</h4>

            <div className="card-room-img">
              <img
                className="card-img"
                src={room.image}
                alt={`Sala ${room.name}`}
              />
              <div
                className={`card-room-description ${
                  showDescription ? "d-block" : "d-none"
                }`}
              >
                <p className="text-center overflow-y-auto">{room.description}</p>
              </div>
            </div>

            <div className="py-2 d-flex justify-content-center align-items-center">
              <BiSolidCircle
                className={`fs-4 ${
                  usersCount > 0 ? "text-success" : "text-danger"
                }`}
              />
              <span className="ms-2 text-muted small">
                Conectados: {usersCount}
              </span>
            </div>

            <p className="text-center fw-bold text-muted cursor-pointer"
             onClick={() => setShowDescription(!showDescription)}>
              Ver descripción...
            </p>

            <div className="py-1 text-center">
              <button
                className="btn btn-dark btn-sm"
                onClick={() => navigate(`/room/${room.id}`)}
              >
                Ingresar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardRoom;
