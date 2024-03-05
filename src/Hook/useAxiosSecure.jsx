import axios from "axios";

const axiosSecure = axios.create({
 
  baseURL: "https://tmw-corpo-server.vercel.app",
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
