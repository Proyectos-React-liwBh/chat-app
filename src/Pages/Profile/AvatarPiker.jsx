/* eslint-disable react/prop-types */
import { DataAvatars } from "../../assets/JS/DataAvatars";
import { useDispatch } from "react-redux";
import { partialUpdateUser } from "../../Redux/UserSlice";

const AvatarPiker = ({usuario, token}) => {
  const dispatch = useDispatch();

  const handleChangeAvatar = (id) => {
    dispatch(partialUpdateUser({ ...usuario, avatar: id, token:token}));
  };

  return (
    <div className="avatar-picker row ">
      {DataAvatars.map((avatar) => (
        <div className="col-6 col-md-4 col-lg-2 col-xl-2 " key={avatar.id}>
          <div
            className={`avatar-item py-1 d-flex justify-content-center align-items-center ${
              avatar.id === usuario?.avatar ? "selected" : ""
            }`}
            onClick={() => handleChangeAvatar(avatar.id)}
          >
            <img src={avatar.img} width={80} height={80} alt={avatar.name} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AvatarPiker;
