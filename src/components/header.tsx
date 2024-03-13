import { Link } from "react-router-dom";
import { FaSearch, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useState } from "react";
import { User } from "../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import logo from '../assets/images/logo.png';





interface PropsType{
  user:User|null;
}
const Header = ({user}:PropsType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Sign Out Successfully");
      setIsOpen(false);
    } catch (error) {
      toast.error("Sign Out Fail");
    }
  };
  return (
    <div className="logo">
      <div>
      <Link onClick={() => setIsOpen(false)} to={"/"}><img src={logo} alt="ShellSphere" width="170px" height="55px" /></Link>
   
      </div>
    <nav className="header">
       

      <Link onClick={() => setIsOpen(false)} to={"/"}>HOME</Link>
      
      <Link onClick={() => setIsOpen(false)} to={"/search"}>
        {" "}
        <FaSearch />
      </Link>
      <Link onClick={() => setIsOpen(false)} to={"/cart"}>
        {" "}
        <FaCartShopping />
      </Link>
      {user?._id ? (
        <>
          <button onClick={() => setIsOpen((prev) => !prev)}>
            <FaUser />
          </button>
          <dialog open={isOpen}>
            <div>
              {user.role === "admin" && (
                <Link onClick={() => setIsOpen(false)} to="/admin/dashboard">Admin</Link>
              )}
              <Link onClick={() => setIsOpen(false)} to="/orders">Orders</Link>
              <button onClick={logoutHandler}>
                <FaSignOutAlt />
              </button>
            </div>
          </dialog>
        </>
      ) : (
        <Link to={"/login"}>
          <FaSignInAlt />
        </Link>
      )}
    </nav>
    </div>
  );
};

export default Header;
