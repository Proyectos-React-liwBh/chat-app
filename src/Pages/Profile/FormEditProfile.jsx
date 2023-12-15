/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as Exp from "../../assets/ExpresionesRegulares/Expresiones";
import ErrorForm from "../../Components//ErrorForm";
import { editUser } from "../../Redux/UserSlice";
import { useDispatch } from "react-redux";
import { LiaUserSolid, LiaUserFriendsSolid,LiaUserTagSolid  } from "react-icons/lia";
import { MdOutlineMail } from "react-icons/md";

const FormEditProfile = ({ usuario, token }) => {
  const dispatch = useDispatch();

  const formikEditarUsuario = useFormik({
    initialValues: {
      id: 0,
      username: "",
      first_name: "",
      last_name: "",
      email: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(4, "El nombre de usuario debe tener al menos 4 caracteres")
        .max(30, "El nombre de usuario debe tener menos de 30 caracteres")
        .required("El nombre de usuario es requerido")
        .matches(
          Exp.usernameRegex,
          "El nombre de usuario solo debe contener letras, números y guiones."
        ),
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
    onSubmit: (values, { resetForm }) => {
      /* console.log(values);
      alert(JSON.stringify(values, null, 2)); */

      //enviar datos a backend
      dispatch(editUser({usuario: values, token}));

      //reseteo de formulario
      resetForm();
    },
  });

    useEffect(() => {

        if (usuario){
            formikEditarUsuario.setFieldValue("id", usuario.id);
            formikEditarUsuario.setFieldValue("username", usuario.username);
            formikEditarUsuario.setFieldValue("first_name", usuario.first_name);
            formikEditarUsuario.setFieldValue("last_name", usuario.last_name);
            formikEditarUsuario.setFieldValue("email", usuario.email);
       }
    
    }, [usuario]);

  return (
    <form className="p-5" onSubmit={formikEditarUsuario.handleSubmit}>
      <div className="row mb-3">
        <div className="col-12 col-md-5">
          <label className="form-label fw-bold" htmlFor="username">
            Username <LiaUserTagSolid  className="mx-2" />
          </label>
        </div>
        <div className="col-12 col-md-7">
          <input
            className="form-control"
            type="text"
            id="username"
            name="username"
            placeholder="Ingrese el nombre del usuario"
            autoComplete="off"
            onChange={formikEditarUsuario.handleChange}
            onBlur={formikEditarUsuario.handleBlur}
            value={formikEditarUsuario.values.username}
          />
        </div>
        <div className="row">
          <div className="col-12 col-md-5 d-none d-md-block"></div>
          <div className="col-12 col-md-7  d-flex justify-content-center">
            {/* mensaje de error */}
            {formikEditarUsuario.touched.username &&
              formikEditarUsuario.errors.username && (
                <div className="error_form-container d-flex justify-content-center">
                  <ErrorForm message={formikEditarUsuario.errors.username} />
                </div>
              )}
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12 col-md-5">
          <label className="form-label fw-bold" htmlFor="first_name">
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
                  <ErrorForm message={formikEditarUsuario.errors.first_name} />
                </div>
              )}
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-12 col-md-5">
          <label className="form-label fw-bold" htmlFor="last_name">
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
                  <ErrorForm message={formikEditarUsuario.errors.last_name} />
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
                  <ErrorForm message={formikEditarUsuario.errors.email} />
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
  );
};

export default FormEditProfile;
