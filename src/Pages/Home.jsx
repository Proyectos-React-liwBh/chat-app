/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import Layout from "../Components/Layout";
import Spinner from "../Components/Spinner";
import Pagination from "@mui/material/Pagination";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { FaUsers } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { listAllRooms } from "../Redux/RoomSlice";
import CardRoom from "./Card/CardRoom";
import useWebSocket from "../Hooks/UseWebSocket";

const Home = () => {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.user);

  const [listRooms, setListRooms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  /* paginacion */
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
    setCurrentPage(1); // Reinicia la página a 1 cuando se cambia la cantidad de elementos por página
  };

  const filteredRooms = listRooms.filter((room) => {
    const nombre = room.name || "";

    return nombre.toLowerCase().includes(searchQuery.toLowerCase());
  });

  useEffect(() => {
    if (token) {
      dispatch(listAllRooms(token)).then((state) => {
        setListRooms([...state.payload.Rooms]);
      });
    }
  }, [token]);

  //websocket
  const wsUrl = `ws://127.0.0.1:8000/ws/salas/?token=${token}`;

  const handleWebSocketListRooms = (data) => {
    if (data.action === "create" || data.action === "delete" || data.action === "update") {
      dispatch(listAllRooms(token)).then((state) => {
        setListRooms([...state.payload.Rooms]);
      });
    }

    console.log("handleWebSocketListRooms", data);
  };

  useWebSocket(wsUrl, token, handleWebSocketListRooms);


  return (
    <Layout>
      {/* header */}
      <header className="container__header_home ">
        <div className="image__header_home">
          <div className="content__header_home"></div>
          <h3 className="title__header_home">
            Descubre la libertad de expresión en nuestra aplicación de chat por
            salas públicas.
          </h3>
        </div>
      </header>

      <section className="container py-5">
        <div className="row py-2 d-flex justify-content-between">
          {/* titulo */}
          <div className="col-12 col-md-6">
            <h3 className="d-flex align-items-center">
              <FaUsers className="me-2 fs-1 d-none d-md-block" />
              <span className="display-6">Lista de Salas Públicas</span>
            </h3>
          </div>
          {/* buscador */}
          <div className="col-12 col-md-6 col-lg-4 mt-2 mt-md-0">
            {/* input */}
            <div className="search__container">
              <input
                className="w-100 search__input "
                placeholder="Buscar Sala..."
                value={searchQuery}
                list="rooms"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <BsSearch className="search__icon" />
            </div>
            {/* datalist */}
            <datalist id="rooms" className="">
              {
                // eslint-disable-next-line
                listRooms.map((room) => {
                  return <option key={room.id} value={room.name} />;
                })
              }
            </datalist>
          </div>
        </div>

        {/* lista de salas */}
        {listRooms.length === 0 ? (
          <Spinner />
        ) : (
          <>
            {/* Lista de cards */}
            <div className="row mt-3">
              {!searchQuery || searchQuery === ""
                ? listRooms
                    .slice(
                      (currentPage - 1) * rowsPerPage,
                      currentPage * rowsPerPage
                    )
                    .map((room) => (
                      <div
                        className="col-12 col-md-6 col-lg-4 mb-3"
                        key={room.id}
                      >
                        <CardRoom room={room} />
                      </div>
                    ))
                : filteredRooms
                    .slice(
                      (currentPage - 1) * rowsPerPage,
                      currentPage * rowsPerPage
                    )
                    .map((room) => (
                      <div
                        className="col-12 col-md-6 col-lg-4 mb-3"
                        key={room.id}
                      >
                        <CardRoom room={room} />
                      </div>
                    ))}
            </div>

            {/* Paginacion */}
            <div className="row mt-5">
              <div className="col-12 col-md-6 col-lg-4">
                <div className="d-flex justify-content-center align-items-center">
                  <Typography className="mx-3">Filas por página:</Typography>
                  <Select
                    size="small"
                    className="p-0 m-0"
                    value={rowsPerPage}
                    onChange={handleRowsPerPageChange}
                    autoWidth
                  >
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={30}>30</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                  </Select>
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-8">
                <div className="d-flex justify-content-center align-items-center">
                  <Pagination
                    size="large"
                    variant="outlined"
                    color="primary"
                    shape="rounded"
                    // showFirstButton showLastButton
                    count={Math.ceil(listRooms.length / rowsPerPage)}
                    page={currentPage}
                    onChange={(event, page) => {
                      setCurrentPage(page);
                    }}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </Layout>
  );
};

export default Home;
