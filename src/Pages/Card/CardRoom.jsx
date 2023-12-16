/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiSolidCircle } from "react-icons/bi";

const CardRoom = ({ room }) => {
  const navigate = useNavigate();
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div className="">
      <div className="card-room">
        <div className="card shadow">
          <div className="card-body">
            <h4 className="card-title text-center">{room.name}</h4>

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
                <p className="text-center">{room.description}</p>
              </div>
            </div>

            <div className="py-2 d-flex justify-content-center align-items-center">
              <BiSolidCircle
                className={`fs-4 ${
                  room.users_count > 0 ? "text-success" : "text-danger"
                }`}
              />
              <span className="ms-2 text-muted small">
                Conectados: {room.users_count}
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
