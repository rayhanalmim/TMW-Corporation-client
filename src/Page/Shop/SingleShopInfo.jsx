import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaDownload } from "react-icons/fa";
import { useState } from "react";
import Swal from "sweetalert2";

const SingleShopInfo = () => {
  const { id } = useParams();
  const [paid, setPaid] = useState();
  const axiosSecure = useAxiosSecure();

  const { data: shop = [], refetch } = useQuery({
    queryKey: ["shop"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/money/singleShop?id=${id}`);
      return res.data;
    },
  });

  const { data: bill = [] } = useQuery({
    queryKey: ["shopbasebill", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bill/shop?shopId=${id}`);
      return res.data;
    },
  });
  console.log(bill);

  const handleDue = async (e) => {
    e.preventDefault();
    const paidAmount = parseInt(paid);

    if (paid !== '') {
      const res = await axiosSecure.post(`/bill/paid?amout=${paidAmount}&id=${id}`);
      if (res.data) {
        Swal.fire({
          position: "top-start",
          icon: "success",
          title: "Amount added successfully",
          showConfirmButton: false,
          timer: 1500
        });
        setPaid('')
        e.target.paid.value = '';
        refetch();
      }
    }else{
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Error",
        text: "Please add a valid amout",
        icon: "error"
      });
    }

  }

  return (
    <div className="bg-base-300   p-8 rounded-lg shadow-md">

      <div className="grid grid-cols-2">
        <div className="flex flex-col lg:flex-row w-full">

          <div className="w-full  text-left mt-4 lg:ml-8">
            <p className="text-xl border-b-2 border-black font-bold mb-4">Shop Details</p>
            <p className="">
              <span className="font-bold text-blue-500">Shop Name:</span>{" "}
              {shop?.shopName}
            </p>
            <p>
              <span className="font-bold text-blue-500">Shop Area:</span>{" "}
              {shop?.shopArea}
            </p>
            <p>
              <span className="font-bold text-blue-500">Owner Name:</span>{" "}
              {shop?.shopOwner}
            </p>
            <p>
              <span className="font-bold text-blue-500">Phone No:</span>{" "}
              +880{shop?.contractNumber}
            </p>
            <p>
              <span className="font-bold text-green-500">Total Buy Amount:{shop?.totalBuyAmout} </span>
            </p>
            <p>
              <span className="font-bold text-info">Total given :{shop?.totalPay} </span>{" "}

            </p>
            <p>
              <span className="font-bold text-red-500">
                Total Duo: {shop?.totalDue}
              </span>
            </p>
            <div className="flex gap-4 mt-4 justify-end"></div>
          </div>
        </div>
        <div className="mt-3">
          <h3 className="text-gray-800 font-semibold mb-2">Add paid amounts: </h3>
          <form className="space-y-6" onSubmit={handleDue}>
            <input
              onChange={(e) => setPaid(e.target.value)}
              type="number"
              name="paid"
              className="w-1/2 bg-white text-black px-4 py-2.5 rounded-md dark-border-gray-700 focus:dark-border-violet-400"
            />
            {/* Submit Button */}
            <br />
            <button
              type="submit"
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Add amount
              </span>
            </button>

          </form>

        </div>
      </div>

      <div className="bg-base-300">
        <div className="bg-base-200  rounded-xl">
          <div className="text-3xl py-2 ">
            <h2>Purchase History</h2>
          </div>
          <div className="flex w-full  "></div>

          <div className="overflow-x-auto">
            <table className="table">
              <thead className=" text-sm text-center text-black font-semibold">
                <tr>
                  <th>No</th>
                  <th>Bill No</th>
                  <th>Purchase date</th>
                  <th>Time</th>
                  <th>VIA</th>
                  <th>Invoice</th>
                </tr>
              </thead>
              <tbody>
                {bill?.slice().reverse().map((product, index) => (
                  <tr className=" text-center border-gray-300" key={index}>
                    <td>{index + 1}</td>
                    <td>{product?.orderNo}</td>
                    <td>{product?.orderDate}</td>

                    <td>{product?.orderTime}</td>
                    <td>{product?.dsrInfo?.displayName}</td>
                    <td className="flex justify-center">
                      <div className="">
                        <Link to={`/memo/${product?._id}`}>
                          <FaDownload className="text-xl cursor-pointer hover:text-rose-700"></FaDownload>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleShopInfo;