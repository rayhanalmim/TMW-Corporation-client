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
        <div className="w-full mt-7 lg:w-1/2">
          <img
            src={user?.photoURL}
            alt={user?.displayName}
            className="w-32 h-32 mx-auto rounded-full  aspect-square"
          />

          <div className="pt-5">
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
        <div className="w-full lg:w-1/2 text-left mt-10 lg:ml-8">
          <p className="text-xl border-b-2 border-black font-bold mb-4">User Profile</p>
          <p>
            <span className="font-bold text-blue-500">Name:</span>{" "}
            {user?.displayName}
          </p>
          <p>
            <span className="font-bold text-blue-500">Email:</span>{" "}
            {user?.email}
          </p>
          <p>
            <span className="font-bold text-blue-500">Phone No:</span>{" "}
            {user?.phoneNo}
          </p>
          <p>

            {user?.userType === "isAdmin" ? <h3><span className="font-bold text-blue-500">User Role: </span>Admin</h3> : <span className="font-bold text-blue-500">User Role: {user?.userType}</span> }
          </p>
          <div className="flex gap-4 mt-4 justify-end"></div>
        </div>
      </div>
    </div>
  );
};

export default SingleProfile;
