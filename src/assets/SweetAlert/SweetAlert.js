import Swal from "sweetalert2";

export const SweetAlertSuccess = (message) => {

  Swal.fire({
    position: 'center',
    icon: 'success',
    title: message,
    showConfirmButton: false,
    timer: 1500
  })
 };


export const SweetAlertError = (message) => {
  Swal.fire({
    position: 'center',
    icon: 'error',
    title: message,
    showConfirmButton: false,
    timer: 1500
  })
 }

export const SweetAlertInfo = (message) => {
  Swal.fire({
    position: 'center',
    icon: 'info',
    title: message,
    showConfirmButton: false,
    timer: 1500
  })
 }

export const SweetAlertWarning = (message) => {
  Swal.fire({
    position: 'center',
    icon: 'warning',
    title: message,
    showConfirmButton: false,
    timer: 1500
  })
 }

export const SweetAlertQuestion = ( title, message, funtion, messageResponse) => {
  Swal.fire({
    title: title,
    text: message,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      //ejecutar funcion
      funtion();

      SweetAlertSuccess(messageResponse);
    }
  })
  

}
export const SweetAlertEliminar = (elemento, eliminarFuncion) => {
  Swal.fire({
    title: "Delete",
    text: `Are you sure you want to delete ${elemento}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Delete',
    cancelButtonText: 'Cancel'
  }).then((resultado) => {
    if (resultado.isConfirmed) {
      // Ejecutar la función de eliminación
      eliminarFuncion();
    }
  });
}

export const SweetAlertData = (title, text) =>{
  Swal.fire({
    title: title,
    text: text,
    confirmButtonColor: '#3085d6',
  })
}


export const SweetAlertConfirm = (title, text, funcionAceptar, funcionCancelar) => {
  Swal.fire({
    title: title,
    text: text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#52BE80',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Accept',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      funcionAceptar();
    }else{
      funcionCancelar();
    }
  })
}