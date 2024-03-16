import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { FaCartArrowDown } from "react-icons/fa";
import Title from '../../Components/Shared/Title';
import { FaDownload } from "react-icons/fa";
import { AiFillFileUnknown } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";

const DsrRequest = () => {
  const axiosSecure = useAxiosSecure();
  const [infos, setInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosSecure.get("/dsrRequ");
        setInfo(response.data);
      } catch (error) {
        console.error("Error fetching costs:", error);
      }
    };

    fetchData();
  }, [axiosSecure]);

  return (
    <div className="bg-base-200 p-0 m-0 lg:p-4 lg:m-4 rounded-xl">
      <div className="text-3xl py-2">
        <Title title="DSR Request"></Title>
      </div>

      <div className="flex justify-evenly">
      </div>
      <hr className="py-2" />

      <div className="overflow-x-auto">
        <table className="table">
          <thead className="text-sm text-center">
            <th>No</th>
            <th>Req Date</th>
            <th>Req time</th>
            <th>DSR Name</th>
            <th>ShopName </th>
            <th>Details</th>
          </thead>
          <tbody>
            {infos.map((info, index) => (
              <tr className="text-center" key={index}>
                <td>{index + 1}</td>
                <td>{info.orderDate}</td>
                <td>{info.orderTime}</td>

                <td className="text-success">{info?.dsrInfo?.displayName}</td>
                <td>{info?.shopInfo?.shopName}</td>

                <td className="flex gap-2 pl-14">
                  {
                    info?.orderStatus === "pending" ? <NavLink to={`/dsrReqDetails/${info._id}`}>
                      <AiFillEye className="text-2xl cursor-pointer hover:text-rose-700"></AiFillEye>
                    </NavLink>
                      :
                      <div className="flex gap-10">
                        <Link to={`/due/${info._id}`}>
                          <FaDownload className="text-xl cursor-pointer hover:text-rose-700"></FaDownload>
                        </Link>

                        <Link to={`/checkOut/${info._id}`}>
                          <FaCartArrowDown className="text-2xl hover:text-blue-700 cursor-pointer"></FaCartArrowDown>
                        </Link>
                      </div>
                  }

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DsrRequest;