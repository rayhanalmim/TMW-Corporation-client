import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const SingleShopInfo = () => {
    const { id } = useParams();

  const axiosSecure = useAxiosSecure();
  const { data: shop = [] } = useQuery({
    queryKey: ["shop"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/money/singleShop?id=${id}`);
      return res.data;
    },
  });

  const convertToBdTime = (timestamp) => {
    const gmt6Time = new Date(timestamp);
    const options = { timeZone: "Asia/Dhaka" };
    return gmt6Time.toLocaleString("en-US", options);
  };

  return (
    <div className="bg-base-300   p-8 rounded-lg shadow-md">
    
      <div className="flex flex-col lg:flex-row w-full">
       
        <div className="w-full lg:w-1/2 text-left mt-4 lg:ml-8">
          <p className="text-xl border-b-2 border-black font-bold mb-4">Shop Details</p>
          <p>
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
            {shop?.contractNumber}
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

      <div className="bg-base-300">
        <div className="bg-base-200  rounded-xl">
          <div className="text-3xl py-2 ">
            <h2>Purches History</h2>
          </div>
          <div className="flex w-full  "></div>
          <h4>Total Product: {shop.purchesProductCollection?.length}</h4>

          <div className="overflow-x-auto">
            <table className="table">
              <thead className=" text-sm">
                <tr>
                  <th>No</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {shop?.purchesProductCollection?.map((product, index) => (
                  <tr className="  border-gray-300" key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={product?.imageURL} alt="Product Image" />
                          </div>
                        </div>
                      </div>
                    </td>
                    <Link
                      className="text-blue-800 font-bold"
                      to={`/product/${product?._id}`}
                    >
                      <td>{product?.productName}</td>
                    </Link>

                    <td>{product?.productQuantity}</td>
                    <td>{product?.productPrice}</td>
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