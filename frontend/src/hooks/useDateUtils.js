import dayjs from "dayjs";

export default function useDateUtils() {
  const dateAsDayjs = (value) => {
    if (value && dayjs(value).isValid()) {
      return dayjs(value);
    } else {
      return null;
    }
  };
  const getDate = (value) => {
    const date = dateAsDayjs(value);
    if (date) return date.format("DD/MM/YYYY");
    return "";
  };
  return { dateAsDayjs, getDate };
}
