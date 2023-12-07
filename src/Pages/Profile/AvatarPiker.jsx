import { useState } from "react";
import { DataAvatars } from "../../assets/JS/DataAvatars";

const AvatarPiker = () => {
  const [avatarSelected, setAvatarSelected] = useState(1);

  const handleAvatar = (id) => {
    setAvatarSelected(id);
  };

  return (
    <div className="avatar-picker row ">
      {DataAvatars.map((avatar) => (
        <div className="col-6 col-md-4 col-lg-2 col-xl-2 " key={avatar.id}>
          <div
            className={`avatar-item py-1 d-flex justify-content-center align-items-center ${
              avatar.id === avatarSelected ? "selected" : ""
            }`}
            onClick={() => handleAvatar(avatar.id)}
          >
            <img src={avatar.img} width={80} height={80} alt={avatar.name} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AvatarPiker;
