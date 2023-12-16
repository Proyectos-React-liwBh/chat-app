import { useEffect } from "react";
import logo from "../../assets/Image/logo.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as Exp from "../../assets/ExpresionesRegulares/Expresiones";
import { Link, useNavigate } from "react-router-dom";
import ErrorForm from "../../Components/ErrorForm";
import { CgPassword } from "react-icons/cg";
import { MdOutlineEmail } from "react-icons/md";
import {
  LiaUserSolid,
  LiaUserFriendsSolid,
  LiaUserTagSolid,
} from "react-icons/lia";
import {
  SweetAlertError,
  SweetAlertSuccess,
  SweetAlertAccept,
} from "../../assets/SweetAlert/SweetAlert";
import { cleanAlert, insertUser } from "../../Redux/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import Asteroids from "../../Components/Asteroids";
import ModalTermsAndConditions from "./ModalTermsAndConditions";
import Spinner from "../../Components/Spinner";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //manejo de alertas
  const { errorRedux, message, loading } = useSelector((state) => state.user);

  const formik = useFormik({
    initialValues: {
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      termsAndConditions: false,
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "El nombre de usuario debe tener al menos 3 caracteres")
        .max(50, "El nombre de usuario debe tener menos de 50 caracteres")
        .required("El nombre de usuario es requerido")
        .matches(Exp.textRegex, "Debe ingresar un nombre valido."),
      first_name: Yup.string()
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .max(50, "El nombre debe tener menos de 50 caracteres")
        .required("El nombre es requerido")
        .matches(Exp.nameRegex, "Debe ingresar un nombre valido."),
      last_name: Yup.string()
        .min(2, "los apellidos debe tener al menos 2 caracteres")
        .max(50, "los apellidos debe tener menos de 50 caracteres")
        .required("los apellidos son requeridos")
        .matches(Exp.nameRegex, "Debe ingresar un apellido valido."),
      password: Yup.string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .max(16, "La contraseña debe tener menos de 16 caracteres")
        .required("La contraseña es requerida")
        .matches(
          Exp.passwordRegex,
          "La contraseña debe tener al menos menos una Mayúscula, una Minúscula y un Número."
        ),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir")
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .max(16, "La contraseña debe tener menos de 16 caracteres")
        .required("La confirmación de contraseña es requerida"),
      email: Yup.string()
        .min(10, "El correo debe tener al menos 10 caracteres")
        .max(50, "El correo debe tener menos de 50 caracteres")
        .required("El correo es requerido")
        .matches(Exp.emailRegex, "Debe ingresar un correo valido."),
      termsAndConditions: Yup.boolean()
        .oneOf([true], "Debe aceptar los términos y condiciones para continuar")
        .required("Debe aceptar los terminos y condiciones"),
    }),
    onSubmit: (values, { resetForm }) => {
      /* console.log(values);
          alert(JSON.stringify(values, null, 2)); */

      //enviar datos a backend
      dispatch(insertUser(values));

      //reseteo de formulario
      setTimeout(() => {
        resetForm();
      }, 1500);
    },
  });

  const handleRedirect = () => {
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  useEffect(() => {
    if (message) {
      SweetAlertSuccess(message);
      setTimeout(() => {
        SweetAlertAccept(
          "Cuenta Registrada!",
          "Se te ha enviado un correo de confirmación, por favor revisa tu bandeja de entrada.",
          handleRedirect
        );
      }, 2500);
      dispatch(cleanAlert());
    }
    if (errorRedux) {
      SweetAlertError(errorRedux);
      dispatch(cleanAlert());
    }

    // eslint-disable-next-line
  }, [message, errorRedux]);

  return (
    <div className="min-vh-100 bg-register d-flex flex-column align-items-center justify-content-center overflow-hidden position-relative">
      {/* modales */}
      <ModalTermsAndConditions />
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
                {!loading ? " Registra tu cuenta gratis" : "Registrando cuenta"}
              </h2>

              {loading ? (
                <div className="py-5">
                  <Spinner />
                </div>
              ) : (
                <form onSubmit={formik.handleSubmit}>
                  {/* username */}
                  <div className="">
                    <div className="efecto my-3 d-flex align-items-center justify-content-center ">
                      <LiaUserTagSolid className={`mx-2  icon`} />
                      <input
                        className="effect-1"
                        type="text"
                        placeholder="Usuario"
                        id="username"
                        name="username"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                        autoComplete="off"
                      />

                      <span className="focus-border"></span>
                    </div>

                    {formik.touched.username && formik.errors.username && (
                      <div className="error_form-container row">
                        <ErrorForm message={formik.errors.username} />
                      </div>
                    )}
                  </div>

                  {/* name */}
                  <div className="">
                    <div className="efecto my-3 d-flex align-items-center justify-content-center ">
                      <LiaUserSolid className={`mx-2  icon`} />
                      <input
                        className="effect-1"
                        type="text"
                        placeholder="Nombre"
                        id="first_name"
                        name="first_name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.first_name}
                        autoComplete="off"
                      />

                      <span className="focus-border"></span>
                    </div>

                    {formik.touched.first_name && formik.errors.first_name && (
                      <div className="error_form-container row">
                        <ErrorForm message={formik.errors.first_name} />
                      </div>
                    )}
                  </div>

                  {/* last name */}
                  <div className="">
                    <div className="efecto my-3 d-flex align-items-center justify-content-center ">
                      <LiaUserFriendsSolid className={`mx-2  icon`} />

                      <input
                        className="effect-1"
                        type="text"
                        placeholder="Apellidos"
                        id="last_name"
                        name="last_name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.last_name}
                        autoComplete="off"
                      />

                      <span className="focus-border"></span>
                    </div>

                    {formik.touched.last_name && formik.errors.last_name && (
                      <div className="error_form-container row">
                        <ErrorForm message={formik.errors.last_name} />
                      </div>
                    )}
                  </div>

                  {/* email */}
                  <div className="">
                    <div className="efecto my-3 d-flex align-items-center justify-content-center ">
                      <MdOutlineEmail className={`mx-2  icon`} />
                      <input
                        className="effect-1"
                        type="email"
                        placeholder="Correo electronico"
                        id="email"
                        name="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        autoComplete="off"
                      />

                      <span className="focus-border"></span>
                    </div>

                    {formik.touched.email && formik.errors.email && (
                      <div className="error_form-container row">
                        <ErrorForm message={formik.errors.email} />
                      </div>
                    )}
                  </div>

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
                        id="passwordConfirm"
                        name="passwordConfirm"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.passwordConfirm}
                        autoComplete="off"
                      />
                      <span className="focus-border"></span>
                    </div>

                    {formik.touched.passwordConfirm &&
                      formik.errors.passwordConfirm && (
                        <div className="error_form-container">
                          <ErrorForm message={formik.errors.passwordConfirm} />
                        </div>
                      )}
                  </div>

                  {/* terminos y condiciones */}
                  <div className="text-dark mx-4 pt-3">
                    <input
                      type="checkbox"
                      name="termsAndConditions"
                      id="termsAndConditions"
                      className="mx-3 mb-2"
                      {...formik.getFieldProps("termsAndConditions")}
                    />
                    <label
                      className=" border-bottom border-black fw-bold"
                      htmlFor="termsAndConditions"
                      style={{ cursor: "pointer" }}
                      data-bs-toggle="modal"
                      data-bs-target="#modalTermsAndConditions"
                    >
                      Aceptar términos y condiciones
                    </label>
                    {formik.touched.termsAndConditions &&
                      formik.errors.termsAndConditions && (
                        <ErrorForm message={formik.errors.termsAndConditions} />
                      )}
                  </div>

                  {/* Boton de registrar */}
                  <div className="text-center  w-50 m-auto pt-3">
                    <button
                      type="submit"
                      className="text-white mb-4 w-100 p-2 rounded gradient-custom-2 hover"
                    >
                      Crear cuenta
                    </button>
                  </div>

                  {/* enlaces */}
                  <div className="row ">
                    <div className="d-flex col justify-content-center mb-3">
                      <Link className="text-muted mx-2" to={"/login"}>
                        Ya tienes cuenta?
                      </Link>
                    </div>
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

export default Register;
