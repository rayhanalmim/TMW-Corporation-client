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

  const handleDue = async (e, billID, paidAmount) => {
    e.preventDefault();
    console.log(billID, paidAmount, id);
    const res = await axiosSecure.post(`/bill/paid?amount=${paidAmount}&billId=${billID}&shopId=${id}`);
    // if (res.data) {
    //   Swal.fire({
    //     position: "top-start",
    //     icon: "success",
    //     title: "Amount added successfully",
    //     showConfirmButton: false,
    //     timer: 1500
    // //   });
    //   setPaid('');
      // refetch();
    // }
    e.target.paid.value = '';
  };

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
            <div className="flex gap-4 mt-4 justify-end"></div>
          </div>
        </div>
        <div className="ml-10 mt-4 mb-3">
          <h2 className="text-xl font-bold mb-4 border-b-2 border-black">Shop Summary</h2>
          <table className="border-collapse border border-gray-300">
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-semibold  text-blue-500 w-1/2">Total Buy Amount:</td>
                <td className="border border-gray-300 px-4 py-2 font-bold">{shop?.totalBuyAmout}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 text-start px-4 py-2 font-semibold text-green-500 ">Total Given:</td>
                <td className="border border-gray-300 px-4 py-2 font-bold">{shop?.totalPay}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 text-start px-4 py-2 font-semibold text-red-500">Total Due:</td>
                <td className="border border-gray-300 px-4 py-2 font-bold">{shop?.totalDue}</td>
              </tr>
            </tbody>
          </table>
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
                  <th>DUE</th>
                  <th>Add paid amount</th>
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
                    <td>{product?.due > 0 ? <h3 className="text-red-600 font-semibold">{product?.due}</h3> : <h3 className="text-green-500">{product?.due}</h3>}</td>
                    <td className="">

                      {parseInt(product?.due) > 0 ?
                      <form onSubmit={(e) => handleDue(e, product._id, parseInt(paid))}>
                        <div className="flex gap-2  justify-center">

                          
                            <input
                              id="paidAmount"
                              onChange={(e) => setPaid(e.target.value)}
                              type="number"
                              name="paid"
                              className="bg-white max-w-24 px-4 btn-sm text-black rounded-md dark-border-gray-700 focus:dark-border-violet-400"
                            />
                            <button type="submit" className="text-white btn-sm bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 text-center ">
                              Add
                            </button>
                          
                        </div>
                        </form>
                        : <div className="flex items-center justify-center bg-gray-300 rounded-full p-2">
                          <h4 className="text-xs font-semibold text-green-600">Paid</h4>
                        </div>


                      }

                    </td>
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