import {  Link,} from "react-router-dom";
import { FaChartBar, FaBeer, FaUser, FaShoppingCart, FaListUl, FaUsers } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";

const AdminMenu = () => {

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

  return (
    <div>
      <div className="flex flex-col gap-4">

        <Link to="/">
          <button className="btn bg-sky-800  hover:text-black text-white w-full ">
            <FaShoppingCart className="mr-2" />
            Home
          </button>
        </Link>

        <Link to="/dsr">
          <button className="btn bg-sky-800  hover:text-black text-white w-full ">
            <FaShoppingCart className="mr-2" />
            DSR Order Request ({infos.length})
          </button>
        </Link>

        <Link to="/sellView">
          <li className="btn bg-sky-800 text-white w-full">
            <FaListUl className="mr-2" />
            Billing Management
          </li>
        </Link>

        <Link to="/manageProduct">
          <li className="btn bg-sky-800 hover:text-black text-white w-full">
            <FaBeer className="mr-2" />
            Product Management
          </li>
        </Link>

        <Link to="/shop">
          <li className="btn bg-sky-800 hover:text-black text-white w-full">
            <FaShop className="mr-2" />
            Client Shop Management
          </li>
        </Link>

        <Link to="/user">
          <li className="btn bg-sky-800 hover:text-black text-white w-full">
            <FaUser className="mr-2" />
            Employee Management
          </li>
        </Link>

        <Link to="/analysis">
          <li className="btn bg-sky-800 hover:text-black text-white w-full">
            <FaChartBar className="mr-2" />
            Sell Analysis
          </li>
        </Link>


      </div>
    </div>
  );
};

export default AdminMenu;
