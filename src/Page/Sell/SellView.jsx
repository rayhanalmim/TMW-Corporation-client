import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Title from "../../Components/Shared/Title";
import { FaFileDownload } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";

const SellView = () => {
  const axiosSecure = useAxiosSecure();

  // Pagination state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10); // Default limit

  // Fetch data with pagination
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["billData", page, limit],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bill?page=${page}&limit=${limit}`);
      return res.data;
    },
  });

  const billData = data?.billData || [];
  const pagination = data?.pagination || {};

  useEffect(() => {
    // Refetch when page or limit changes
    refetch();
  }, [page, limit, refetch]);

  return (
    <div className="bg-base-200 p-0 m-0 lg:p-4 lg:m-4 rounded-xl">
      <div className="text-3xl py-2">
        <Title title="Bill History" />
      </div>

      {isLoading && <div>Loading...</div>}
      {isError && <div>Error loading data</div>}

      <div className="overflow-x-auto">
        <table className="table">
          <thead className="text-sm text-center">
            <tr className="font-semibold text-black">
              <th className="py-2 border-dotted border-4 text-center">Bill No</th>
              <th className="py-2 border-dotted border-4 text-center">Shop</th>
              <th className="py-2 border-dotted border-4 text-center">DSR</th>
              <th className="py-2 border-dotted border-4 text-center">Date</th>
              <th className="py-2 border-dotted border-4 text-center">Invoice</th>
              <th className="py-2 border-dotted border-4 text-center">Download</th>
            </tr>
          </thead>
          <tbody>
            {billData.map((info, index) => (
              <tr className="text-center" key={index}>
                <td className="py-2 border-dotted border-4 text-center">{info?.orderNo}</td>
                <td className="py-2 border-dotted border-4 text-center">{info?.shopInfo?.shopName}</td>
                <td className="py-2 border-dotted border-4 text-center">{info?.dsrInfo?.displayName}</td>
                <td className="text-success py-2 border-dotted border-4 text-center">{info?.orderDate}</td>
                <td className="py-2 border-dotted border-4 text-center">
                  <NavLink to={`/memo/${info?._id}`}>
                    <div className="flex justify-center py-2 border-dotted border-4 text-center">
                      <FaFileDownload className="text-2xl">Invoice</FaFileDownload>
                    </div>
                  </NavLink>
                </td>
                <td className="flex justify-center py-2 border-dotted border-4 text-center">
                  <NavLink to={`/memoPrint/${info?._id}`}>
                    <MdOutlineFileDownload className="text-3xl"></MdOutlineFileDownload>
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="flex justify-between items-center my-4">
        <button
          className={`px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 
                rounded-md transition duration-150 ease-in-out
                ${page <= 1 ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>

        <button
          className={`px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 
                rounded-md transition duration-150 ease-in-out
                ${page >= pagination.totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={page >= pagination.totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

    </div>
  );
};

export default SellView;
