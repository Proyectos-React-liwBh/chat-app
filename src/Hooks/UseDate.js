
const UseDate = (fecha) => {
    let resultado = "00-00-0000";

    if (fecha && fecha !== "0000-00-00") {
      const fechaTemp = new Date(fecha);
      const dia = fechaTemp.getDate() + 1;
      const mes = fechaTemp.getMonth() + 1;
      const anio = fechaTemp.getFullYear();
  
      resultado = `${dia < 10 ? "0" : ""}${dia}-${mes < 10 ? "0" : ""}${mes}-${anio}`;
    }
  
    return resultado;
}

export default UseDate