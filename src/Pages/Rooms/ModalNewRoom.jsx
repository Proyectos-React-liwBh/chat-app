import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRoom } from "../../Redux/RoomSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorForm from "../../Components/ErrorForm";
import * as Exp from "../../assets/ExpresionesRegulares/Expresiones";
import Dropzone from "../../Components/Dropzone";


const ModalNewRoom = () => {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.user);
  const { message } = useSelector((state) => state.room);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      image: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("El nombre es obligatorio")
        .max(50, "El nombre debe tener menos de 50 caracteres")
        .min(4, "El nombre debe tener al menos 4 caracteres")
        .matches(Exp.expName, "El nombre no es válido")
        .test(
          "no-leading-trailing-space",
          "No debe haber espacios al inicio ni al final",
          (value) => {
            if (value) {
              return !/^\s+|\s+$/.test(value); // Verifica que no haya espacios al inicio ni al final
            }
            return true; // Si el campo está vacío, pasa la validación
          }
        ),
      description: Yup.string()
        .required("La descripción es obligatoria")
        .max(250, "La descripción debe tener menos de 250 caracteres")
        .min(10, "La descripción debe tener al menos 10 caracteres")
        .matches(Exp.expDescription, "La descripción no es válida")
        .test(
          "no-leading-trailing-space",
          "No debe haber espacios al inicio ni al final",
          (value) => {
            if (value) {
              return !/^\s+|\s+$/.test(value); // Verifica que no haya espacios al inicio ni al final
            }
            return true; // Si el campo está vacío, pasa la validación
          }
        ),
      image: Yup.string().required("La imagen es obligatoria"),
    }),
    onSubmit: (values, { resetForm }) => {
      //console.log(values);
      // alert(JSON.stringify(values, null, 2));

      // enviar datos al servidor
      dispatch(createRoom({room: values,  token}));

      //reseteo de formulario
      resetForm();
    },
  });

  // limpiar imagen 
  useEffect(() => {
    if(formik.values.image){
      formik.setFieldValue("image", "");
    }
  }, []);

  const handeCloseModal = (modalID) => {
    // Obtén una referencia al botón del modal por su clase
    let modalButton = document.querySelector(modalID);

    // Simula un clic en el botón
    modalButton.click();
  };

  useEffect(() => {
    if (message === "Sala creada correctamente") {
     /*  console.log(message) */
      handeCloseModal("#btnModalNewRoom");
    }
  }, [message]);

  return (
    <div
      className="modal fade"
      id="ModalNewRoom"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-dark text-white">
            <h3 className="modal-title fs-5" id="exampleModalLabel">
              Nueva Sala
            </h3>
            <button
              type="button"
              className="btn-close bg-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            {/* formulario */}
            <div className="p-3">
              <form className="" onSubmit={formik.handleSubmit}>
                {/* nombre de sala */}
                <div className="row mb-3">
                  <label className="form-label fw-bold" htmlFor="name">
                    Nombre:
                  </label>

                  <input
                    className="form-control"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Ingrese el nombre del categoria"
                    autoComplete="off"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />

                  {/* mensaje de error */}
                  {formik.touched.name && formik.errors.name && (
                    <div className="error_form-container">
                      <ErrorForm message={formik.errors.name} />
                    </div>
                  )}
                </div>

                {/* descripcion de sala */}
                <div className="row mb-3">
                  <label className="form-label fw-bold" htmlFor="description">
                    Descripción:
                  </label>

                  <textarea
                    style={{
                      resize: "none",
                    }}
                    className="form-control"
                    id="description"
                    name="description"
                    placeholder="Ingrese la descripción de la categoria"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    rows={3}
                    value={formik.values.description}
                    autoComplete="off"
                  />

                  {/* mensaje de error */}
                  {formik.touched.description && formik.errors.description && (
                    <div className="error_form-container">
                      <ErrorForm message={formik.errors.description} />
                    </div>
                  )}
                </div>

                <div className="row mb-3">
                  <label
                    className="form-label fw-bold"
                    htmlFor="categoriaImagen"
                  >
                    Imagen:
                  </label>

                  <Dropzone
                    id="dropzone"
                    setImage={formik.setFieldValue}
                    nombreAtributo={"image"}
                    image={formik.values.image}
                  />

                  {/* mensaje de error */}
                  {formik.touched.image && formik.errors.image && (
                    <div className="error_form-container">
                      <ErrorForm message={formik.errors.image} />
                    </div>
                  )}
                </div>

                <div className="text-center">
                  <button className="btn btn-primary btn-sm" type="submit">
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ModalNewRoom;
