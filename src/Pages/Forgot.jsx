import { MdOutlineEmail } from "react-icons/md";
import logo from "../assets/Image/logo.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as Exp from "../assets/ExpresionesRegulares/Expresiones";
import { Link } from "react-router-dom";
import ErrorForm from "../Components//ErrorForm";
import Asteroids from "../Components/Asteroids";

const Forgot = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .min(10, "El correo debe tener al menos 10 caracteres")
        .max(50, "El correo debe tener menos de 50 caracteres")
        .required("El correo es requerido")
        .matches(Exp.emailRegex, "Debe ingresar un correo valido."),
    }),
    onSubmit: (values, { resetForm }) => {
      /* console.log(values);
              alert(JSON.stringify(values, null, 2)); */
      /* ToastWarning("Enviando correo, por favor espere..."); */

      //enviar datos a backend
      /* dispatch(recuperarContrasena(values)); */

      //reseteo de formulario
      resetForm();
    },
  });
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
                Recupera tu constraseña
              </h2>

              <form onSubmit={formik.handleSubmit}>
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
              <div className="text-center  w-50 m-auto pt-3">
                <button className="text-white mb-4 w-100 p-2 rounded gradient-custom-2 hover">
                  Enviar
                </button>
              </div>
              <div className="d-flex justify-content-center mx-4 mb-3 py-3">
                  <Link className="text-muted mx-4" to={"/login"}>
                    Ya tienes cuenta?
                  </Link>
                  <Link className="text-muted mx-4" to={"/register"}>
                    No tienes cuenta?
                  </Link>
                </div>
                </form>

            </div>
          </div>

          <Asteroids />
        </div>
      </div>
     
    </div>
  );
};

export default Forgot;
