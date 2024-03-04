import React, { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const SuperAdminRoute = ({ children }) => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  const { data: userData = [], isLoading } = useQuery({
    queryKey: ["user", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/email/${user?.email}`);
      return res.data;
    },
  });

  if (loading) {
    return (
      <div className="h-screen mx-auto w-full text-center">
        <h2 className="text-xl pt-32 px-16">Loading...</h2>
        <progress className="progress px-8 w-1/2"></progress>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="h-screen mx-auto w-full text-center">
        <h2 className="text-xl pt-32 px-16">Loading...</h2>
        <progress className="progress px-8 w-1/2"></progress>
      </div>
    );
  }

    if (  userData.userType === "isAdmin") {
      return children;
    }

    return <Navigate state={location.pathname} to="/invalidAdmin" />;
  
};

export default SuperAdminRoute;
