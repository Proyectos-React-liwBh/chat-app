import { useEffect, useState, useMemo } from "react";
import { FaPlus } from "react-icons/fa";
import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const TableMyRooms = ({ rooms }) => {
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
        Cell: ({ row }) => limitDescription(row.original.categoriaDescripcion),
      },
    ],
    []
  );

  const handleDelete = (row) => {
    console.log(row);
  };

  const handleEdit = (row) => {
    console.log(row);
  };

  return (
    <div>
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
  );
};

export default TableMyRooms;
