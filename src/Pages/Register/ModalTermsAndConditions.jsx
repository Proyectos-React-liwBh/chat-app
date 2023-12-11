import logo from "../../assets/Image/logo.png";

const ModalTermsAndConditions = () => {
  return (
    <div
      className="modal fade"
      id="modalTermsAndConditions"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header text-white bg-gradient bg-dark">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Términos y Condiciones de Uso
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body small">
            <h4 className="text-center text-secondary">Chat Space</h4>
            <div className="d-flex justify-content-center align-content-center mb-2">
              <img
                src={logo}
                alt="logo"
                width={50}
                height={50}
                className="img-fluid rounded"
              />
            </div>
            <h5 className="mb-3">¡Bienvenido a Chat Space!</h5>
            <p>
              Al utilizar nuestra aplicación de chat, aceptas cumplir con los
              siguientes términos y condiciones. Te pedimos que leas
              detenidamente esta información para garantizar una experiencia
              segura y positiva para todos los usuarios.
            </p>
            {/* condicion 1 */}
            <h6>1. Uso Adecuado:</h6>
            <p>
              <strong>a. </strong>
              La aplicación se proporciona para la comunicación y conexión de
              usuarios con intereses afines. El uso indebido, acoso o cualquier
              actividad que viole nuestros términos no será tolerado.
            </p>
            {/* condicion 2 */}
            <h6>2. Privacidad y Seguridad:</h6>
            <p>
              <strong>a. </strong>
              Nos tomamos en serio la privacidad de nuestros usuarios. Toda la
              información proporcionada se maneja de acuerdo con nuestra
              política de privacidad. Asegúrate de revisar y entender cómo
              gestionamos tus datos.
            </p>

            {/* condicion 3 */}
            <h6>3. Contenido Apropiado:</h6>
            <p>
              <strong>a. </strong>
              No se permite contenido ofensivo, ilegal o que viole los derechos
              de propiedad intelectual. Respetamos la diversidad y esperamos que
              todos los usuarios hagan lo mismo.
            </p>
            {/* condicion 4 */}
            <h6>4. Cookies y Tecnologías Similares:</h6>
            <p>
              <strong>a. </strong>
              Utilizamos cookies y tecnologías similares para recopilar
              información y mejorar la funcionalidad de nuestra plataforma.
              Estas cookies nos permiten recordar tus preferencias, personalizar
              tu experiencia y analizar el uso de Chat Space.
            </p>
            <p>
              <strong>b. </strong>
              Puedes configurar tu navegador para rechazar cookies o recibir
              alertas cuando se envíen cookies. Sin embargo, ten en cuenta que
              esto puede afectar la funcionalidad de Chat Space.
            </p>
            {/* condicion 5 */}
            <h6>5. Responsabilidad del Usuario:</h6>
            <p>
              <strong>a. </strong>
              Eres responsable de la información que compartes y de tu conducta
              en la aplicación. Cualquier actividad que incumpla estos términos
              puede resultar en la suspensión o eliminación de tu cuenta.
            </p>
            {/* condicion 6 */}
            <h6>6. Actualizaciones y Cambios:</h6>
            <p>
              <strong>a. </strong>
              Nos reservamos el derecho de actualizar estos términos en
              cualquier momento. Te notificaremos sobre cambios significativos,
              pero es tu responsabilidad revisar periódicamente los términos y
              condiciones.
            </p>

            {/* condicion 7 */}
            <h6>7. Suspensión y Prohibición de Cuentas:</h6>
            <p>
              <strong>a. </strong>
              Nos reservamos el derecho de suspender o prohibir cuentas de
              usuarios que violen repetidamente estos términos y condiciones.
              Esto incluye, pero no se limita a, comportamientos inapropiados,
              acoso, violación de derechos de propiedad intelectual, o cualquier
              actividad que perjudique la experiencia de otros usuarios.
            </p>
            <p>
              <strong>b. </strong>
              La suspensión o prohibición de una cuenta puede ocurrir sin previo
              aviso y está sujeta a nuestra discreción. Nos esforzamos por
              mantener un entorno seguro y respetuoso para todos los usuarios.
            </p>
            <p>
              <strong>c. </strong>
              Si consideras que tu cuenta fue suspendida o prohibida
              injustamente, puedes comunicarte con nuestro equipo de soporte en{" "}
              <a href="mailto:practicaprograuniversidad@gmail.com">
                practicaprograuniversidad@gmail.com
              </a>{" "}
              para revisar tu caso.
            </p>

            {/* condicion 8 */}
            <h6>8. Contacto:</h6>

            {/* aviso final */}
            <p className="">
              <strong>a. </strong>
              Si tienes preguntas o inquietudes sobre estos términos,
              contáctanos en{" "}
              <a href="mailto:practicaprograuniversidad@gmail.com">
                practicaprograuniversidad@gmail.com
              </a>{" "}
              para obtener asistencia.
            </p>
          </div>
          <div className="modal-footer bg-gradient bg-secondary ">
            <button
              type="button"
              className="btn btn-success"
              data-bs-dismiss="modal"
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalTermsAndConditions;
