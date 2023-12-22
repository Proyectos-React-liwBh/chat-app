/* eslint-disable react/prop-types */
import { useEffect } from "react";
import {
  SweetAlertError,
  SweetAlertSuccess,
} from "../../assets/SweetAlert/SweetAlert";
/* import { data3 } from "../../assets/JS/scripts.js"; */
import CardComment from "../Card/CardComment.jsx";
import { useSelector, useDispatch } from "react-redux";
import { listComments, cleanAlert } from "../../Redux/CommentSlice";

const ListComments = ({ room_id, userSession }) => {
  const dispatch = useDispatch();

  const { errorRedux, message, comments } = useSelector((state) => state.comment);
  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(listComments({ room_id, token }));
  }, [room_id, token]);

  useEffect(() => {
    if (errorRedux) {
      SweetAlertError(errorRedux);
      dispatch(cleanAlert());
    }

    if (message) {
      SweetAlertSuccess(message);
      dispatch(listComments({ room_id, token }));
      dispatch(cleanAlert());
    }
  }, [errorRedux, message]);

  return (
    <div className="bg-chat">
      <div className="box-chat py-4 ">
        {comments.map((comment) => (
          <div
            className={`row py-3 d-flex ${
              comment.user.id != userSession.id
                ? "justify-content-end"
                : "justify-content-start"
            }`}
            key={comment.id}
          >
            <div className="col-12 col-md-10 col-lg-8">
              <CardComment comment={comment} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListComments;
