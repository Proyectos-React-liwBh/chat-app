

import Layout from "../Components/Layout"
const Profile = () => {

  return (
    <Layout>
      <div className="row justify-content-center pb-5 min-vh-50">
        <h2 className="mb-5 pt-3">Perfil de Usuario</h2>

        
          <div className="col-12 col-md-8 pb-5">
            <div className="card shadow">
              <div className="card-body pt-3">
                {/* tabs de perfil */}
                <ul className="nav nav-underline">
                  <li className="nav-item">
                    <button
                      className="nav-link active fw-bold"
                      data-bs-toggle="tab"
                      data-bs-target="#informacion-perfil"
                    >
                      Información General
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link fw-bold"
                      data-bs-toggle="tab"
                      data-bs-target="#editar-perfil"
                    >
                      Editar perfil
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link fw-bold"
                      data-bs-toggle="tab"
                      data-bs-target="#cambiar-contrasena"
                    >
                      Cambiar la Contraseña
                    </button>
                  </li>
                </ul>
                <div className="tab-content pt-2">
                  {/* informacion general */}
                  <div
                    className="tab-pane fade show active pt-3"
                    id="informacion-perfil"
                  >
                    <div className="p-5">
                      <div className="row mt-4">
                        <div className="col-lg-5 col-md-5 label fw-bold">
                          Nombre 
                        </div>
                        <div className="col-lg-7 col-md-7 border-1 border-bottom">
                          
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-lg-5 col-md-5 label fw-bold">
                          Apellidos 
                        </div>
                        <div className="col-lg-7 col-md-7 border-1 border-bottom">
                          
                        </div>
                      </div>

                      <div className="row mt-4">
                        <div className="col-lg-5 col-md-5 label fw-bold">
                          Correo 
                        </div>
                        <div className="col-lg-7 col-md-7 border-1 border-bottom">
                          
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* editar informacion */}
                  <div className="tab-pane fade pt-3" id="editar-perfil">

                  </div>

                  {/* cambiar contraseña */}
                  <div className="tab-pane fade  pt-3" id="cambiar-contrasena">
                    {/* End Change Password Form */}
                  </div>
                </div>
              </div>
            </div>
          </div>

      </div>
    </Layout>
    
  )
}

export default Profile