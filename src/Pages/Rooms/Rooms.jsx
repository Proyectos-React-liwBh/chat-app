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
      name: "Programación en Python",
      description: "Grupo para aprender python",
      image: "https://picsum.photos/200",
    },
  ];

  return (
    <Layout>
      <section className="py-3">
        <h2 className="text-muted">Salas Creadas</h2>

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
      <hr />
      <section className="py-3">
        <h2 className="text-muted">Salas Miembro</h2>

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
  );
};

export default Rooms;
