import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as Exp from "../assets/ExpresionesRegulares/Expresiones";
import { useNavigate, useParams } from "react-router-dom";
import ErrorForm from "../Components//ErrorForm";
import Asteroids from "../Components/Asteroids";
import Spinner from "../Components/Spinner";
import logo from "../assets/Image/logo.png";
import { cleanAlert, changePassword2 } from "../Redux/UserSlice";
import {
  SweetAlertError,
  SweetAlertSuccess,
} from "../assets/SweetAlert/SweetAlert";
import { CgPassword } from "react-icons/cg";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { otp } = useParams();

  const { errorRedux, message, loading } = useSelector((state) => state.user);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .max(16, "La contraseña debe tener menos de 16 caracteres")
        .required("La contraseña es requerida")
        .matches(
          Exp.passwordRegex,
          "La contraseña debe tener al menos menos una Mayúscula, una Minúscula y un Número."
        ),
        confirm_password: Yup.string()
        .oneOf(
          [Yup.ref("password"), null],
          "Las contraseñas deben coincidir"
        )
        .required("La confirmación de contraseña es requerida"),
    }),
    onSubmit: (values, { resetForm }) => {
      /* console.log(values);
          alert(JSON.stringify(values, null, 2)); */

      //enviar datos a backend
      dispatch(changePassword2({ ...values, otp }));

      //reseteo de formulario
      resetForm();
    },
  });

  useEffect(() => {
    if (message) {
      SweetAlertSuccess(message);

      setTimeout(() => {
        navigate("/login");
      }, 2500);

      dispatch(cleanAlert());
    }

    if (errorRedux) {
      SweetAlertError(errorRedux);
      dispatch(cleanAlert());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message, errorRedux]);

  return (
    <div className="bg-forgot min-vh-100 overflow-hidden d-flex justify-content-center  align-items-center ">
      <div className="gradient-form w-100 ">
        <div className="row m-0 d-flex py-5 justify-content-center">
          <div className=" shadow-sm border-top rounded-3 bg-white col-10 col-md-6 col-sm-8 col-lg-4">
            <div className="d-flex flex-column justify-content-center   rounded-3">
              <div className="text-center mt-4">
                <img
                  src={logo}
                  alt="Chat App Logo"
                  draggable="false"
                  height={80}
                  width={80}
                  className="rounded"
                />

                <h4 className="mt-1 mb-2 pb-1">Chat Space</h4>
              </div>
              <h2 className="text-center text-primary">
                {!loading ? "Cambia tu contraseña" : "Cambiando contraseña"}
              </h2>

              {loading ? (
                <div className="py-5">
                  <Spinner />
                </div>
              ) : (
                <form className="p-5" onSubmit={formik.handleSubmit}>
                  {/* contraseña */}
                  <div className="">
                    <div className="efecto my-3 d-flex align-items-center justify-content-center ">
                      <CgPassword className=" mx-2 icon" />
                      <input
                        className="effect-1 "
                        type="password"
                        placeholder="Contraseña"
                        id="password"
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        autoComplete="off"
                      />
                      <span className="focus-border"></span>
                    </div>

                    {formik.touched.password && formik.errors.password && (
                      <div className="error_form-container">
                        <ErrorForm message={formik.errors.password} />
                      </div>
                    )}
                  </div>

                  {/* repetir contraseña */}
                  <div className="">
                    <div className="efecto my-3 d-flex align-items-center justify-content-center ">
                      <CgPassword className=" mx-2 icon" />
                      <input
                        className="effect-1 "
                        type="password"
                        placeholder="Confirmar contraseña"
                        id="confirm_password"
                        name="confirm_password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.confirm_password}
                        autoComplete="off"
                      />
                      <span className="focus-border"></span>
                    </div>

                    {formik.touched.confirm_password &&
                      formik.errors.confirm_password && (
                        <div className="error_form-container">
                          <ErrorForm message={formik.errors.confirm_password} />
                        </div>
                      )}
                  </div>

                  {/* Boton de registrar */}
                  <div className="text-center  w-50 m-auto pt-3">
                    <button
                      type="submit"
                      className="text-white mb-4 w-100 p-2 rounded gradient-custom-2 hover"
                    >
                      Cambiar contraseña
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          <Asteroids />
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
