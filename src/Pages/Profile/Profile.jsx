import Layout from "../../Components/Layout";
import AvatarPiker from "./AvatarPiker";
import { FaUserCog, FaUserEdit, FaUserCircle } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { BiSolidUserRectangle } from "react-icons/bi";
import InfoGeneral from "./InfoGeneral";

const Profile = () => {

  //temporal
  const usuario = {
    id: 1,
    username: "liwbh",
    first_name: "Wilfredo",
    last_name: "Barquero Herrera",
    email: "liwbarqueroh@gmail.com",
    avatar: 2,
  }



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

          <div className="col-12 col-md-8 pb-5">
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
                    <BiSolidUserRectangle className="me-2"/>
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
                  <div className="tab-pane fade pt-3" id="editar-perfil"></div>

                  {/* cambiar contraseña */}
                  <div
                    className="tab-pane fade  pt-3"
                    id="cambiar-contrasena"
                  ></div>
                  {/* cambiar avatar */}
                  <div className="tab-pane fade  pt-3" id="cambiar-avatar">
                    <AvatarPiker />
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
