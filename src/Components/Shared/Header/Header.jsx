import { Link, NavLink, useNavigate } from "react-router-dom";

import logo from "../../../assets/logo.png";

import "./header.css";
import useGetCardData from "../../../Hook/useGetCardata";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import AddToCard from "../../../Page/Card/AddToCard";

const showSuccessAlert = () => {
  Swal.fire({
    icon: "success",
    title: "Log out",
    text: "Successfully logged out",
  });
};

const Header = () => {
  const { product } = useGetCardData();
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();


  const handleSignOut = async () => {
    try {
      await logOut();
      showSuccessAlert();
      navigate(location?.state?.from ? location.state.from : "/");
    } catch (error) {
      console.error(error);
    }
  };


  const menu = (
    <>
      <li className="flex">
        <NavLink to="/" className="flex items-center px-8 py-3 font-semibold  ">
          Home
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="bg-sky-800 ">
      <div className="navbar  text-white container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
          </div>
          <Link to="/" className="text-2xl font-bold flex gap-4 ml-4">
            <div className="w-16 mx-auto block rounded-full  ">
              <img src='https://i.ibb.co/f87HCm4/Black-And-White-Modern-Vintage-Retro-Brand-Logo-2.png' />
            </div>
            <p className=" hidden lg:flex  lg:text-2xl  my-auto  ">
              {" "}
              TMW CORPORATION
            </p>
          </Link>
        </div>
        <div className="navbar-end">
          <div>
            <AddToCard></AddToCard>
          </div>
          <div className="hidden md:block">
            {
              user && <a className="btn btn-ghost normal-case text-xl">{user.displayName}</a>
            }
          </div>
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar mr-2">
            <div className="w-10 rounded-full">
              {
                user ? <img src={user.photoURL} alt="" /> : <img src="https://i.ibb.co/v1FKW31/user.png" alt="" />
              }
            </div>
          </label>
          {
            user ?  <button onClick={handleSignOut} className="btn text-white bg-gray-900 border-black mr-5 btn-sm btn-error px-8">
            Log-out
          </button> : <Link to='/login' > <button  className="btn text-white mr-5 btn-sm btn-error px-8">
                  Log-In
                </button></Link>
          }

        </div>
      </div>
    </div>
  );
};

export default Header;
