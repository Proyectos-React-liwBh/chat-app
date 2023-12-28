/* eslint-disable react/prop-types */
import { UseAvatarIcon } from "../../Hooks/UseAvatarIcon";
import UseDate from "../../hooks/UseDate";
import { TiDocumentText } from "react-icons/ti";
import { BiSolidCircle } from "react-icons/bi";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { followRoom, unfollowRoom } from "../../Redux/RoomSlice";
import { IoMdCheckboxOutline } from "react-icons/io";

const DetailsRoomFull = ({ room, usersCount, id }) => {
  const dispatch = useDispatch();

  const { token, userSession } = useSelector((state) => state.user);

  const handleFollow = () => {
    dispatch(followRoom({ token, id }));
  };

  const handleDelete = (room) => {
    dispatch(unfollowRoom({ id: room.id, token }));
  };

  return (
    <>
      {/* detalles */}
      <div className="row">
        <div className="col-12 col-md-6">
          <img src={room.image} alt={room.name} className="img-fluid rounded" />
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

              <span className="fw-bold">{room.user.username}</span>
            </div>
          </div>

          {/*conectados - seguir */}
          <div className="pt-3 pt-md-0">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <BiSolidCircle
                  className={`fs-4 ${
                    usersCount > 0 ? "text-success" : "text-danger"
                  }`}
                />
                <span className="ms-2 text-muted small">
                  Conectados: {usersCount}
                </span>
              </div>

              {room.user.id !== userSession.id && (
                <div className="d-flex align-items-center">
                  {room.IsFollow ? (
                    <button
                      className="btn btn-success d-flex align-items-center"
                      onClick={() => handleDelete(room)}
                    >
                      <IoMdCheckboxOutline className="me-2 fs-5" />
                      <small>Seguiendo</small>
                    </button>
                  ) : (
                    <button
                      className="btn btn-dark d-flex align-items-center"
                      onClick={handleFollow}
                    >
                      <MdOutlineLibraryAdd className="me-2 fs-5" />
                      <small>Seguir</small>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* fechas */}
      <div className="row">
        {/* fecha creacion */}
        <div className="col-6 pt-3">
          <p className="text-muted small d-flex justify-content-start">
            Creado el {UseDate(room.created_at)}
          </p>
        </div>

        {/* fecha actualizacion */}
        {room.created_at !== room.updated_at && (
          <div className="col-6 pt-3 d-flex justify-content-end">
            <p className="text-muted small ">
              Actualizado el {UseDate(room.updated_at)}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default DetailsRoomFull;
