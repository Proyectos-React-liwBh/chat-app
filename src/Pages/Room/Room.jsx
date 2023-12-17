import { useState, useEffect } from "react";
import Layout from "../../Components/Layout";
import { data2 } from "../../assets/JS/scripts";
import Spinner from "../../Components/Spinner";
import UseDate from "../../Hooks/UseDate";
import { UseAvatarIcon } from "../../Hooks/UseAvatarIcon";
import { TiDocumentText } from "react-icons/ti";
import { BiSolidCircle } from "react-icons/bi";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { LiaComments } from "react-icons/lia";
import { FaPeopleRoof } from "react-icons/fa6";
import NewComment from "./NewComment";

const Room = () => {
  console.log(data2);

  const [room, setRoom] = useState(null);

  useEffect(() => {
    setRoom({ ...data2 });
  }, []);

  console.log(room);

  return (
    <Layout>
      {room ? (
        <main className="container min-vh-100 ">
          {/* info sala */}
          <section>
            {/* encabezado */}
            <div className="row py-5">
              <div className="col-12 col-md-6">
                <h3 className="text-center display-5 d-flex align-items-center">
                  <FaPeopleRoof className="me-2 " />
                  <span>{room.name}</span>
                </h3>
              </div>
            </div>
            {/* detalles */}
            <div className="row">
              <div className="col-12 col-md-6">
                <img
                  src={room.image}
                  alt={room.name}
                  className="img-fluid rounded"
                />
              </div>

              <div className="col-12 col-md-6 mt-4 mt-md-0 d-flex flex-column">
                <h5 className="d-flex align-items-center text-secondary">
                  <TiDocumentText className="me-3 fs-3" />{" "}
                  <span className="fw-bold">Descripción</span>
                </h5>

                <p className="text-muted flex-grow-1 py-5">{room.description}</p>

                {/* creador */}
                <div className="">
                <div className="py-3 d-flex justify-content-start align-items-center">
                  <span className="me-3">Creada por: </span>

                  <img
                    className="img-fluid me-2"
                    width={30}
                    height={30}
                    src={UseAvatarIcon(room.user.avatar).img}
                    alt="Avatar de usuario"
                  />

                  <span className="fw-bold">{room.user.first_name}</span>
                </div>
              </div>

                {/*conectados - seguir */}
                <div className="pt-3 pt-md-0">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <BiSolidCircle
                        className={`fs-4 ${
                          room.users_count > 0 ? "text-success" : "text-danger"
                        }`}
                      />
                      <span className="ms-2 text-muted small">
                        Conectados: {room.users_count}
                      </span>
                    </div>

                    <div className="d-flex align-items-center">
                      <button className="btn btn-dark d-flex align-items-center">
                        <MdOutlineLibraryAdd className="me-2 fs-5" />
                        <small>Seguir</small>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* fechas */}
            <div className="row">
              {/* fecha creacion */}
              <div className="col-6 pt-3">
                <p className="text-muted small d-flex justify-content-start">
                  Creado el {UseDate(room.create_at)}
                </p>
              </div>

              {/* fecha actualizacion */}
              {room.create_at !== room.update_at && (
                <div className="col-6 pt-3 d-flex justify-content-end">
                  <p className="text-muted small ">
                    Actualizado el {UseDate(room.update_at)}
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* chat */}
          <section>
            <h3 className="display-6 py-2">
              <LiaComments /> Comentarios
            </h3>
            <div className="box-chat bg-light shadow rounded min-vh-50 overflow-y-auto">
              <NewComment />
            </div>
          </section>
        </main>
      ) : (
        <div className="py-3">
          <Spinner />
        </div>
      )}
    </Layout>
  );
};

export default Room;
