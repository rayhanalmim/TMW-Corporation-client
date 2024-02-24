import { NavLink } from "react-router-dom";
import { FaChartBar, FaBeer, FaMoneyBill, FaUser, FaShoppingCart, FaListUl, FaUsers } from "react-icons/fa";

const AdminMenu = () => {
  return (
    <div>
      <div className="flex flex-col gap-4">
        <NavLink to="/analysis">
          <li className="btn btn-primary text-white w-full">
            <FaChartBar className="mr-2" />
            Analytics
          </li>
        </NavLink>
        <NavLink to="/addToCard">
          <li className="btn btn-primary text-white w-full">
            <FaShoppingCart className="mr-2" />
            Shopping Cart
          </li>
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

        <NavLink to="/cost">
          <li className="btn btn-primary text-white w-full">
            <FaMoneyBill className="mr-2" />
            Cost Management
          </li>
        </NavLink>

        <NavLink to="/user">
          <li className="btn btn-primary text-white w-full">
            <FaUser className="mr-2" />
            User Management
          </li>
        </NavLink>

        
      </div>
    </div>
  );
};

export default AdminMenu;
