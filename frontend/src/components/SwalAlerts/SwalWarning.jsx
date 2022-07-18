import Swal from "sweetalert2";
import repAll from "./utils";

import "./swal_alerts.css";

export default async function SwalWarning(
  titulo,
  subtitulo,
  confirmeText = "Si",
  cancelText = "No"
) {
  subtitulo = repAll(subtitulo, /\n/g, "<br/>");

  const SwalMod = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-primary m-2",
      denyButton: "btn btn-secondary m-2",
      actions: "custom-actions",
    },
    buttonsStyling: false,
    allowEnterKey: false,
  });

  return await SwalMod.fire({
    title: titulo,
    html: subtitulo,
    showDenyButton: true,
    showCloseButton: true,
    confirmButtonText: confirmeText,
    denyButtonText: cancelText,
    icon: "warning",
    reverseButtons: true,
  });
}
