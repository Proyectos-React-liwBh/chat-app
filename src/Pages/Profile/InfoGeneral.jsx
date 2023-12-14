/* eslint-disable react/prop-types */
import { UseAvatarIcon } from "../../Hooks/UseAvatarIcon";

const InfoGeneral = ({ user }) => {
  return (
    <div className="p-5">
      <div className="row mt-4 d-flex align-items-center">
        <div className="col-lg-5 col-md-5 label fw-bold text-muted">
          Avatar
        </div>
        <div className="col-lg-7 col-md-7 ">
          <img
            src={UseAvatarIcon(user?.avatar).img}
            width={80}
            height={80}
            alt={`Avatar de ${user?.username}`}
          />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-lg-5 col-md-5 label fw-bold text-muted">
          Usuario
        </div>
        <div className="col-lg-7 col-md-7 border-1 border-bottom fst-italic">
          {user?.username}
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-lg-5 col-md-5 label fw-bold text-muted">Nombre</div>
        <div className="col-lg-7 col-md-7 border-1 border-bottom fst-italic">
          {user?.first_name}
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-lg-5 col-md-5 label fw-bold text-muted">
          Apellidos
        </div>
        <div className="col-lg-7 col-md-7 border-1 border-bottom fst-italic">
          {user?.last_name}
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-lg-5 col-md-5 label fw-bold text-muted">Correo</div>
        <div className="col-lg-7 col-md-7 border-1 border-bottom fst-italic">
          {user?.email}
        </div>
      </div>
    </div>
  );
};

export default InfoGeneral;
