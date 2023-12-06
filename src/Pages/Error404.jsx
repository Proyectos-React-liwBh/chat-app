
import { Link } from "react-router-dom";
import img from "../assets/Image/page404.gif";

const Error404 = () => {
  return (
    <div className="background-page404 d-flex flex-column min-vh-100">
      <img className="img-page404" src={img} alt="Pagina 404" />
      <div className="py-2">
        <h1 className="error-text">
          Vaya, parece que no podemos encontrar el recurso que estás buscando.
        </h1>
        <p className="text">
          Verifique que la dirección del sitio web se escriba correctamente.
        </p>
      </div>

      <div className="py-2 d-flex justify-content-center align-content-center">
        <Link className="error" to="/">
          Ir a inicio
          <span className="star">•</span>
          <span className="star">•</span>
          <span className="star">•</span>
          <span className="star">•</span>
          <span className="star">•</span>
          <span className="star">•</span>
        </Link>
      </div>
    </div>
  );
};

export default Error404;
