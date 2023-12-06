import logo from "../assets/Image/logo.png";
import { useEffect } from "react";
import { FaGear, FaBell } from "react-icons/fa6";
import { TiThMenu } from "react-icons/ti";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";
const Navbar = () => {
  /* const dispatch = useDispatch(); */
  /* const navigate = useNavigate();

  const { message, errorRedux } = useSelector((state) => state.usuario);

  const cerrarSesionUsuario = () => {
    console.log("cerrar sesion");
    dispatch(cerrarSesion());
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  useEffect(() => {
    if (message) {
      SweetAlertSuccess(message);
      dispatch(limpiarAlertas());
    }
    if (errorRedux) {
      SweetAlertError(errorRedux);
      dispatch(limpiarAlertas());
    }
    // eslint-disable-next-line
  }, [message, errorRedux]); */
  return (
    <div>
      <nav className="navbar navbar-expand-lg fixed-top bg-dark navbar-dark">
        <div className="container">
          <a className="navbar-brand d-flex justify-content-center align-content-center" href="#">
            <img src={logo} alt="Chat App Logo" draggable="false" height={40} />
            <h3 className="d-none d-md-inline-block ms-3">ChatApp</h3>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <TiThMenu className="fs-3 text-white"/>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item">
                <a className="nav-link mx-2" href="#!">
                  <i className="fas fa-plus-circle pe-2" />
                  Mis Salas
                </a>
              </li>
              {/* Notifications */}
              <div className="dropdown">
                <div
                  data-mdb-dropdown-init
                  className="text-reset me-3 dropdown-toggle hidden-arrow"
                  id="navbarDropdownMenuLink"
                  role="button"
                  aria-expanded="false"
                >
                  <FaBell className="text-white"/>
                  <span className="badge rounded-pill badge-notification bg-danger">
                    1
                  </span>
                </div>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      Some news
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another news
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </div>

              <li className="nav-item dropdown ms-3">
              <div
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FaGear className="text-white fs-3 mx-2" />
                </div>
                <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdown"
              >
                {localStorage.getItem("usuario") ? (
                  <>
                    <li className="dropdown-item">
                      <Link
                        className="d-flex align-items-center text-decoration-none text-dark"
                        to="/perfil"
                      >
                        <FaUser />
                        <span className="ms-2">Perfil</span>
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li className="dropdown-item ">
                      <div
                        className="d-flex align-items-center"
                        /* onClick={cerrarSesionUsuario} */
                      >
                        <BiLogOutCircle />
                        <span className="ms-2">Cerrar Sesión</span>
                      </div>
                    </li>
                  </>
                ) : (
                  <li className="dropdown-item ">
                    <Link
                      className="d-flex align-items-center text-decoration-none text-dark"
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
