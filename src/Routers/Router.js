// Componentes

import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register/Register";
import Error404 from "../Pages/Error404";
import Rooms from "../Pages/Rooms/Rooms";
import Room from "../Pages/Room/Room";
import Profile from "../Pages/Profile/Profile";
import Forgot from "../Pages/forgot";
import Recovery from "../Pages/Recovery";

//rutas
export const routerApp = [
    //pagina principal, muestra las salas publicas, filtro por nombre de sala
    {
        path: "/",
        component: Home,
    },
    //salas creadas por el usuario
    {
        path: "/rooms",
        component: Rooms,
    },
    //sala especifica con sus mensajes
    {
        path: "/room/:id",
        component: Room,
    },
    {
        path: "/login",
        component: Login,
    },
    {
        path: "/register",
        component: Register,
    },
    {
        path: "/forgot-password",
        component: Forgot,
    },
    {
        path: "/recovery",
        component: Recovery,
    },
    {
        path:"*",
        component: Error404,
    },
    {
        path: "/profile",
        component: Profile,
    },
];


