import { FiShoppingCart } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import useAdminCard from "../../Hook/useAdminCard";

const AddToCard = () => {
  const location = useLocation();

  const {adminCard, cardLoading, cardRefetch} = useAdminCard();

  // Check if the current path matches '/request'
  const isRequestRoute = location.pathname === "/request";

  return (
    <div className="">
      <Link to="/request">
        <div className="cursor-pointer relative">
          <FiShoppingCart className={`text-4xl text-gray-400 ${isRequestRoute ? 'text-5xl text-white' : ''}  hover:text-white`}> </FiShoppingCart>
          <h3 className={`absolute bottom-2.5 left-[16px] text-xs ${isRequestRoute ? 'text-[14px] left-[23px] bottom-[16px]' : ''}`}>{adminCard.length}</h3>
        </div>
      </Link>
    </div>
  );
};

export default AddToCard;
