import UserForm from "./UserForm";
import LoadMask from "../../components/LoadMask";
import useCreate from "../../hooks/useCreate";
import useUpdate from "../../hooks/useUpdate";
import dayjs from "dayjs";

export default function User() {
  const { saveData } = useCreate("user", "/user");
  const { data, updateData, update } = useUpdate("user", "/user");
  const onSubmit = async (data) => {
    const body = { ...data };
    body.birthday = dayjs(data.birthday).format("YYYY-MM-DD");
    if (!update) saveData(body);
    else updateData(body);
  };
  return (
    <>
      <div className="flex pt-4">
        <h1 className="text-title mb-4">Usuarios</h1>
      </div>
      <LoadMask>
        <UserForm
          onSubmit={onSubmit}
          initialValues={{ ...data }}
          isUpdating={update}
        />
      </LoadMask>
    </>
  );
}
