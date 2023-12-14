import { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import AvatarPiker from "./AvatarPiker";
import { FaUserCog, FaUserEdit, FaUserCircle } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { BiSolidUserRectangle } from "react-icons/bi";
import InfoGeneral from "./InfoGeneral";
import FormChangePasswordProfile from "./FormChangePasswordProfile";
import FormAdminProfile from "./FormAdminProfile";
import FormEditProfile from "./FormEditProfile";



import { RiAdminFill } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { cleanAlert } from "../../Redux/UserSlice";
import {
  SweetAlertError,
  SweetAlertSuccess,
} from "../../assets/SweetAlert/SweetAlert";

const Profile = () => {
  const dispatch = useDispatch();
  const { message, errorRedux, userSession, token } = useSelector(
    (state) => state.user
  );
  const [usuario, setUsuario] = useState({});

  useEffect(() => {
    setUsuario(userSession);
    // eslint-disable-next-line
  }, [userSession]);

  useEffect(() => {
    if (message) {
      SweetAlertSuccess(message);
      dispatch(cleanAlert());
    }

    if (errorRedux) {
      SweetAlertError(errorRedux);
      dispatch(cleanAlert());
    }

    // eslint-disable-next-line
  }, [message, errorRedux]);

  return (
    <div className="bg-profile">
      <Layout>
        <div className="row justify-content-center pb-5 min-vh-50">
          <h2 className="mb-5 pt-3 text-white fw-bold">
            <div className="d-flex align-items-center">
              <FaUserCog className="me-2 fs-1" />
              {usuario.username}
            </div>
          </h2>

          <div className="col-10 pb-5">
            <div className="card shadow">
              <div className="card-body pt-3">
                {/* tabs de perfil */}
                <ul className="nav nav-underline justify-content-around">
                  <li className="nav-item">
                    <button
                      className="nav-link active fw-bold"
                      data-bs-toggle="tab"
                      data-bs-target="#informacion-perfil"
                    >
                      <div className="d-flex align-items-center">
                        <BiSolidUserRectangle className="me-2" />
                        Información General
                      </div>
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link fw-bold"
                      data-bs-toggle="tab"
                      data-bs-target="#editar-perfil"
                    >
                      <div className="d-flex align-items-center">
                        <FaUserEdit className="me-2" />
                        Editar perfil
                      </div>
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link fw-bold"
                      data-bs-toggle="tab"
                      data-bs-target="#cambiar-contrasena"
                    >
                      <div className="d-flex align-items-center">
                        <RiLockPasswordFill className="me-2" />
                        Cambiar la Contraseña
                      </div>
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link fw-bold"
                      data-bs-toggle="tab"
                      data-bs-target="#cambiar-avatar"
                    >
                      <div className="d-flex align-items-center">
                        <FaUserCircle className="me-2" />
                        Cambiar Avatar
                      </div>
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link fw-bold"
                      data-bs-toggle="tab"
                      data-bs-target="#admin-cuenta"
                    >
                      <div className="d-flex align-items-center">
                        <RiAdminFill className="me-2" />
                        Administrar Cuenta
                      </div>
                    </button>
                  </li>
                </ul>
                <div className="tab-content pt-2">
                  {/* informacion general */}
                  <div
                    className="tab-pane fade show active pt-3"
                    id="informacion-perfil"
                  >
                    <InfoGeneral user={usuario} />
                  </div>
                  {/* editar informacion */}
                  <div className="tab-pane fade pt-3" id="editar-perfil">
                    <FormEditProfile usuario={usuario} token={token} />
                  </div>

                  {/* cambiar contraseña */}
                  <div className="tab-pane fade  pt-3" id="cambiar-contrasena">
                    <FormChangePasswordProfile />
                  </div>
                  {/* cambiar avatar */}
                  <div className="tab-pane fade  pt-3" id="cambiar-avatar">
                    <AvatarPiker usuario={usuario} token={token} />
                  </div>

                  {/* administrar cuenta */}
                  <div
                    className="tab-pane fade pt-3"
                    id="admin-cuenta"
                  >
                    <FormAdminProfile usuario={usuario} token={token} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Profile;
