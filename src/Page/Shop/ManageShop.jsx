import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Title from "../../Components/Shared/Title";
import { useQuery } from "@tanstack/react-query";

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



  return (
    <div className="bg-base-200 p-0 m-0 lg:p-4 lg:m-4 rounded-xl">
      <div className="text-3xl py-2">
        <Title title="Manage Shop"></Title>
      </div>
      <div className="flex w-full  ">
        <Link to="/addShop">
          <button className=" btn btn-primary">Add Shop</button>
        </Link>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by shop name"
          // onChange={(e) => handleFilterChange(e.target.value)}
          // onKeyDown={(e) => handleKeyDown(e)}
          className="w-1/2 mx-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 transition duration-300"
        />
      </div>

      <div className="flex justify-evenly">

      </div>
      <hr className="py-2" />

      <div className="overflow-x-auto">
        <table className="table">
          <thead className="text-sm">
            <th>No</th>
            <th>Shop Name</th>
            <th>Shop Area</th>
            <th>Owner Name</th>
            <th>Contract</th>
            <th>Action</th>
          </thead>
          <tbody>
            {moneys.map((money, index) => (
              <tr className="border-b-1 border-gray-300" key={index}>
                <td>{index + 1}</td>
                <div className="mt-2">
                  <Link
                    className="text-blue-800 font-bold"
                    to={`/singleShopInfo/${money?._id}`}
                  >
                    <td>{money?.shopName}</td>
                  </Link>
                </div>

                <td>{money.shopArea}</td>
                <td>{money.shopOwner}</td>
                <td>0{money.contractNumber}</td>
                <td>
                  <button
                    className="btn btn-sm text-white btn-error"
                    onClick={() => handleDeleteProduct(money?._id)}
                  >
                    Delete
                  </button>
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