import { useEffect } from "react";
import {
  SweetAlertError,
  SweetAlertSuccess,
} from "../assets/SweetAlert/SweetAlert";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyUser, cleanAlert } from "../Redux/UserSlice";
import logo from "../assets/Image/logo.png";
import Spinner from "../Components/Spinner";

const Activate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useParams();

  //manejo de alertas
  const { errorRedux, message } = useSelector((state) => state.user);

  useEffect(() => {
    if (message) {
      SweetAlertSuccess(message);
      if (message === "Usuario verificado correctamente!") {
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
      dispatch(cleanAlert());
    }
    if (errorRedux) {
      SweetAlertError(errorRedux);
      dispatch(cleanAlert());
    }

    // eslint-disable-next-line
  }, [message, errorRedux]);

  useEffect(() => {
    if (token) {
      dispatch(verifyUser(token));
    }

    // eslint-disable-next-line
  }, [token]);

  return (
    <div className="bg-recovery min-vh-100  ">
      <div className="row min-vh-100 p-0 m-0 d-flex flex-column justify-content-center align-items-center">
        <div className="col-12 col-md-6 col-lg-6">
          <div className="bg-white rounded">
            <div className="p-4">
              <div className="text-center">
                <img
                  src={logo}
                  alt="logo"
                  width={100}
                  className="img-fluid rounded"
                />
              </div>
              <div className="text-center mt-4">
                <h4 className="tex-center mb-4">
                  Estamos Verificando su cuenta
                </h4>
              </div>
              <div className="text-center mt-4">
                <p>Espere un momento, mientras activamos su cuenta.</p>
              </div>

              <div className="">
                <Spinner />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activate;
