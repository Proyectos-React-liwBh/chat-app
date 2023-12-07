import { useEffect, useState, useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TableFolowRooms = ({ rooms }) => {
  const navigate = useNavigate();

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

  const handleDelete = (row) => {
    console.log(row);
  };

  const handleGo = (row) => {
    console.log(row);
    navigate(`/room/${row.id}`);
  };

  return (
    <div className="py-3">
      <MaterialReactTable
        //enableColumnOrdering//modificar el orden de las columnas
        //enableHiding={false} //boton de ocultar columnas
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
        //enableRowSelection//habilita el checkbox de seleccionar
        //enableSelectAll={false}//habilita el checkbox de seleccionar todos
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

export default TableFolowRooms;
