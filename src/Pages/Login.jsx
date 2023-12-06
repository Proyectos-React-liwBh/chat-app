import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
}
from 'mdb-react-ui-kit';
import logo from "../assets/Image/logo.png";
const Login = () => {
    return (
      <div className='gradient-custom-2 min-vh-100 d-flex align-items-center justify-content-center'>

      
      <div className="  gradient-form">
  
        <div className='row d-flex py-5 justify-content-center'>
  
          <div  className=" shadow-sm border-top bg-white col-10 col-md-6 col-sm-8 col-lg-4">
            <div className="d-flex flex-column justify-content-center   rounded-3">
  
              <div className="text-center mt-4">
              <img src={logo} alt="Chat App Logo" draggable="false" height={80} width={80} />

                <h4 className="mt-1 mb-5 pb-1">Chat App</h4>
              </div>
  
              <p>Por favor inicia sesión con tu cuenta</p>
  
  
              <MDBInput wrapperClass='mb-4' label='Correo electronico' id='form1' type='email'/>
              <MDBInput wrapperClass='mb-4' label='Contraseña' id='form2' type='password'/>
  
  
              <div className="text-center ">
                <button className="text-white mb-4 w-100 p-2 rounded gradient-custom-2 hover">Iniciar sesión</button>
                <a className="text-muted" href="#!">Olvido su contraseña?</a>
              </div>
  
              <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                <p className="mb-0">No tienes cuenta?</p>
                <a href="#!" className="mx-2 btn btn-outline-primary">Registrate</a>
              </div>
 

  
            </div>
  
          </div>
  
          <div  className=" rounded-3 px-0 d-none d-md-block col-6 col-lg-4">
            <div className="d-flex flex-column  justify-content-center bg-white h-100  bg-imagen">
  
              <div className="texto text-white px-3 py-4 p-md-5 mx-md-4">

                <h4 className="mb-4">Chatea con Pasión: Encuentra Tu Comunidad</h4>
                <p className="small mb-0">Conéctate con personas apasionadas en nuestra aplicación de chat por salas. Descubre y comparte tus intereses en un espacio diseñado para conversaciones auténticas. ¡Encuentra tu comunidad hoy!.
                </p>
              </div>
  
            </div>
  
          </div>
  
        </div>
  
      </div>
      </div>
    );
  }

export default Login;
