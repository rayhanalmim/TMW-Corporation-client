import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { FaCartArrowDown } from "react-icons/fa";
import Title from '../../Components/Shared/Title';
import { FaDownload } from "react-icons/fa";
import { AiFillEye } from "react-icons/ai";

const DsrRequest = () => {
  const axiosSecure = useAxiosSecure();
  const [infos, setInfo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axiosSecure.get(`/dsrRequ?page=${currentPage}&limit=${itemsPerPage}`);
        setInfo(prevInfo => [...prevInfo, ...response.data]);
        setLoading(false);
        if (response.data.length === 0) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching costs:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [axiosSecure, currentPage, itemsPerPage]);

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="bg-base-200 p-0 m-0 lg:p-4 lg:m-4 rounded-xl">
      <div className="text-3xl py-2">
        <Title title="DSR Request"></Title>
      </div>

      <div className="flex justify-evenly"></div>
      <hr className="py-2" />

      <div className="overflow-x-auto">
        <table className="table">
          <thead className="text-sm text-center">
            <tr>
              <th className="py-2 border-dotted border-4 text-center">No</th>
              <th className="py-2 border-dotted border-4 text-center">Req Date</th>
              <th className="py-2 border-dotted border-4 text-center">Req time</th>
              <th className="py-2 border-dotted border-4 text-center">DSR Name</th>
              <th className="py-2 border-dotted border-4 text-center">ShopName </th>
              <th className="py-2 border-dotted border-4 text-center">Details</th>
            </tr>
          </thead>
          <tbody>
            {infos.map((info, index) => (
              <tr className="text-center" key={index}>
                <td className="py-2 border-dotted border-4 text-center">{index + 1}</td>
                <td className="py-2 border-dotted border-4 text-center">{info.orderDate}</td>
                <td className="py-2 border-dotted border-4 text-center">{info.orderTime}</td>
                <td className="text-success py-2 border-dotted border-4 text-center">{info?.dsrInfo?.displayName}</td>
                <td className="py-2 border-dotted border-4 text-center">{info?.shopInfo?.shopName}</td>
                <td className="flex gap-2 pl-14 py-2 border-dotted border-4 text-center">
                  {info?.orderStatus === "pending" ? (
                    <NavLink className='' to={`/dsrReqDetails/${info._id}`}>
                      <AiFillEye className="text-2xl cursor-pointer hover:text-rose-700"></AiFillEye>
                    </NavLink>
                  ) : (
                    <div className="flex gap-10 ">
                      <Link to={`/due/${info._id}`}>
                        <FaDownload className="text-xl cursor-pointer hover:text-rose-700"></FaDownload>
                      </Link>
                      <Link to={`/checkOut/${info._id}`}>
                        <FaCartArrowDown className="text-2xl hover:text-blue-700 cursor-pointer"></FaCartArrowDown>
                      </Link>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="mx-4 text-lg font-semibold">Page {currentPage}</span>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleNextPage}
          disabled={loading || !hasMore}
        >
          {loading ? 'Loading...' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default DsrRequest;
