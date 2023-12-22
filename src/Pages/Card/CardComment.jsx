/* eslint-disable react/prop-types */
import { UseAvatarIcon } from "../../Hooks/UseAvatarIcon";
import UseDate from "../../Hooks/UseDate";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { SweetAlertEliminar } from "../../assets/SweetAlert/SweetAlert";
import { deleteComment, setCommentCurrent } from "../../Redux/CommentSlice";

const CardComment = ({ comment }) => {
  const dispatch = useDispatch();
  const { userSession, token } = useSelector((state) => state.user);

  //console.log(comment.content)

  const handleDelete = (comment) => {
    SweetAlertEliminar("¿Estas seguro de eliminar este comentario?", () => {
      dispatch(deleteComment({ token, id: comment.id }));
    });
  };

  const handleEdit = (comment) => {
    dispatch(setCommentCurrent(comment));
  };

  return (
    <div
      className={`card px-2 mx-3 ${
        comment.user.id != userSession.id
          ? "bg-card-comment-2"
          : "bg-card-comment"
      }`}
    >
      <div className="card-body bg-transparent">
        <div
          className={`card-header bg-transparent d-flex justify-content-between align-items-center border-bottom-1 ${
            comment.user.id == userSession.id ? "border-white" : "border-dark"
          }`}
        >
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
          {comment.user.id == userSession.id && (
            <div className="d-flex justify-content-end gap-2">
              <MdModeEdit className="fs-4 cursor-pointer text-warning" 
              onClick={() => handleEdit(comment)}
              />
              <MdDelete
                className="fs-4 cursor-pointer text-danger"
                onClick={() => handleDelete(comment)}
              />
            </div>
          )}
        </div>
        <div
          className="card-text py-2"
          dangerouslySetInnerHTML={{ __html: comment.content }}
        />

        {/* fechas */}
        <div className="d-flex justify-content-between align-items-center">
          <p className="card-text ">
            <small className="">Fecha del comentario: </small>
            {UseDate(comment.created_at)}
          </p>
          {comment.updated_at !== comment.created_at && (
            <p className="card-text">
              <small className="">Fecha de actualización: </small>
              {UseDate(comment.updated_at)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardComment;
