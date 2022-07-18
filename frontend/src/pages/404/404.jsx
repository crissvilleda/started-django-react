import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <div className="flex">
        <h1>Oops!</h1>
        <h2>404 Pagina no encontrada</h2>
      </div>
      <div className="text-center">
        <Link className="btn" to="/">
          Regresar
        </Link>
      </div>
    </>
  );
}
