import Swal from "sweetalert2";
import repAll from "./utils";

export default function SwalError(title, msj, next = () => {}) {
  msj = repAll(msj, /\n/g, "<br/>");

  const SwalMod = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-primary m-2",
      content: "flex justify-center mb-4 ",
    },
    buttonsStyling: false,
    focusConfirm: false,
    focusCancel: false,
  });
  return SwalMod.fire({
    icon: "error",
    title: title,
    html: msj,
    confirmButtonText: "Aceptar",
    allowEnterKey: false,
  }).then((result) => {
    next();
  });
}
