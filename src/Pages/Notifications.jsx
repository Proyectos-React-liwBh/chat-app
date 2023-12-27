import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Components/Layout";
import { useDispatch, useSelector } from "react-redux";
import {
  SweetAlertEliminar,
  SweetAlertError,
} from "../assets/SweetAlert/SweetAlert";
import {
  cleanAlert,
  listNotifications,
  deleteNotification,
} from "../Redux/NotificationSlice";
import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { FaEye } from "react-icons/fa";
import UseDate from "../hooks/UseDate";

const Notifications = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.user);
  const { notifications, errorRedux } = useSelector(
    (state) => state.notification
  );

  useEffect(() => {
    if (token) {
      dispatch(listNotifications(token));
    }
  }, [token]);

  useEffect(() => {
    if (errorRedux) {
      SweetAlertError(errorRedux);
      dispatch(cleanAlert());
    }
  }, [errorRedux]);

  const handleDelete = (notification) => {
    SweetAlertEliminar(
      `¿Estas seguro que quieres eliminar la notificación ${notification.title}?`,
      () => {
        dispatch(deleteNotification({ id: notification.id, token }));
      }
    );
  };

  const handleGo = (notification) => {
    navigate(`/room/${notification.RoomId}`);
  };

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
        header: "Sala",
        accessorKey: "room.name",
      },
      {
        header: "Usuario",
        accessorKey: "user.username",
      },
      {
        header: "Descripción",
        accessorKey: "Description",
        Cell: ({ row }) => limitDescription(row.original.description),
      },
      {
        header: "Fecha",
        accessorKey: "created_at",
        Cell: ({ row }) => UseDate(row.original.created_at),
      },
    ],
    []
  );

  return (
    <div className="bg-rooms">
      <Layout>
        <section className="py-3">
          <h2 className="text-white">Notificaciones</h2>

          <div className="py-3">
            <MaterialReactTable
              enableFullScreenToggle={false} //boton de pantalla completa
              enableDensityToggle={false} //boton para cambiar la densidad de la tabla
              columns={columns} //nombres de columnas
              data={notifications} //array de objetos
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
                  {row.original.type === 1 && (
                    <Tooltip arrow placement="right" title="Eliminar">
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(row.original)}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              )}
            />
          </div>
        </section>
      </Layout>
    </div>
  );
};

export default Notifications;
