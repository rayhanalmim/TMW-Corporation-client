
import { Link, NavLink } from "react-router-dom";
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
 console.log(billData);

  return (
    <div className="bg-base-200 p-0 m-0 lg:p-4 lg:m-4 rounded-xl">
      <div className="text-3xl py-2">
        <Title title="Bill History"></Title>
      </div>

      <div className="flex justify-evenly">
      </div>
      <hr className="py-2" />

      <div className="overflow-x-auto">
        <table className="table">
          <thead className="text-sm text-center">
            <th>Bill No</th>
            <th>Shop</th>
            <th>DSR </th>
            <th>Date</th>
            <th>Download</th>
          </thead>
          <tbody>
            {billData?.map((info, index) => (
              <tr className="text-center" key={index}>
                <td>{index + 1}</td>
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

  // return (
  //   <div className="text-white">
  //     <h2>{infos.length}</h2>
  //     {infos?.map((info) => (
  //       <div key={info?._id}>
  //         <p>Agent Name: {info?.agetName}</p>
  //       </div>
  //     ))}
  //   </div>
  // );
};

export default SellView;
