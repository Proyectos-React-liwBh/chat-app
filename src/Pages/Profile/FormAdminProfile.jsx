/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaUserSlash } from "react-icons/fa";
import { deleteUser, closeSession } from "../../Redux/UserSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const FormAdminProfile = ({usuario, token}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showDelete, setShowDelete] = useState(false);

  const handleDeleteUser = () => {
    dispatch(deleteUser({ usuario, token}));

    setTimeout(() => {
      dispatch(closeSession());
      navigate("/");
    }, 3000);
  };

  return (
    <div className="p-5">
      <div className="d-flex justify-content-between">
        <h4 className="text-danger d-flex align-items-center"> <FaUserSlash className="me-2" /> Eliminar cuenta </h4>
        <button className="btn btn-dark" onClick={() => setShowDelete(true)}>
          Continuar
        </button>
      </div>

      <div
        className={`bg-light shadow p-3 mt-4 rounded ${
          showDelete ? "d-block" : "d-none"
        }`}
      >
        <h3 className="text-danger">¿Está seguro de eliminar su cuenta?</h3>
        <p className="lead p-1">Esta acción no se puede deshacer.</p>
        <p className="lead p-1">
          Se eliminarán todos los datos asociados a su cuenta. 
          También perderá el acceso a su cuenta, de forma permanente.
        </p>
        <div className="d-flex justify-content-between">
          <button className="btn btn-danger fw-bold" onClick={handleDeleteUser}>
            Aceptar
          </button>
          <button
            className="btn btn-secondary fw-bold"
            onClick={() => setShowDelete(false)}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormAdminProfile;
