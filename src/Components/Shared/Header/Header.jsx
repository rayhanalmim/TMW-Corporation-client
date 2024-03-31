import React, { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaChartBar, FaBeer, FaUser, FaShoppingCart, FaListUl, FaUsers } from "react-icons/fa";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { FaShop } from "react-icons/fa6";
import Swal from "sweetalert2";
import useGetCardData from "../../../Hook/useGetCardata";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import AddToCard from "../../../Page/Card/AddToCard";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerRef = useRef(null);

  const axiosSecure = useAxiosSecure();
  const [infos, setInfo] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axiosSecure.get("/dsrRequ");
      setInfo(response.data);
    } catch (error) {
      console.error("Error fetching costs:", error);
    }
  };

  useEffect(() => {
    // Call the API immediately when the component mounts
    fetchData();

    // Set up an interval to call the API every 10 seconds
    const interval = setInterval(fetchData, 10000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures the effect runs only once on mount

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setIsDrawerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await logOut();
      showSuccessAlert();
      navigate(location?.state?.from ? location.state.from : "/");
    } catch (error) {
      console.error(error);
    }
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleMenuItemClick = () => {
    setIsDrawerOpen(false); // Close the drawer when a menu item is clicked
  };

  return (
    <div className="bg-sky-800 ">
      <div className="navbar  text-white container mx-auto">
        <div className="navbar-start">
          <div className="text-center lg:hidden">
            <button className="" type="button" onClick={toggleDrawer}>
              {isDrawerOpen ? <><AiOutlineMenuUnfold className="text-3xl ml-3 mt-2"></AiOutlineMenuUnfold></> : <><AiOutlineMenuUnfold className="text-3xl ml-3 mt-2"></AiOutlineMenuUnfold></>}
            </button>
          </div>
          <div ref={drawerRef} id="drawer-navigation" className={`fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform ${isDrawerOpen ? '' : '-translate-x-full'} bg-slate-700 w-64 dark:bg-gray-800 lg:hidden`} tabIndex="-1" aria-labelledby="drawer-navigation-label">
            <h5 id="drawer-navigation-label" className="text-base font-semibold text-white uppercase dark:text-gray-400">Menu</h5>
            <button type="button" onClick={closeDrawer} data-drawer-hide="drawer-navigation" aria-controls="drawer-navigation" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white">
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span className="sr-only text-black">Close menu</span>
            </button>
            <div className="py-4 overflow-y-auto text-white">
              <ul className="space-y-3 font-medium">
                <li className={`${isDrawerOpen ? 'border border-white rounded-md text-center py-1.5 hover:bg-black hover:text-white hover:border-rose-300' : ''}`}><NavLink to='/' onClick={handleMenuItemClick}>Home Page</NavLink></li>
                <li className={`${isDrawerOpen ? 'border border-white rounded-md text-center py-1.5 hover:bg-black hover:text-white hover:border-rose-300' : ''}`}><NavLink to='/dsr' onClick={handleMenuItemClick}>DSR Order Request ({infos.length})</NavLink></li>
                <li className={`${isDrawerOpen ? 'border border-white rounded-md text-center py-1.5 hover:bg-black hover:text-white hover:border-rose-300' : ''}`}><NavLink to='/sellView' onClick={handleMenuItemClick}>Billing Management</NavLink></li>
                <li className={`${isDrawerOpen ? 'border border-white rounded-md text-center py-1.5 hover:bg-black hover:text-white hover:border-rose-300' : ''}`}><NavLink to='/manageProduct' onClick={handleMenuItemClick}>Product Management</NavLink></li>
                <li className={`${isDrawerOpen ? 'border border-white rounded-md text-center py-1.5 hover:bg-black hover:text-white hover:border-rose-300' : ''}`}><NavLink to='/shop' onClick={handleMenuItemClick}>Client Shop Management</NavLink></li>
                <li className={`${isDrawerOpen ? 'border border-white rounded-md text-center py-1.5 hover:bg-black hover:text-white hover:border-rose-300' : ''}`}><NavLink to='/user' onClick={handleMenuItemClick}>Employee Management</NavLink></li>
                <li className={`${isDrawerOpen ? 'border border-white rounded-md text-center py-1.5 hover:bg-black hover:text-white hover:border-rose-300' : ''}`}><NavLink to='/analysis' onClick={handleMenuItemClick}>Sell Analysis</NavLink></li>
              </ul>
            </div>
          </div>
          <NavLink to="/" className="text-2xl font-bold flex gap-4 ml-4">
            <div className="w-10 pl-2 md:pl-0 md:w-16 mx-auto block rounded-full">
              <img src='https://i.ibb.co/SKQbk36/Black-And-White-Modern-Vintage-Retro-Brand-Logo-7-removebg-preview.png' alt="Logo" />
            </div>
            <p className="hidden lg:flex lg:text-2xl  my-auto">
              TMW CORPORATION
            </p>
          </NavLink>
        </div>
        <div className="navbar-end">
          <div className="flex pr-4 lg:pr-1">
            <AddToCard />
          </div>
          <div className="hidden md:block">
            {user && <a className="btn btn-ghost normal-case text-xl">{user.displayName}</a>}
          </div>
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar mr-2">
            <div className="w-10 rounded-full">
              {user ? <img src={user.photoURL} alt="" /> : <img src="https://i.ibb.co/v1FKW31/user.png" alt="" />}
            </div>
          </label>
          {user ? (
            <button onClick={handleSignOut} className="btn text-white bg-gray-900 border-black mr-5 btn-sm btn-error px-8">
              Log-out
            </button>
          ) : (
            <NavLink to='/login'>
              <button className="btn text-white mr-5 btn-sm btn-error px-8">Log-In</button>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
