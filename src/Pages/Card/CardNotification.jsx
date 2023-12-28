/* eslint-disable react/prop-types */
import { IoCalendarSharp } from "react-icons/io5";
import { ImFileText } from "react-icons/im";
import { FaUser } from "react-icons/fa";
import { MdOutlineRoomPreferences } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteNotification } from "../../Redux/NotificationSlice";
import UseDate from "../../hooks/UseDate";

const CardNotification = ({ notification }) => {
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleDelete = (notification) => {
    console.log(notification)
    dispatch(deleteNotification({ id: notification.id, token }));
  };

  return (
    <li className="text-white p-1 mx-2 ">
      <div className="d-flex flex-column bg-card-notifications p-2 text-start border rounded">
        <div className="d-flex justify-content-end">
          <MdClose
            className="btn-delete-notification"
            onClick={()=>handleDelete(notification)}
          />
        </div>
        <span className="small fw-bold">
          <MdOutlineRoomPreferences className="text-white me-2" />
         {notification.room.name}
        </span>
        <span className="fw-bold">
          <FaUser className="text-white me-2" /> {notification.user.username}
        </span>
        <span className="fst-italic small">
          <ImFileText className="text-white me-2" /> {notification.description}
        </span>
        <span className="small">
          <IoCalendarSharp className="text-white me-2" />
          {UseDate(notification.created_at)}
        </span>
      </div>
    </li>
  );
};

export default CardNotification;
