import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Title from "../../Components/Shared/Title";
import { FaFileDownload } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";

const SellView = () => {
  const axiosSecure = useAxiosSecure();

  const { data: billData } = useQuery({
    queryKey: ["billData"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bill`);
      return res.data;
    },
  });

  const date = new Date().toISOString().substring(0, 10);

  const [startDate, setStartDate] = useState("2024-03-11");
  const [endDate, setEndDate] = useState(date);
  const [filteredBillData, setFilteredBillData] = useState([]);

  const filterData = () => {
    if (!billData) return [];
    const start = new Date(startDate);
    const end = new Date(endDate);
    return billData.filter(item => {
      const orderDate = new Date(item.orderDate);
      return orderDate >= start && orderDate <= end;
    });
  };

  useEffect(() => {
    setFilteredBillData(filterData());
  }, [billData, startDate, endDate]);

  return (
    <div className="bg-base-200 p-0 m-0 lg:p-4 lg:m-4 rounded-xl">
      <div className="text-3xl py-2">
        <Title title="Bill History"></Title>
      </div>

      <div className="flex justify-evenly py-1 md:py-4 flex-col md:flex-row">
        <h3>From</h3>
        <input
        className="pl-1 mx-6 md:mx-0"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <h3>To</h3>
        <input
        className="pl-1 mx-6 md:mx-0"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <hr className="py-2" />

      <div className="overflow-x-auto">
        <table className="table">
          <thead className="text-sm text-center">
            <tr className="">
              <th className="py-2 border-dotted border-4 text-center">Bill No</th>
              <th className="py-2 border-dotted border-4 text-center">Shop</th>
              <th className="py-2 border-dotted border-4 text-center">DSR</th>
              <th className="py-2 border-dotted border-4 text-center">Date</th>
              <th className="py-2 border-dotted border-4 text-center">Invoice</th>

              <th className="py-2 border-dotted border-4 text-center">Download</th>
            </tr>
          </thead>
          <tbody>
            {filteredBillData.slice().reverse().map((info, index) => (
              <tr className="text-center" key={index}>
                <td className="py-2 border-dotted border-4 text-center">{info?.orderNo}</td>
                <td className="py-2 border-dotted border-4 text-center">{info?.shopInfo?.shopName}</td>
                <td className="py-2 border-dotted border-4 text-center">{info?.dsrInfo?.displayName}</td>
                <td className="text-success py-2 border-dotted border-4 text-center">{info?.orderDate}</td>
                <td className="">
                  <div className="flex justify-center py-2 border-dotted border-4 text-center">
                  <NavLink to={`/memo/${info?._id}`}>
                    <FaFileDownload className="text-2xl">Invoice</FaFileDownload>
                  </NavLink>
                  </div>
                </td>
                <td className="flex justify-center py-2 border-dotted border-4 text-center">
                  <NavLink to={`/memo/${info?._id}`}>
                    <MdOutlineFileDownload className="text-3xl"></MdOutlineFileDownload>
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellView;
