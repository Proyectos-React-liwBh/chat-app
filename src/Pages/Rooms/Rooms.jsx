import { useEffect } from "react";
import Layout from "../../Components/Layout";
import TableMyRooms from "./TableMyRooms";
import TableFollowRooms from "./TableFollowRooms";
import { useDispatch, useSelector } from "react-redux";
import { cleanAlert, getMyRooms, getFollowRooms } from "../../Redux/RoomSlice";
import {
  SweetAlertError,
  SweetAlertSuccess,
} from "../../assets/SweetAlert/SweetAlert";

const Rooms = () => {
  const dispatch = useDispatch();

  const { message, errorRedux, rooms, roomsFollow } = useSelector(
    (state) => state.room
  );

  const { token } = useSelector((state) => state.user);

  //console.log("token", token);

  useEffect(() => {
    if (token) {
      dispatch(getMyRooms(token));

      dispatch(getFollowRooms(token));
    }
  }, [token]);

  useEffect(() => {
    if (message) {
      SweetAlertSuccess(message);
      dispatch(cleanAlert());

      //actualizar datos
      dispatch(getMyRooms(token));
      dispatch(getFollowRooms(token));
    }

    if (errorRedux) {
      SweetAlertError(errorRedux);
      dispatch(cleanAlert());
    }
  }, [message, errorRedux]);

  return (
    <div className="bg-rooms">
      <Layout>
        <section className="py-3">
          <h2 className="text-white">Salas Creadas</h2>

          <div>
            <TableMyRooms rooms={rooms} />
          </div>
        </section>
        <hr className="bg-white text-white" />
        <section className="py-3">
          <h2 className="text-white">Salas Miembro</h2>

          {roomsFollow.length === 0 ? (
            <div className="py-5">
              <p className="text-white border border-1 border-secondary fw-bold text-center p-3 bg-dark rounded">
                Actualmente no eres miembro de ninguna sala 😔, únete a una
                sobre un tema de tu interés 🫡.
              </p>
            </div>
          ) : (
            <div>
              <TableFollowRooms rooms={roomsFollow} />
            </div>
          )}
        </section>
      </Layout>
    </div>
  );
};

export default Rooms;
