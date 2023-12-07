import Layout from "../../Components/Layout";
import { IoMdAdd } from "react-icons/io";
import TableMyRooms from "./TableMyRooms";
import { Tab } from "@mui/material";
import TableFolowRooms from "./TableFolowRooms";

const Rooms = () => {
  const rooms = [
    {
      id: 1,
      name: "Programación en Python",
      description: "Grupo para aprender python",
      image: "https://picsum.photos/200",
    },
  ];

  const roomsMember = [
    {
      id: 1,
      name: "Programación en C#",
      description: "Grupo para aprender C#",
      image: "https://picsum.photos/200",
    },
  ];

  return (
    <div className="bg-rooms">
    <Layout>
      <section className="py-3">
        <h2 className="text-white">Salas Creadas</h2>

        {rooms.length === 0 ? (
          <div className="text-muted py-5">
            Actualmente no tienes salas creadas 😋, crea una sobre un tema de tu
            interés 🤩.
          </div>
        ) : (
          <div>
            <TableMyRooms rooms={rooms} />
          </div>
        )}
      </section>
      <hr className="bg-white text-white"/>
      <section className="py-3">
        <h2 className="text-white">Salas Miembro</h2>

        {roomsMember.length === 0 ? (
          <div className="text-muted py-5">
            Actualmente no eres miembro de ninguna sala 😔, únete a una sobre un
            tema de tu interés 🫡.
          </div>
        ) : (
          <div>
            <TableFolowRooms rooms={roomsMember} />
          </div>
        )}
      </section>
    </Layout>
    </div>
  );
};

export default Rooms;
