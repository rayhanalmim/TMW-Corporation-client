import { useContext } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../../components/Shared/Header/Header";
import { AuthContext } from "../../providers/AuthProvider";
import AdminMenu from "./Admin/AdminMenu";
import AgentMenu from "./Agent/AgentMenu";
import UserMenu from "./User/UserMenu";

import useAdmin from "../../Hook/useAdmin.jsx";
import useAgent from "../../Hook/useAgent.jsx";

const showSuccessAlert = () => {
  Swal.fire({
    icon: "success",
    title: "Log out",
    text: "Successfully logged out",
  });
};

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [isAgent] = useAgent();

  const location = useLocation();
  const navigate = useNavigate();
  const { user, logOut } = useContext(AuthContext);
  const handleSignOut = async () => {
    try {
      await logOut();
      showSuccessAlert();
      navigate(location?.state?.from ? location.state.from : "/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          "url(https://img.freepik.com/free-vector/abstract-white-tone-memphis-social-background_53876-113860.jpg)",
        backgroundSize: "cover",
      }}
      className="min-h-screen"
    >
      <Header />
      <div className="lg:h-[300px] md:h-[100px] bg-cover bg-center lg:relative      ">
        <div className="container mx-auto">
          <div className=" px-8 lg:p-8">
            <p className="lg:pt-8 pt-3  text-gray-800">
              Welcome, {user?.displayName}
            </p>

            <h2 className="text-xl lg:text-4xl font-bold py-0 lg:py-4 text-left text-gray-950  capitalize">
              {isAdmin ? (
                <>Admin Dashboard,</>
              ) : isAgent ? (
                <> Office Admin Dashboard,</>
              ) : (
                <> Normal User,</>
              )}
            </h2>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row w-full container mx-auto  gap-5 ">
        <div className="w-full lg:w-1/3  p-4  sticky top-10">
          <div className="justify-around p-4 text-center rounded-lg lg:-mt-32 bg-[#172554] w-full mx-auto flex lg:flex-col gap-4">
            <div className="">
              <img
                src={user?.photoURL}
                alt={user?.displayName}
                className="   h-28   lg:h-44 mx-auto rounded-full aspect-square"
              />
            </div>

            <div className="space-y-2 text-center divide-y  ">
              <h4 className="text-white lg:pt-4">Name: {user?.displayName}</h4>

              <div className="flex gap-4 justify-center pt-3   ">
                <Link to="/profile">
                  <button className="btn btn-info  px-8">Profile</button>
                </Link>

                <button onClick={handleSignOut} className="btn btn-error px-8">
                  Log-out
                </button>
              </div>
            </div>
          </div>
          <div className="justify-around p-6 lg:p-8 gap-9 text-center rounded-lg  my-8 bg-[#172554] w-full mx-auto   ">
            <div className=" ">
              {isAdmin ? (
                <>
                  <AdminMenu />
                </>
              ) : isAgent ? (
                <>
                  <AgentMenu />
                </>
              ) : (
                <>
                  <UserMenu />
                </>
              )}
            </div>
          </div>
        </div>
        <div className="w-full lg:w-2/3 p-4  sticky top-10  ">
          <div className="w-full justify-around p-1 lg:p-8 gap-9 text-center rounded-lg lg:-mt-32 bg-[#172554]  ">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
