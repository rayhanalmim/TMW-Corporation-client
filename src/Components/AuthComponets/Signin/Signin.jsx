import Swal from "sweetalert2";
import logo from "../../../assets/logo.png";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosPublic from "../../../Hook/useAxiosPublic";

const showSuccessAlert = () => {
  Swal.fire({
    icon: "success",
    title: "Success...",
    text: "Sign in success",
  });
};

const showErrorAlert = (error) => {
  Swal.fire({
    icon: "error",
    title: "login unsuccessful ",
    text: error,
  });
};

const Signin = () => {
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const navigate = useNavigate();
  const { signIn } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
   
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");
   
    signIn(email, password)
      .then(() => {
        showSuccessAlert();
        navigate(location?.state ? location.state : "/");
      })

      .catch((error) => {
         
        if (error.code === "auth/invalid-login-credentials") {
          showErrorAlert("Email or password is incorrect.");
        } else {
          showErrorAlert(error.message);
        }
      });
  };

  return (
    <div
      style={{
        backgroundImage:
          "url(https://img.freepik.com/free-vector/abstract-white-tone-memphis-social-background_53876-113860.jpg)",
        backgroundSize: "cover",
      }}
      className="py-8 px-4 min-h-screen"
    >
      <div className=" bg-blue-950  w-full  mx-auto max-w-md p-8 pb-16 space-y-3 rounded-xl border my-5  ">
        <Link to="/">
          <div className="w-32 mx-auto block rounded-full  ">
            <img src={logo} />
          </div>
        </Link>

        <form className="space-y-6 " onSubmit={handleLogin}>
          <div className="space-y-1 text-sm">
            <label className="block  text-white">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              className="w-full px-4 py-3 border rounded-md dark:border-gray-700 dark:bg-gray-900   focus:dark:border-violet-400"
            />
          </div>
          <div className="space-y-1 text-sm">
            <label className="block  text-white ">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-md border dark:border-gray-700 dark:bg-gray-900   focus:dark:border-violet-400"
            />
          </div>
          <button className="block w-full p-3 text-center rounded-xl dark:text-gray-900 dark:bg-violet-400 btn btn-primary">
            Sing In
          </button>
        </form>
       
      </div>
    </div>
  );
};

export default Signin;
