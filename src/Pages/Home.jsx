import { useState, useEffect } from "react";
import Layout from "../Components/Layout";
import Spinner from "../Components/Spinner";
import { FaUsers } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";

const Home = () => {

  const [listRooms, setListRooms] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); 
  /* paginacion */
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
    setCurrentPage(1); // Reinicia la página a 1 cuando se cambia la cantidad de elementos por página
  };

  return (
    <Layout>
      {/* header */}

      {/* buscador */}

      {/* lista de salas */}
      <section className="container py-5">
        <div className="row">
          <h3 className="d-flex align-items-center">
            <FaUsers className="me-2 fs-1" />
            <span className="display-6">Lista de Salas Publicas</span>
          </h3>
        </div>

        <div className="row">
          <div className="col-12 col-md-6 mt-3 col-lg-4 mb-2">
            {/* buscador */}
            <div className="search__container">
              <input
                className="w-100 rounded-3 search__input "
                placeholder="Buscar Sala..."
                value={searchQuery}
                list="rooms"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <BsSearch className="search__icon" />
            </div>

            {/* opciones de autocompletado*/}
            <datalist id="rooms" className="">
              {
                // eslint-disable-next-line
                listRooms.map((room) => {
                  return (
                    <option
                      key={room.id}
                      value={
                        room.name
                      }
                    />
                  );
                })
              }
            </datalist>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
