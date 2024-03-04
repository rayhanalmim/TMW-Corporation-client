import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const SingleProfile = () => {
  const { id } = useParams();

  const axiosSecure = useAxiosSecure();
  const { data: user = [] } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${id}`);
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
      {user?.userType === "user" && (
        <h2 className="text-gray-500  p-4">সে একজন আবেদনকারী</h2>
      )}
      <div className="flex flex-col lg:flex-row w-full">
        <div className="w-full lg:w-1/2">
          <img
            src={user?.photoURL}
            alt={user?.displayName}
            className="w-32 h-32 mx-auto rounded-full  aspect-square"
          />

          <div>
            <Link
              className="text-blue-800 font-bold"
              to={`/EditProfile/${user?._id}`}
            >
              <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Edit User info
              </button>
            </Link>
          </div>
        </div>
        <div className="w-full lg:w-1/2 text-left mt-4 lg:ml-8">
          <p className="text-xl font-bold mb-4">Your Profile</p>
          <p>
            <span className="font-bold text-blue-500">Name:</span>{" "}
            {user?.displayName}
          </p>
          <p>
            <span className="font-bold text-blue-500">Registration Date:</span>{" "}
            {user?.date && convertToBdTime(user?.date)}
          </p>
          <p>
            <span className="font-bold text-blue-500">Email:</span>{" "}
            {user?.email}
          </p>
          <p>
            <span className="font-bold text-blue-500">Address:</span>{" "}
            {user?.address}
          </p>
          <p>
            <span className="font-bold text-blue-500">Phone No:</span>{" "}
            {user?.phoneNo}
          </p>
          <p>
            <span className="font-bold text-blue-500">NID No:</span> {user?.nid}
          </p>
          <p>
            <span className="font-bold text-blue-500">Role No:</span>
            {user?.userType}
          </p>
          <p>
            <span className="font-bold text-blue-500">Beach No: </span>
            {!user?.beach && <span>Beach No select</span>}
            {user?.beach}
          </p>
          <p>
            <span className="font-bold text-green-500">Total Buy Amount:{user?.totalPurchesAmmount} </span>
          </p> 
          <p>
            <span className="font-bold text-info">Total given :{user?.totalSellPrice} </span>{" "}
          
          </p>
          <p>
            <span className="font-bold text-red-500">
              Total Duo: {user?.totalDueAmmout}
            </span>
          </p>
          <div className="flex gap-4 mt-4 justify-end"></div>
        </div>
      </div>

      <div className="bg-base-300">
        <div className="bg-base-200  rounded-xl">
          <div className="text-3xl py-2 ">
            <h2>History</h2>
          </div>
          <div className="flex w-full  "></div>
          <h4>Total Product: {user.purchesProductCollection?.length}</h4>

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
                {user?.purchesProductCollection?.map((product, index) => (
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

export default SingleProfile;
