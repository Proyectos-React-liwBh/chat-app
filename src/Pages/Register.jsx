import { MdOutlineEmail } from "react-icons/md";
import logo from "../assets/Image/logo.png";
import { CgPassword } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as Exp from "../assets/ExpresionesRegulares/Expresiones";
import { Link } from "react-router-dom";
import ErrorForm from "../Components//ErrorForm";
import { LiaUserSolid, LiaUserFriendsSolid } from "react-icons/lia";
const Register = () => {
  
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string()
        .min(2, "El nombre debe tener al menos 2 caracteres")
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
    <div className=" min-vh-100 bg-register d-flex align-items-center justify-content-center">
      <div className="  gradient-form w-100">
        <div className="row m-0 d-flex py-md-2 py-lg-2 justify-content-center">
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
                Registra tu cuenta de Chat Space
              </h2>

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
                  Crear cuenta
                </button>
              </div>
              <div className="row ">
                <div className="d-flex col justify-content-center mb-3">
                  <Link className="text-muted mx-2" to={"/login"}>
                    Ya tienes cuenta?
                  </Link>
                  <Link className="text-muted " to={"/forgot-password"}>
                    Olvido su contraseña?
                  </Link>
                </div>
              </div>
              <div className="d-flex flex-row align-items-center justify-content-center pb-3 mb-4">
                <Link
                  to={"/"}
                  className="mx-2 btn btn-outline-primary d-flex align-items-center"
                >
                  <FaHome className="mx-1  " />
                  Inicio
                </Link>
              </div>
            </div>
          </div>

          <div className=" rounded-3 px-0 d-none d-md-block col-6 col-lg-4">
            <div className="d-flex flex-column  justify-content-center bg-white h-100 w-100  bg-imagen">

            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Register