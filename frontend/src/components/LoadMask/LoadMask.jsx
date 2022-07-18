import { Oval } from "react-loader-spinner";
import "./loadMask.css";

export default function LoadMask({ loading, children, blur }) {
  return (
    <div className="load-mask">
      {loading && (
        <div className={"loader-container light"}>
          <Oval color="#61256C" height="120" width="120" />
        </div>
      )}
      <div
        className={`load-mask-content ${loading && "loading"} ${
          blur && "blur"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
