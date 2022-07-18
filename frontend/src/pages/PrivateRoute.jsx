import SideBar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import LoadMask from "../components/LoadMask";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useAccount from "../hooks/useAccount";

export default function PrivateRoutes(props) {
  const navigate = useNavigate();
  const { getMe, user } = useAccount();
  const loading = useSelector((state) => state.loading.loading);

  const isAuthenticated = () => {
    if (user && user.username) {
      return true;
    } else if (user && user.has_temp_pwd && !url.includes("change-password")) {
      navigate(`/change-password/${user.username}`);
    } else {
      if (!loading) getMe();
    }
  };

  const isAuth = isAuthenticated();

  return (
    <>
      {isAuth ? (
        <div className="container max-w-screen-2xl m-auto">
          <SideBar className="w-[16rem] p-2" />
          <div className="md:ml-[12.5rem]">
            <Navbar />
            <main className="p-5 md:p-6">{props.children}</main>
          </div>
        </div>
      ) : (
        <LoadMask loading={loading}>
          <div style={{ height: "100vh" }} />
        </LoadMask>
      )}
    </>
  );
}
