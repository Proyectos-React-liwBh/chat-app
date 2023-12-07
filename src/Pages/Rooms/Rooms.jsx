import Layout from "../../Components/Layout";
import { IoMdAdd } from "react-icons/io";
import TableMyRooms from "./TableMyRooms";

const Rooms = () => {
  const rooms = [
    {
      id: 1,
      name: "Programación en Python",
      description: "Grupo para aprender python",
      image: "https://picsum.photos/200",
    }
  ];

  const roomsMember = [];

  return (
    <Layout>
      <section className="py-3">
        <div className="d-flex justify-content-between">
          <h2 className="text-muted">Salas Creadas</h2>

          <div className="">
          <button className="btn btn-success btn-add-room "><IoMdAdd /></button>
          </div>
          {/* <MdAddBox className="text-success btn-add-room fs-1 cursor-pointer " /> */}
        </div>

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
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {roomsMember.map((room) => (
              <div className="col" key={room._id}>
                <div className="card shadow">
                  <div className="card-body">
                    <h5 className="card-title">{room.name}</h5>
                    <p className="card-text">{room.description}</p>
                    <p className="card-text">
                      <small className="text-muted">
                        {room.members.length} miembros
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Rooms;
