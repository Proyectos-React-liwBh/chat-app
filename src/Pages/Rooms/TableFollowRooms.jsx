/* eslint-disable react/prop-types */
import { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { unfollowRoom } from "../../Redux/RoomSlice";
import { useDispatch, useSelector } from "react-redux";
import { SweetAlertEliminar } from "../../assets/SweetAlert/SweetAlert";

const TableFollowRooms = ({ rooms }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.user);

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
        accessorKey: "Description",
        Cell: ({ row }) => limitDescription(row.original.description),
      },
    ],
    []
  );

  const handleDelete = (room) => {
    SweetAlertEliminar(`¿Estas seguro que quieres dejar de seguir la sala ${room.name}?`, () => {
      dispatch(unfollowRoom({ id:room.id, token }));
    });
  };

  const handleGo = (row) => {
    console.log(row);
    navigate(`/room/${row.id}`);
  };

  return (
    <div className="py-3">
      <MaterialReactTable
        enableFullScreenToggle={false} //boton de pantalla completa
        enableDensityToggle={false} //boton para cambiar la densidad de la tabla
        columns={columns} //nombres de columnas
        data={rooms} //array de objetos
        localization={MRT_Localization_ES} //lenguaje en español
        enableRowActions //habilita los botones de acciones
        positionActionsColumn="last"
        options={{
          exportButton: true,
        }}
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
            <Tooltip arrow placement="right" title="Dejar Sala">
              <IconButton
                color="error"
                onClick={() => handleDelete(row.original)}
              >
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      />
    </div>
  );
};

export default TableFollowRooms;
