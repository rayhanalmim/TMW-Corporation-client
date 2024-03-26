import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

const AddToCard = () => {

  return (
    <div>
      <Link to="/request">
        <div className="cursor-pointer">
          <FiShoppingCart className="text-4xl hover:text-5xl"></FiShoppingCart>
        </div>
      </Link>
    </div>
  );
};

export default AddToCard;
