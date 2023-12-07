import Layout from "../../Components/Layout";
import AvatarPiker from "./AvatarPiker";
import { FaUserCog, FaUserEdit, FaUserCircle } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { BiSolidUserRectangle } from "react-icons/bi";
import InfoGeneral from "./InfoGeneral";
import { useFormik } from "formik";

import * as Yup from "yup";
import * as Exp from "../../assets/ExpresionesRegulares/Expresiones";

import ErrorForm from "../../Components//ErrorForm";
import { LiaUserSolid, LiaUserFriendsSolid } from "react-icons/lia";

import { MdOutlineMail, MdOutlineLockPerson, MdOutlineLockClock, } from "react-icons/md";
const Profile = () => {
  //temporal
  const usuario = {
    id: 1,
    username: "liwbh",
    first_name: "Wilfredo",
    last_name: "Barquero Herrera",
    email: "liwbarqueroh@gmail.com",
    avatar: 2,
  };

  const formikCambiarContrasena = useFormik({
    initialValues: {
      id: 0,
      password: "",
      confirmPassword: "",
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
        confirmPassword: Yup.string()
        .oneOf(
          [Yup.ref("usuarioContrasena"), null],
          "Las contraseñas deben coincidir"
        )
        .required("La confirmación de contraseña es requerida"),
    }),
    onSubmit: (values, { resetForm }) => {
      /* console.log(values);
      alert(JSON.stringify(values, null, 2)); */

      //enviar datos a backend
      /* dispatch(cambiarContrasena(values)); */

      //reseteo de formulario
      resetForm();
    },
  });

  const formikEditarUsuario = useFormik({
    initialValues: {
      id: 0,
      first_name: "",
      last_name: "",
      email: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string()
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .max(30, "El nombre debe tener menos de 30 caracteres")
        .required("El nombre es requerido")
        .matches(
          Exp.nameRegex,
          "El nombre solo debe contener letras y espacios."
        ),
      last_name: Yup.string()
        .min(6, "Los apellidos debe tener al menos 6 caracteres")
        .max(30, "Los apellidos debe tener menos de 30 caracteres")
        .required("Los apellidos es requerido")
        .matches(
          Exp.nameRegex,
          "Los apellidos solo debe contener letras y espacios."
        ),

      email: Yup.string()
        .min(10, "El correo debe tener al menos 10 caracteres")
        .max(50, "El correo debe tener menos de 50 caracteres")
        .required("El correo es requerido")
        .matches(Exp.emailRegex, "Debe ingresar un correo valido."),
    }),
    onSubmit: (values) => {
      /* console.log(values);
      alert(JSON.stringify(values, null, 2)); */
      //enviar datos a backend
      /*  dispatch(editarUsuario(values)); */
    },
  });

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
                    <form
                      className="p-5"
                      onSubmit={formikEditarUsuario.handleSubmit}
                    >
                      <div className="row mb-3">
                        <div className="col-12 col-md-5">
                          <label
                            className="form-label fw-bold"
                            htmlFor="usuarioNombre"
                          >
                            Nombre <LiaUserSolid className="mx-2" />
                          </label>
                        </div>
                        <div className="col-12 col-md-7">
                          <input
                            className="form-control"
                            type="text"
                            id="first_name"
                            name="first_name"
                            placeholder="Ingrese el nombre del usuario"
                            autoComplete="off"
                            onChange={formikEditarUsuario.handleChange}
                            onBlur={formikEditarUsuario.handleBlur}
                            value={formikEditarUsuario.values.first_name}
                          />
                        </div>
                        <div className="row">
                          
                          <div className="col-12 col-md-5 d-none d-md-block"></div>
                          <div className="col-12 col-md-7  d-flex justify-content-center">
                            {/* mensaje de error */}
                            {formikEditarUsuario.touched.first_name &&
                              formikEditarUsuario.errors.first_name && (
                                <div className="error_form-container d-flex justify-content-center">
                                  <ErrorForm
                                    message={
                                      formikEditarUsuario.errors.first_name
                                    }
                                  />
                                </div>
                              )}
                          </div>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-12 col-md-5">
                          <label
                            className="form-label fw-bold"
                            htmlFor="last_name"
                          >
                            Apellidos <LiaUserFriendsSolid className="mx-2" />
                          </label>
                        </div>
                        <div className="col-12 col-md-7">
                          <input
                            className="form-control"
                            type="text"
                            id="last_name"
                            name="last_name"
                            placeholder="Ingrese los apellidos del usuario:"
                            autoComplete="off"
                            onChange={formikEditarUsuario.handleChange}
                            onBlur={formikEditarUsuario.handleBlur}
                            value={formikEditarUsuario.values.last_name}
                          />
                        </div>
                        <div className="row">
                          <div className="col-12 col-md-5 d-none d-md-block"></div>
                          <div className="col-12 col-md-7  d-flex justify-content-center">
                            {/* mensaje de error */}
                            {formikEditarUsuario.touched.last_name &&
                              formikEditarUsuario.errors.last_name && (
                                <div className="error_form-container">
                                  <ErrorForm
                                    message={
                                      formikEditarUsuario.errors.last_name
                                    }
                                  />
                                </div>
                              )}
                          </div>
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-12 col-md-5">
                          <label className="form-label fw-bold" htmlFor="email">
                            Correo <MdOutlineMail className="mx-2" />
                          </label>
                        </div>
                        <div className="col-12 col-md-7">
                          <input
                            className="form-control"
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Ingrese el correo del usuario:"
                            autoComplete="off"
                            onChange={formikEditarUsuario.handleChange}
                            onBlur={formikEditarUsuario.handleBlur}
                            value={formikEditarUsuario.values.email}
                          />
                        </div>
                        <div className="row">
                          <div className="col-12 col-md-5 d-none d-md-block"></div>
                          <div className="col-12 col-md-7  d-flex justify-content-center">
                            {/* mensaje de error */}
                            {formikEditarUsuario.touched.email &&
                              formikEditarUsuario.errors.email && (
                                <div className="error_form-container">
                                  <ErrorForm
                                    message={formikEditarUsuario.errors.email}
                                  />
                                </div>
                              )}
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-12 col-md-4 d-none d-md-block"></div>
                        <div className="col-12 col-md-8 text-center">
                          <button className="btn btn-primary" type="submit">
                            Guardar
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>

                  {/* cambiar contraseña */}
                  <div
                    className="tab-pane fade  pt-3"
                    id="cambiar-contrasena" 
                  >
                     <form
                      className="p-5"
                      onSubmit={formikCambiarContrasena.handleSubmit}
                    >
                      <div className="row mb-3">
                        <div className="col-12 col-md-5">
                          <label
                            className="form-label fw-bold"
                            htmlFor="password"
                          >
                            Contraseña <MdOutlineLockPerson className="mx-2" />
                          </label>
                        </div>
                        <div className="col-12 col-md-7">
                          <input
                            className="form-control"
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Ingrese la contraseña del usuario:"
                            autoComplete="off"
                            onChange={formikCambiarContrasena.handleChange}
                            onBlur={formikCambiarContrasena.handleBlur}
                            value={
                              formikCambiarContrasena.values.password
                            }
                          />
                        </div>
                        <div className="row">
                          <div className="col-12 col-md-5 d-none d-md-block"></div>
                          <div className="col-12 col-md-7  d-flex justify-content-center">
                          {/* mensaje de error */}
                          {formikCambiarContrasena.touched.password &&
                            formikCambiarContrasena.errors
                              .password && (
                              <div className="error_form-container">
                                <ErrorForm
                                  message={
                                    formikCambiarContrasena.errors
                                      .password
                                  }
                                />
                              </div>
                            )}
                        </div>
                        </div>
                      </div>
                      <div className="row my-4">
                        <div className="col-12 col-md-5">
                          <label
                            className="form-label fw-bold"
                            htmlFor="confirmPassword"
                          >
                            Confirmar Contraseña{" "}
                            <MdOutlineLockClock className="mx-2" />
                          </label>
                        </div>
                        <div className="col-12 col-md-7">
                          <input
                            className="form-control"
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirmar la contraseña del usuario:"
                            autoComplete="off"
                            onChange={formikCambiarContrasena.handleChange}
                            onBlur={formikCambiarContrasena.handleBlur}
                            value={
                              formikCambiarContrasena.values.confirmPassword
                            }
                          />
                        </div>
                        <div className="row">
                          <div className="col-12 col-md-5 d-none d-md-block"></div>
                          <div className="col-12 col-md-7  d-flex justify-content-center">
                          {/* mensaje de error */}
                          {formikCambiarContrasena.touched.confirmPassword &&
                            formikCambiarContrasena.errors.confirmPassword && (
                              <div className="error_form-container">
                                <ErrorForm
                                  message={
                                    formikCambiarContrasena.errors
                                      .confirmPassword
                                  }
                                />
                              </div>
                            )}
                        </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-12 col-md-4 d-none d-md-block"></div>
                        <div className="col-12 col-md-8 text-center">
                          <button className="btn btn-primary" type="submit">
                            Guardar
                          </button>
                        </div>
                      </div>
                    </form>

                  </div>
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
