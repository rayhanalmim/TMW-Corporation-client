import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Title from "../../Components/Shared/Title";
import { useQuery } from "@tanstack/react-query";
import { MdDeleteForever } from "react-icons/md";
import { TbShoppingBagEdit } from "react-icons/tb";
import { FaRegEdit } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";

// Constant for API URL
const MONEY_API_URL = "https://tmw-corpo-server.vercel.app/money";

const ManageShop = () => {
  const [moneys, setMoneys] = useState([]);
  const axiosSecure = useAxiosSecure();

  const { data: shopData = [], isLoading: shopLoading, refetch: shopRefetch } = useQuery({
    queryKey: ["shop"],
    queryFn: async () => {
      const res = await axiosSecure.get(MONEY_API_URL)
      setMoneys(res.data);
      return res.data;
    }
  })

  // --------------------------------------------------------search

  const handleFilterChange = (event) => {

    console.log(event);

    if (event === '') {
      shopRefetch();
    } else {
      const regex = new RegExp(event, 'i');
      const filteredResults = moneys.filter((product) => regex.test(product.shopName));

      console.log(filteredResults);

      filteredResults.sort((a, b) => a.shopName.localeCompare(b.shopName));

      setMoneys(filteredResults);
    }
  };


  const handleKeyDown = (e) => {
    if (e.key === 'Backspace') {
      handleFilterChange(e.target.value);
      shopRefetch();
    }
  };

  const handleDeleteProduct = (moneyId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`${MONEY_API_URL}/${moneyId}`)
          .then((response) => {
            if (response) {
              setMoneys((prevMoneys) =>
                prevMoneys.filter((money) => money._id !== moneyId)
              );
              Swal.fire("Deleted!", "Your entry has been deleted.", "success");
            } else {
              Swal.fire("Error!", "Failed to delete the entry.", "error");
            }
          })
          .catch((error) => {
            console.error("Error deleting entry:", error);
            Swal.fire("Error!", "Failed to delete the entry.", "error");
          });
      }
    });
  };

  console.log(moneys);



  return (
    <div className="bg-base-200 p-0 m-0 lg:p-4 lg:m-4 rounded-xl">
      <div className="text-3xl py-2">
        <Title title="Manage Shop"></Title>
      </div>
      <div className="flex w-full  ">
        <Link to="/addShop">
          <button className=" btn btn-sm md:btn-md ml-3 lg:ml-0 mb-2 btn-primary">Add Shop</button>
        </Link>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by shop name"
          onChange={(e) => handleFilterChange(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
          className="w-1/2 mx-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 transition duration-300"
        />
      </div>

      <div className="flex justify-evenly">

      </div>
      <hr className="py-2" />

      <div className="overflow-x-auto">
        <table className="table">
          <thead className="text-sm text-center">
            <th>No</th>
            <th>Shop Name</th>
            <th>Shop Area</th>
            <th>Owner Name</th>
            <th>Contract</th>
            <th>Update</th>
            <th>Delete</th>
          </thead>
          <tbody>
            {moneys?.map((money, index) => (
              <tr className="border-b-1 text-center border-gray-300" key={index}>
                <td>{index + 1}</td>
                <div className="mt-2 ">
                  <Link
                    className="text-blue-800 hover:text-rose-400 font-bold"
                    to={`/singleShopInfo/${money?._id}`}
                  >
                    <td>{money?.shopName}</td>
                  </Link>
                </div>

                <td>{money?.shopArea}</td>
                <td>{money?.shopOwner}</td>
                <td>0{money?.contractNumber}</td>
                <td className="">
                  <div className="flex justify-center ml-2">
                    <Link to={`/updateShop/${money?._id}`}>
                      <FaUserEdit
                        className="text-3xl cursor-pointer"
                      >

                      </FaUserEdit>
                    </Link>
                  </div>
                </td>
                <td className="flex justify-center">
                  <MdDeleteForever
                    className="text-4xl cursor-pointer"
                    onClick={() => handleDeleteProduct(money?._id)}
                  >
                  </MdDeleteForever>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};



export default ManageShop;