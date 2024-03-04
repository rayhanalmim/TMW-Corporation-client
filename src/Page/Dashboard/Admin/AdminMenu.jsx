import { NavLink } from "react-router-dom";
import { FaChartBar, FaBeer, FaUser, FaShoppingCart, FaListUl, FaUsers } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";

const AdminMenu = () => {
  return (
    <div>
      <div className="flex flex-col gap-4">

        <NavLink to="/">
          <button className="btn btn-primary text-white w-full ">
            <FaShoppingCart className="mr-2" />
            Home
          </button>
        </NavLink>
        
        <NavLink to="/addToCard">
          <button className="btn btn-primary text-white w-full ">
            <FaShoppingCart className="mr-2" />
            DSR Order Request
          </button>
        </NavLink>

        <NavLink to="/sellView">
          <li className="btn btn-primary text-white w-full">
            <FaListUl className="mr-2" />
            Sell List
          </li>
        </NavLink>

        <NavLink to="/memberlist ">
          <li className="btn btn-primary text-white w-full">
            <FaUsers className="mr-2" />
            List of Due
          </li>
        </NavLink>
        <NavLink to="/manageProduct">
          <li className="btn btn-primary text-white w-full">
            <FaBeer className="mr-2" />
            Product Management
          </li>
        </NavLink>

        <NavLink to="/shop">
          <li className="btn btn-primary text-white w-full">
            <FaShop className="mr-2" />
           Client Shop Management
          </li>
        </NavLink>

        <NavLink to="/user">
          <li className="btn btn-primary text-white w-full">
            <FaUser className="mr-2" />
            Employee Management
          </li>
        </NavLink>

        <NavLink to="/analysis">
          <li className="btn btn-primary text-white w-full">
            <FaChartBar className="mr-2" />
            Sell Analysis
          </li>
        </NavLink>


      </div>
    </div>
  );
};

export default AdminMenu;
