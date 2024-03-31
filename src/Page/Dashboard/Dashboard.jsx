import { Outlet } from "react-router-dom";
import Header from "../../components/Shared/Header/Header";
import AdminMenu from "./Admin/AdminMenu";
import AgentMenu from "./Agent/AgentMenu";
import UserMenu from "./User/UserMenu";
import useAdmin from "../../Hook/useAdmin.jsx";
import useAgent from "../../Hook/useAgent.jsx";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [isAgent] = useAgent();

  return (
    <div className="bg-sky-900 min-h-screen">
      <Header />
      <div className="flex flex-col lg:flex-row w-full  mx-auto gap-5 relative">
        <div className="w-full lg:w-1/3 p-4 hidden lg:block">
          <div className="justify-around  top-6 sticky p-6 lg:p-8 gap-9 text-center rounded-lg my-8 bg-sky-800 w-full mx-auto ">
            <div>
              {isAdmin ? (
                <AdminMenu />
              ) : isAgent ? (
                <AgentMenu />
              ) : (
                <UserMenu />
              )}
            </div>
          </div>
        </div>
        <div className="w-full lg:w-2/3 p-4 pt-5 lg:pt-44 sticky top-0">
          <div className="w-full justify-around lg:p-8 gap-9 text-center rounded-lg lg:-mt-32 bg-sky-800 ">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
