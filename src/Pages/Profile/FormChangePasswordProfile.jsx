/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as Exp from "../../assets/ExpresionesRegulares/Expresiones";
import ErrorForm from "../../Components/ErrorForm";
import { MdOutlineLockPerson, MdOutlineLockClock } from "react-icons/md";
import { changePassword } from "../../Redux/UserSlice";
import { useDispatch } from "react-redux";

const FormChangePasswordProfile = ({usuario, token}) => {
  const dispatch = useDispatch();

  const formikCambiarContrasena = useFormik({
    initialValues: {
      id: 0,
      old_password: "",
      new_password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      old_password: Yup.string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .max(16, "La contraseña debe tener menos de 16 caracteres")
        .required("La contraseña es requerida")
        .matches(
          Exp.passwordRegex,
          "La contraseña debe tener al menos menos una Mayúscula, una Minúscula y un Número."
        ),
        new_password: Yup.string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .max(16, "La contraseña debe tener menos de 16 caracteres")
        .required("La contraseña es requerida")
        .matches(
          Exp.passwordRegex,
          "La contraseña debe tener al menos menos una Mayúscula, una Minúscula y un Número."
        ),
      confirmPassword: Yup.string()
        .oneOf(
          [Yup.ref("new_password"), null],
          "Las contraseñas deben coincidir"
        )
        .required("La confirmación de contraseña es requerida"),
    }),
    onSubmit: (values, { resetForm }) => {
      /* console.log(values);
          alert(JSON.stringify(values, null, 2)); */

      //enviar datos a backend
      dispatch(changePassword({usuario: values, token}));

      //reseteo de formulario
      resetForm();
    },
  });

  useEffect(() => {
    if (usuario) {
      formikCambiarContrasena.setFieldValue("id", usuario.id);
    }
    // eslint-disable-next-line
  }, [usuario]);


  return (
    <form className="p-5" onSubmit={formikCambiarContrasena.handleSubmit}>
      <div className="row mb-3">
        <div className="col-12 col-md-5">
          <label className="form-label fw-bold" htmlFor="old_password">
            Contraseña Actual<MdOutlineLockPerson className="mx-2" />
          </label>
        </div>
        <div className="col-12 col-md-7">
          <input
            className="form-control"
            type="password"
            id="old_password"
            name="old_password"
            placeholder="Ingrese la contraseña actual"
            autoComplete="off"
            onChange={formikCambiarContrasena.handleChange}
            onBlur={formikCambiarContrasena.handleBlur}
            value={formikCambiarContrasena.values.old_password}
          />
        </div>
        <div className="row">
          <div className="col-12 col-md-5 d-none d-md-block"></div>
          <div className="col-12 col-md-7  d-flex justify-content-center">
            {/* mensaje de error */}
            {formikCambiarContrasena.touched.old_password &&
              formikCambiarContrasena.errors.old_password && (
                <div className="error_form-container">
                  <ErrorForm
                    message={formikCambiarContrasena.errors.old_password}
                  />
                </div>
              )}
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12 col-md-5">
          <label className="form-label fw-bold" htmlFor="new_password">
            Contraseña Nueva<MdOutlineLockPerson className="mx-2" />
          </label>
        </div>
        <div className="col-12 col-md-7">
          <input
            className="form-control"
            type="password"
            id="new_password"
            name="new_password"
            placeholder="Ingrese la contraseña del usuario:"
            autoComplete="off"
            onChange={formikCambiarContrasena.handleChange}
            onBlur={formikCambiarContrasena.handleBlur}
            value={formikCambiarContrasena.values.new_password}
          />
        </div>
        <div className="row">
          <div className="col-12 col-md-5 d-none d-md-block"></div>
          <div className="col-12 col-md-7  d-flex justify-content-center">
            {/* mensaje de error */}
            {formikCambiarContrasena.touched.new_password &&
              formikCambiarContrasena.errors.new_password && (
                <div className="error_form-container">
                  <ErrorForm
                    message={formikCambiarContrasena.errors.new_password}
                  />
                </div>
              )}
          </div>
        </div>
      </div>

      <div className="row my-4">
        <div className="col-12 col-md-5">
          <label className="form-label fw-bold" htmlFor="confirmPassword">
            Confirmar Contraseña <MdOutlineLockClock className="mx-2" />
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
            value={formikCambiarContrasena.values.confirmPassword}
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
                    message={formikCambiarContrasena.errors.confirmPassword}
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
  );
};

export default FormChangePasswordProfile;
