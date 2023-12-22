/* eslint-disable react/prop-types */
import { BiSolidCircle } from "react-icons/bi";
import { UseAvatarIcon } from "../../Hooks/UseAvatarIcon";

const DetailsRoom = ({ room, usersCount }) => {
  return (
    <div className="d-flex py-3 justify-content-between align-items-center">
      {/* creador */}

      <div className="d-flex justify-content-start align-items-center">
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

      {/*conectados */}
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
      </div>
    </div>
  );
};

export default DetailsRoom;
