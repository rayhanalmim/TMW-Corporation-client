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
          <FiShoppingCart className={`text-4xl ${isRequestRoute ? 'text-5xl' : ''} hover:text-5xl`} />
        </div>
      </Link>
    </div>
  );
};

export default AddToCard;
