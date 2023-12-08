import { useEffect } from "react";
import logo from "../assets/Image/logo.png";
import CardNotification from "../Pages/Card/CardNotification";
import { FaGear, FaBell } from "react-icons/fa6";
import { TiThMenu } from "react-icons/ti";
import { FaUser } from "react-icons/fa";
import { MdOutlineRoomPreferences } from "react-icons/md";
import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import useSesion from "../Hooks/UseSession";
import { useDispatch, useSelector } from "react-redux";
import { closeSession, cleanAlert } from "../Redux/UserSlice";
import {
  SweetAlertError,
  SweetAlertSuccess,
} from "../assets/SweetAlert/SweetAlert";
import { UseAvatarIcon } from "../Hooks/UseAvatarIcon";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userSession } = useSesion();
  const { message, errorRedux } = useSelector((state) => state.user);

  const cerrarSesionUsuario = () => {
    console.log("cerrar sesion");
    dispatch(closeSession());
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

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
    <div>
      <nav className="navbar navbar-expand-lg fixed-top bg-dark navbar-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <div className="d-flex justify-content-center align-content-center">
              <img
                src={logo}
                alt="Chat App Logo"
                draggable="false"
                height={40}
              />
              <h3 className="d-none d-md-inline-block ms-3">ChatSpace</h3>
            </div>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <TiThMenu className="fs-3 text-white" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-md-auto">
              <li className="nav-item">
                <Link className="nav-link mx-md-2" to="/rooms">
                  <div className="d-flex align-items-center">
                    <MdOutlineRoomPreferences className="text-secondary fs-3 me-2" />
                    <span className="fs-5 text-start">Mis Salas</span>
                  </div>
                </Link>
              </li>
              {/* Notifications */}
              <li className="nav-item dropdown mx-md-2">
                <div
                  className="nav-link dropdown-toggle"
                  id="notificationDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FaBell className="text-white fs-5 bell-container" />
                  {/* Counter - Notificación */}
                  <span className="badge bell-counter rounded-pill badge-notification bg-danger">
                    3
                  </span>
                </div>
                {/* Dropdown - Notificación  */}
                <div
                  className="dropdown-menu dropdown-menu-end bg-dark bg-gradient"
                  aria-labelledby="notificationDropdown"
                >
                  <h6 className="text-center text-white">
                    Notificaciones Activas
                  </h6>
                  <hr className="dropdown-divider bg-white" />
                  <ul
                    className="list-unstyled"
                    style={{ maxHeight: "240px", overflow: "auto" }}
                  >
                    <CardNotification />
                    <CardNotification />
                    <CardNotification />
                  </ul>
                  {/* <!-- Enlace a pagina de Notificación --> */}
                  <hr className="dropdown-divider bg-white" />
                  <Link
                    to={"/notifications"}
                    className="dropdown-item text-center small text-white"
                  >
                    Mostrar todas las Notificaciones
                  </Link>
                </div>
              </li>
              {/* info base de usuario */}
              <li className="nav-item dropdown mx-md-2">
                <div className="nav-link mx-md-2 d-flex justify-content-evenly align-items-center">
                  {/* icono de avatar */}
                  <div className="me-3">
                    <img className="img-fluid" width={30} height={30} src={UseAvatarIcon(userSession?.avatar).img} alt="Avatar de usuario" />
                  </div>
                  {/* Username */}
                  <div className="">
                    <span className="text-white me-1">Hola,</span>
                    <span className="text-white fw-bold">
                      {userSession?.username}
                    </span>
                  </div>
                </div>
              </li>

              {/* profile menu */}
              <li className="nav-item dropdown mx-md-2">
                <div
                  className="nav-link dropdown-toggle"
                  id="profileDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FaGear className="text-white fs-4 " />
                </div>
                <ul
                  className="dropdown-menu dropdown-menu-end bg-dark bg-gradient text-white list-unstyled"
                  aria-labelledby="profileDropdown"
                >
                  {sessionStorage.getItem("user") ? (
                    <>
                      <li className="m-2 hover-dark">
                        <Link
                          className="d-flex align-items-center text-decoration-none text-white"
                          to="/profile"
                        >
                          <FaUser />
                          <span className="ms-2">Perfil</span>
                        </Link>
                      </li>

                      <hr className="dropdown-divider bg-white" />

                      <li className="m-2 hover-dark">
                        <div
                          className="d-flex align-items-center text-white cursor-pointer"
                          onClick={cerrarSesionUsuario}
                        >
                          <BiLogOutCircle />
                          <span className="ms-2">Cerrar Sesión</span>
                        </div>
                      </li>
                    </>
                  ) : (
                    <li className="m-2 hover-dark">
                      <Link
                        className="d-flex align-items-center text-decoration-none text-white"
                        to="/login"
                      >
                        <BiLogInCircle />
                        <span className="ms-2">Login</span>
                      </Link>
                    </li>
                  )}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
