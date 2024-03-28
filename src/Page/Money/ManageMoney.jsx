import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hook/useAxiosSecure";

// Constant for API URL
const MONEY_API_URL = "https://tmw-corpo-server.vercel.app/money";

const ManageMoney = () => {
  const [moneys, setMoneys] = useState([]);
  const axiosSecure = useAxiosSecure();

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosSecure.get(MONEY_API_URL);
        setMoneys(response.data);
      } catch (error) {
        console.error("Error fetching entries:", error);
      }
    };

    fetchData();
  }, [axiosSecure]);
  return (
    <div className="bg-base-200 p-0 m-0 lg:p-4 lg:m-4 rounded-xl">
      <div className="text-3xl py-2">
        <h2>Manage Shop</h2>
      </div>
      <div className="flex w-full  ">
        <Link to="/addMoney">
          <button className=" btn btn-primary">Add Shop</button>
        </Link>
      </div>
      <div className="flex justify-evenly">
        <h4>Total No: {moneys?.length}</h4>
    
      </div>
      <hr className="py-2" />

      <div className="overflow-x-auto">
        <table className="table">
          <thead className="text-sm">
            <th>No</th>
            <th>Money</th>
            <th>Issues</th>
            <th>Date</th>
            <th>Type</th>
            <th>Action</th>
          </thead>
          <tbody>
            {moneys.map((money, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{money?.Money} tk</td>
                <td>{money.costIssues}</td>
                <td>{new Date(money.costDate).toLocaleDateString("en-GB")}</td>
                <td>{money.costType}</td>
                <td>
                  <button
                    className="btn btn-sm btn-error"
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

 

export default ManageMoney;