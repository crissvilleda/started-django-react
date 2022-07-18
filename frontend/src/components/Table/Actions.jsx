import resultIcon from "../../assets/img/result.png";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import Swal from "sweetalert2";
import { SwalWarning } from "../SwalAlerts";

function Actions({
  id,
  edit = undefined,
  remove = undefined,
  activities = undefined,
  row = {},
}) {
  const editAction = () => {
    edit(id, row);
  };

  const activitiesAction = () => {
    activities(id, row);
  };

  const removeAction = () => {
    SwalWarning(
      "¿Eliminar?",
      "¡No podrá revertir esta acción!",
      "¡Sí, eliminar!",
      "No, cancelar"
    ).then((result) => {
      if (result.value) {
        remove(id);
      }
    });
  };
  return (
    <>
      <div style={{ width: "125px" }}>
        {edit && (
          <a
            className="px-2"
            style={{ cursor: "pointer", color: "#c4183c" }}
            onClick={editAction}
            title="Editar"
          >
            <EditIcon color="primary" />
          </a>
        )}
        {remove && (
          <a
            className="px-2"
            style={{ cursor: "pointer", color: "#c4183c" }}
            onClick={removeAction}
            title="Eliminar"
          >
            <DeleteForeverIcon color="primary" />
          </a>
        )}
        {activities && (
          <a
            className="px-2"
            style={{ cursor: "pointer", color: "#c4183c" }}
            onClick={activitiesAction}
            title="Actividades"
          >
            <FactCheckIcon color="primary" />
          </a>
        )}
      </div>
    </>
  );
}

export default function tableActions(actions) {
  return (row) => {
    return <Actions id={row.id} row={row} {...actions} />;
  };
}
