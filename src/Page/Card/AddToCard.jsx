import { FiShoppingCart } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

const AddToCard = () => {
  const location = useLocation();

  // Check if the current path matches '/request'
  const isRequestRoute = location.pathname === "/request";

  return (
    <div>
      <Link to="/request">
        <div className="cursor-pointer">
          <FiShoppingCart className={`text-4xl text-gray-400 ${isRequestRoute ? 'text-5xl text-white' : ''} hover:text-5xl hover:text-white`} />
        </div>
      </Link>
    </div>
  );
};

export default AddToCard;
