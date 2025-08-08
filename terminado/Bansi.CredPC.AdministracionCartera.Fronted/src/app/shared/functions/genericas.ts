
//->Alertas
import Swal, { SweetAlertResult } from 'sweetalert2';

/**
 * Manda alerta de si esta seguro
 *
 * @export
 * @param {string} titulo
 * @param {string} mensaje
 */
export function AlertaEstaSeguro(titulo: string, mensaje: string) {
  return Swal.fire({
    title: titulo,
    text: mensaje,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí',
    cancelButtonText: 'No',
    customClass: {
      confirmButton: 'bsi-button-modal-confirm',
      cancelButton: 'bsi-button-modal-cancel',
      title: 'bsi-title-modal',
    },
    buttonsStyling: false,
  })
}

/**
 * Manda alerta de error
 *
 * @export
 * @param {string} mensaje
 */
export function AlertaError(mensaje: string) {
  return Swal.fire({
    title: 'HA OCURRIDO UN ERROR',
    text: mensaje,
    icon: 'error',
    confirmButtonText: 'OK',
    customClass: {
      confirmButton: 'bsi-button-modal-confirm',
      title: 'bsi-title-modal',
    },
    buttonsStyling: false,
  })
}

/**
 * Mandar alerta de correcto
 *
 * @export
 */
export function AlertaSuccess(mensaje: string = 'ACCIÓN REALIZADA CON ÉXITO') {
  return Swal.fire({
    text: mensaje,
    icon: 'success',
    confirmButtonText: 'Aceptar',
    customClass: {
      confirmButton: 'bsi-button-modal-acept',
      htmlContainer: 'fw-bold'
    }
  });
}

/**
 * Mandar alerta
 *
 * @export
 * @param {string} titulo
 * @param {string} mensaje
 */
export function AlertaWarning(titulo: string, mensaje: string) {
  return Swal.fire({
    title: titulo,
    text: mensaje,
    icon: 'warning',
    showCancelButton: false,
    confirmButtonText: 'OK',
    customClass: {
      confirmButton: 'bsi-button-modal-confirm',
      title: 'bsi-title-modal',
    },
    buttonsStyling: false,
  });
}

/**
 * Funcion para reordenar  propiedades de un objeto
 *
 * @export
 * @template {object} T
 * @param {T[]} array
 * @param {Array<keyof T>} orden
 * @returns {T[]}
 */
export function ReordenarArrayObjetos<T extends object>(array: T[], orden: Array<keyof T>): T[] {
  return array.map(obj => {
    const nuevoObj = {} as T;

    // Propiedades en el orden especificado
    orden.forEach(prop => {
      if (prop in obj) {
        nuevoObj[prop] = obj[prop];
      }
    });

    // Propiedades restantes
    (Object.keys(obj) as Array<keyof T>).forEach(prop => {
      if (!orden.includes(prop)) {
        nuevoObj[prop] = obj[prop];
      }
    });

    return nuevoObj;
  })
}

/**
 * Recupera el nombre del archivo excel a exportar
 *
 * @export
 * @param {string} url
 * @returns {string}
 */
export function getFileName(url: string): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hour = now.getHours();
  const min = now.getMinutes();
  const ruta = url.split('/')[2];
  const fileName = `${ruta}_${year}${month}${day}${hour}${min}`;

  return fileName;
}

export function autoCloseMessage() {
  let timerInterval: any;
  Swal.fire({
    title: "Descargando archivo",
    html: "Su archivo se esta creado y lo encontrará en las descargas de su equipo. <br>Esta ventana se cerrará en <b></b> milisegundos.",
    timer: 5000,
    timerProgressBar: true,
    customClass: {
      title: 'bsi-title-modal'
    },
    didOpen: () => {
      Swal.showLoading();
      const timer = Swal.getPopup()?.querySelector("b");;
      timerInterval = setInterval(() => {
        timer!.textContent = `${Swal.getTimerLeft()}`;
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    }
  }).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log("I was closed by the timer");
    }
  });
}

