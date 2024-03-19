import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Title from "../../Components/Shared/Title";

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

      <div className="flex justify-evenly">
        <h3>From</h3>
        <input
        className="pl-1"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <h3>To</h3>
        <input
        className="pl-1"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <hr className="py-2" />

      <div className="overflow-x-auto">
        <table className="table">
          <thead className="text-sm text-center">
            <tr>
              <th>Bill No</th>
              <th>Shop</th>
              <th>DSR</th>
              <th>Date</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            {filteredBillData.map((info, index) => (
              <tr className="text-center" key={index}>
                <td>{info?.orderNo}</td>
                <td>{info?.shopInfo?.shopName}</td>
                <td>{info?.dsrInfo?.displayName}</td>
                <td className="text-success">{info?.orderDate}</td>
                <td className="">
                  <NavLink to={`/memo/${info?._id}`}>
                    <button className="btn btn-sm btn-info">Invoice</button>
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
