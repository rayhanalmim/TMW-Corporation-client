import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const EditProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { data: user = [], isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${id}`);
      return res.data;
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      displayName: e.target.displayName.value,
      phoneNo: e.target.phoneNo.value,
      beach: parseInt(e.target.beach.value),
      userType: e.target.userType.value,
    };

    try {
      const updateRes = await axiosSecure.put(`/user/${id}`, formData);

      if (updateRes.data) {
        navigate(`/singleUserInfo/${user?._id}`);
        Swal.fire({
          text: updateRes.data.message,
          icon: "success",
          position: "top-right",
          timer: 1000,
        });
      } else {
        Swal.fire({
          icon: "error",
          text: updateRes.data.message,
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error updating user: ", error);
      Swal.fire({
        icon: "error",
        text: "An error occurred while updating the user.",
        position: "top-right",
      });
    }
  };

  return (
    <div className="w-11/12 mx-auto max-w-4xl p-8 space-y-3 rounded-xl m-5 text-white">
      <h1 className="text-2xl font-bold text-center">Update user</h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-1 text-sm">
            <label className="block dark-text-gray-400">Name</label>
            <input
              type="text"
              name="displayName"
              defaultValue={user?.displayName}
              className="text-gray-900 w-full px-4 py-3 rounded-md dark-border-gray-700 dark-bg-gray-900 dark-text-gray-100 focus:dark-border-violet-400"
            />
          </div>
          <div className="space-y-1 text-sm">
            <label className="block dark-text-gray-400">Phone number</label>
            <input
              type="text"
              name="phoneNo"
              defaultValue={user?.phoneNo}
              className="text-gray-900 w-full px-4 py-3 rounded-md dark-border-gray-700 dark-bg-gray-900 dark-text-gray-100 focus:dark-border-violet-400"
            />
          </div>
          <div className="space-y-1 text-sm">
            <label className="block dark-text-gray-400">user Type/Tags</label>
            <div className=" text-sm flex gap-2">
              <select
                name="userType"
                defaultValue={user?.userType}
                className="w-full px-4 py-3 rounded-md text-black"
              >
                <option value="isAdmin">Admin</option>
                <option value="isAgent">Agent</option>
                <option value="user">out service</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="block w-full p-3 text-center rounded-xl dark-text-gray-900 dark-bg-violet-400 btn btn-primary"
          >
            Update user
          </button>
        </form>
      )}
    </div>
  );
};

export default EditProfile;
