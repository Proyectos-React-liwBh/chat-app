import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSessionUser } from "../Redux/UserSlice";

const useSession = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userSession } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getSessionUser());

    if (sessionStorage.getItem("user") === null) {
      navigate("/login");
    }

    // eslint-disable-next-line
  }, []);

  return { userSession };
};

export default useSession;