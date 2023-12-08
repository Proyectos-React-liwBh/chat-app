import { MdOutlineEmail } from "react-icons/md";
import logo from "../assets/Image/logo.png";
import { CgPassword } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as Exp from "../assets/ExpresionesRegulares/Expresiones";
import { Link } from "react-router-dom";
import ErrorForm from "../Components//ErrorForm";

const Login = () => {


  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
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
      email: Yup.string()
        .min(10, "El correo debe tener al menos 10 caracteres")
        .max(50, "El correo debe tener menos de 50 caracteres")
        .required("El correo es requerido")
        .matches(Exp.emailRegex, "Debe ingresar un correo valido."),
    }),
    onSubmit: (values, { resetForm }) => {
      /* console.log(values);
          alert(JSON.stringify(values, null, 2)); */

      //enviar datos a backend
      //dispatch(logearUsuario(values));

      //redirecionamiento a dashboard
      setTimeout(() => {
        //navigate("/");
      }, 1500);

      //reseteo de formulario
      setTimeout(() => {
        resetForm();
      }, 1500);
    },
  });
  return (
    <div className="gradient-custom-2 min-vh-100  d-flex align-items-center justify-content-center">
      <div className="  gradient-form">
        <div className="row d-flex py-5 justify-content-center mx-0 px-0">
          <div className=" shadow-sm border-top bg-white col-10 col-md-6 col-sm-8 col-lg-4">
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

                <h4 className="mt-1 mb-5 pb-1">Chat Space</h4>
              </div>

              <h2 className="text-center text-primary">
                Inicia sesión con tu cuenta
              </h2>
              <form action="">

              

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

              <div className="text-center  w-50 m-auto pt-3">
                <button className="text-white mb-4 w-100 p-2 rounded gradient-custom-2 hover">
                  Iniciar sesión
                </button>
              </div>
     
                <div className="d-flex col justify-content-center mb-3 py-4">
                  <Link className="text-muted mx-4" to={"/register"}>
                    No tienes cuenta?
                  </Link>
                  <Link className="text-muted mx-4" to={"/forgot-password"}>
                    Olvido su contraseña?
                  </Link>
                </div>


              </form>
            </div>
            
          </div>

          <div className=" rounded-3 px-0 d-none d-md-block col-6 col-lg-4">
            <div className="d-flex flex-column  justify-content-center bg-white h-100  bg-imagen">
              <div className="texto text-white px-3 py-4 p-md-5 mx-md-4">
                <h4 className="mb-4">Encuentra Tu Comunidad</h4>
                <p className="small mb-0">
                  Conéctate con personas apasionadas en nuestra aplicación de
                  chat por salas. Descubre y comparte tus intereses en un
                  espacio diseñado para conversaciones auténticas. ¡Encuentra tu
                  comunidad hoy!.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
