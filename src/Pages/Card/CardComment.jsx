/* eslint-disable react/prop-types */
import { UseAvatarIcon } from "../../Hooks/UseAvatarIcon";
import UseDate from "../../Hooks/UseDate";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { useSelector } from "react-redux";

const CardComment = ({ comment }) => {

  const { userSession } = useSelector((state) => state.user);


  return (
    <div className={`card px-2 mx-3 ${comment.user.id != userSession.id ? "bg-card-comment-2" : "bg-card-comment"}`}>
      <div className="card-body bg-transparent">
        <div className={`card-header bg-transparent d-flex justify-content-between align-items-center border-bottom-1 ${comment.user.id == userSession.id ? "border-white" : "border-dark"}`}>
          {/* usuario creador */}
          <h5 className="card-title d-flex align-items-center">
            <img
              className="img-fluid"
              width={30}
              height={30}
              src={UseAvatarIcon(comment.user.avatar).img}
              alt="Avatar de usuario"
            />

            <span className="fw-bold ms-2">{comment.user.username}</span>
          </h5>
          {/* botones */}
          {
            comment.user.id == userSession.id && (
            <div className="d-flex justify-content-end gap-2">
              <MdModeEdit className="fs-4 cursor-pointer text-warning" />
              <MdDelete className="fs-4 cursor-pointer text-danger" />
            </div>
            )
          }
        </div>
        <p className="card-text py-2">{comment.content}</p>

        {/* fechas */}
        <div className="d-flex justify-content-between align-items-center">
          <p className="card-text ">
            <small className="">Fecha del comentario: </small>
            {UseDate(comment.create_at)}
          </p>
          {comment.update_at !== comment.create_at && (
            <p className="card-text">
              <small className="">Fecha de actualización: </small>
              {UseDate(comment.update_at)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardComment;
