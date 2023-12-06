import logo from "../assets/Image/logo.png";

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer id="footer"  className="footer bg-dark">
      <div className="row m-0 justify-content-center align-items-center ">
        <div className="col-12 col-md-4 text-center">
          <p className="p-0 mb-0 text-white">
            &copy;
            <span className="mx-2 text-white" >Todos los derechos reservados</span>
            <strong>{year}</strong>
          </p>
        </div>
        <div className="col-md-4 d-none d-md-block">
          <div className="d-flex justify-content-center">
            <img src={logo} width={30} height={30} alt="imagen logo" />
          </div>
        </div>
        <div className="col-md-4 text-center text-white d-none d-md-block">
          <p className="p-0 mb-0">
            {" "}
            Diseñado por : Elmer - Wilfredo
          </p>
        </div>
      </div>
    </footer>
    
  )
}

export default Footer