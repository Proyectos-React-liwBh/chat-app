/* eslint-disable react/prop-types */
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import ModalNewRoom from "./ModalNewRoom";
import ModalEditRoom from "./ModalEditRoom";
import { FaEye } from "react-icons/fa";
import { deleteRoom, setRoomCurrent } from "../../Redux/RoomSlice";
import { useDispatch, useSelector } from "react-redux";
import { SweetAlertEliminar } from "../../assets/SweetAlert/SweetAlert";

const TableMyRooms = ({ rooms }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.user);
  const { roomCurrent } = useSelector((state) => state.room);

  const limitDescription = (description) => {
    if (description.length > 50) {
      return (
        <Tooltip arrow placement="left" title={description}>
          <span>{`${description.substring(0, 50)}...`}</span>
        </Tooltip>
      );
    } else {
      return description;
    }
  };

  const columns = useMemo(
    () => [
      {
        header: "Nombre",
        accessorKey: "name",
      },
      {
        header: "Descripción",
        accessorKey: "description",
        Cell: ({ row }) => limitDescription(row.original.description),
      },
    ],
    []
  );

  const handleDelete = (room) => {
    SweetAlertEliminar(
      `¿Estas seguro que quieres eliminar la sala ${room.name}?`,
      () => {
        dispatch(deleteRoom({ room, token }));
      }
    );
  };

  const handleEdit = (room) => {
    dispatch(setRoomCurrent(room));
  };

  const handleGo = (row) => {
    //console.log(row);
    navigate(`/room/${row.id}`);
  };

  return (
    <>
      {/* Modales */}
      <ModalNewRoom />
      <ModalEditRoom roomCurrent={roomCurrent} />

      {rooms.length === 0 ? (
        <div className="py-5">
          <div className="py-2 d-flex justify-content-end">
          <Tooltip arrow placement="top" title="Nueva Sala">
            <button
              type="button"
              id="btnModalNewRoom"
              className="btn btn-success btn-sm d-flex align-items-center justify-content-center"
              data-bs-toggle="modal"
              data-bs-target="#ModalNewRoom"
            >
              <FaPlus className="" />
            </button>
            </Tooltip>
          </div>
          <p className="text-white border border-1 border-secondary fw-bold text-center p-3 bg-dark rounded">
            Actualmente no tienes salas creadas 😋, crea una sobre un tema de tu
            interés 🤩.
          </p>
        </div>
      ) : (
        <div>
          <div className="py-3">
            <MaterialReactTable
              enableFullScreenToggle={false} //boton de pantalla completa
              enableDensityToggle={false} //boton para cambiar la densidad de la tabla
              columns={columns} //nombres de columnas
              data={rooms} //array de objetos
              localization={MRT_Localization_ES} //lenguaje en español
              enableRowActions //habilita los botones de acciones
              positionActionsColumn="last"
              renderRowActions={({ row }) => (
                <Box sx={{ display: "flex", gap: "1rem" }}>
                  <Tooltip arrow placement="left" title="Entrar a sala">
                    <IconButton
                      style={{ color: "#276D7A" }}
                      onClick={() => handleGo(row.original)}
                    >
                      <FaEye />
                    </IconButton>
                  </Tooltip>

                  <Tooltip arrow placement="left" title="Editar">
                    <IconButton
                      style={{ color: "#FFC107" }}
                      id="btnModalEditRoom"
                      data-bs-toggle="modal"
                      data-bs-target="#ModalEditRoom"
                      onClick={() => handleEdit(row.original)}
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip arrow placement="right" title="Eliminar">
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(row.original)}
                    >
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
              renderTopToolbarCustomActions={() => (
                <Box
                  sx={{
                    display: "flex",
                    gap: "1rem",
                    p: "0.5rem",
                    flexWrap: "wrap",
                  }}
                >
                  <Tooltip arrow placement="right" title="Nueva Sala">
                    <IconButton
                      size="small"
                      color="success"
                      id="btnModalNewRoom"
                      data-bs-toggle="modal"
                      data-bs-target="#ModalNewRoom"
                    >
                      <FaPlus />
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default TableMyRooms;
