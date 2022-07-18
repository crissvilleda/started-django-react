import "./navbar.css";
import BurgerMenu from "./BurgerMenu";

export default function Navbar() {
  return (
    <>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className=" flex justify-end  items-center w-full pr-3 pt-2">
          <BurgerMenu />
        </div>
      </nav>
    </>
  );
}
