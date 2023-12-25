import { useEffect } from "react";

const useWebSocket = (wsUrl, dependence, functionMain = () => {}) => {
  useEffect(() => {
    // Conectar al WebSocket al entrar a la sala
    const websocket = new WebSocket(wsUrl);

    websocket.onopen = () => {
      console.log("Conectado WebSocket");
    };

    // Manejar los mensajes recibidos
    websocket.onmessage = async (e) => {
      let data = await JSON.parse(e.data);
      //console.log(data);

      functionMain(data);

    };

    // Desconectar el WebSocket al salir de la sala
    return () => {
      if (
        websocket.readyState === WebSocket.OPEN ||
        websocket.readyState === WebSocket.CONNECTING
      ) {
        // Solo cerrar si la conexión está abierta o en proceso de conexión
        websocket.close();
        console.log("Desconectado WebSocket");
      }
    };

  }, [dependence]);
};




export default  useWebSocket;