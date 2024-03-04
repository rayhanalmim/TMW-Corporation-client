import { createBrowserRouter } from "react-router-dom";
import Signin from "../Components/AuthComponets/Signin/Signin";
import SignUp from "../Components/AuthComponets/Signup/signUp";
import Dashboard from "../Page/Dashboard/Dashboard";
import Page404 from "../Components/Shared/Error/Page404";
import PrivateRoute from "./PrivateRoute";
import AddProduct from "../Page/Product/AddProduct";
import UpdateProduct from "../Page/Product/UpdateProduct";
import AllProduct from "../Page/Product/AllProduct";

import SingleProduct from "../Page/Product/SingleProduct";
import ShowCost from "../Page/Cost/ManageCost";
import ManageProduct from "../Page/Product/ManageProduct";
import AddCost from "../Page/Cost/AddCost";
import AddToCard from "../Page/Card/AddToCard";
import CheckOut from "../Page/CheckOut/CheckOut";
import ManageUser from "../Page/User/ManageUser";
import Profile from "../Page/Profile/Profile";
import Info from "../Page/Dashboard/Info";
import Analysis from "../Page/Analysis/Analysis";
import SingleProfile from "../Page/Profile/SingleProfile";
import InvaliodAdmin from "../Page/InvaliodUser/InvaliodAdmin";
import AdminRouter from "./AdminRouter";
import AgentAnalysis from "../Page/Analysis/AgentAnalysis";
import AgentRouter from "./AgentRouter";
import BuyList from "../Page/Dashboard/Agent/BuyList";
import OrderList from "../Page/Dashboard/Agent/OrderList";
import EditProfile from "../Page/Profile/EditProfile";
import SellView from "../Page/Sell/SellView";
import Memo from "../Page/Memo/Memo";
import Accounts from "../Page/Profile/Accounts";
import AllProducts from "../Page/Product/AllProduct";
import ManageMoney from "../Page/Money/ManageMoney";
import AddMoney from "../Page/Money/AddMoney";
import ManageShop from "../Page/Shop/ManageShop";
import AddShop from "../Page/Shop/AddShop";

const router = createBrowserRouter([
  {
    path: "/signIn",
    element: <Signin />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
  {
    path: "/memo/:id",
    element: <Memo />,
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    errorElement: <Page404 />,
    children: [
      {
        path: "/invalidAdmin",
        element: <InvaliodAdmin />,
      },
      {
        path: "/",
        element: <Info />,
      },
      {
        path: "/Products",
        element: <AllProduct />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/AddProduct",
        element: <AddProduct />,
      },
      {
        path: "/Product/:id",
        element: <SingleProduct />,
      },
      {
        path: "/sellView",
        element: (
          <AdminRouter>
            <SellView />
          </AdminRouter>
        ),
      },
      {
        path: "/EditProfile/:id",
        element: (
          <AdminRouter>
            <EditProfile />
          </AdminRouter>
        ),
      },
      {
        path: "/manageProduct",
        element: (
          <AdminRouter>
            <ManageProduct />
          </AdminRouter>
        ),
      },
      {
        path: "/UpdateProduct/:id",
        element: (
          <AdminRouter>
            <UpdateProduct />
          </AdminRouter>
        ),
      },

      {
        path: "/cost",
        element: (
          <AdminRouter>
            <ShowCost />
          </AdminRouter>
        ),
      },

      {
        path: "/addCost",

        element: (
          <AdminRouter>
            <AddCost />
          </AdminRouter>
        ),
      },
      {
        path: "/addToCard",
        element: <AddToCard></AddToCard>,
      },
      {
        path: "/checkOut",
        element: (
          <AdminRouter> 
            <CheckOut></CheckOut>
          </AdminRouter>
        ),
      },

      {
        path: "/user",
        element: (
         
            <ManageUser />
           
        ),
      },
      {
        path: "/singleUserInfo/:id",
        element: <SingleProfile />,
      },
      {
        path: "/memberlist",
        element: (
          <AdminRouter>
            <Accounts />
          </AdminRouter>
        ),
      },
      {
        path: "/analysis",
        element: (
          <AdminRouter>
            <Analysis />
          </AdminRouter>
        ),
      },
      {
        path: "/agentAnalysis",
        element: (
          <AgentRouter>
            <AgentAnalysis />
          </AgentRouter>
        ),
      },
      {
        path: "/buyList",
        element: (
          <BuyList>
            <AgentAnalysis />
          </BuyList>
        ),
      },
      {
        path: "/allProduct",
        element: <AllProducts></AllProducts>,
      },{
        path: "/shop",
        element: <ManageShop></ManageShop>,
      },{
        path: "/addShop",
        element:<AddShop/> ,
      },
    ],
  },
]);

export default router;
