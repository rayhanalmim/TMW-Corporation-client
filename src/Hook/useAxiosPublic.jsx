import axios from "axios";

const axiosPublic = axios.create({
  //   baseURL:
  baseURL: "https://tmw-server.vercel.app",
  // baseURL: "http://localhost:5000",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
