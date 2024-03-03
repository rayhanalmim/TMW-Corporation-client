import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../../../assets/logo.png";
import { AuthContext } from "../../../providers/AuthProvider";
import axios from "axios";
import { updateProfile } from "firebase/auth";
import useAxiosPublic from "../../hook/useAxiosPublic";

function validatePassword(password) {
  if (
    password.length < 6
    // password.length < 6 ||
    // !/[A-Z]/.test(password) ||
    // !/[!@#$%^&*()_+{}[\]:;<>,.?~\\/]/.test(password)
  ) {
    return "Password must be at least 6 characters long";
  }

  return "";
}
// ------------------
const apiKey = "ce962703e172614d7c982b1ffcc21721";
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${apiKey}`;

const SignUp = () => {
  const { createUser } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [nid, setNid] = useState("");
  const [loading, setLoading] = useState(false);

  const showSuccessAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Success...",
      text: "Sign up success",
    });
  };

  const showErrorAlert = (error) => {
    let errorMessage = error;

    if (error && error.message) {
      errorMessage = error.message;
    }

    Swal.fire({
      icon: "error",
      title: "Error",
      text: errorMessage,
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const passwordValidationResult = validatePassword(password);

      if (passwordValidationResult) {
        setPasswordError(passwordValidationResult);
        return;
      }

      const form = e.target;
      const displayName = form.displayName.value;
      const photoURL = form.photoURL.files[0];

      const imageFile = { image: photoURL };
      const res = await axios.post(imageHostingApi, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      createUser(email, password)
        .then((result) => {
          const currentUser = result.user;
          result.user.displayName = displayName;
          result.user.photoURL = res.data?.data?.display_url;

          updateProfile(currentUser, {
            displayName: displayName,
            photoURL: res.data?.data?.display_url,
          })
            .then(() => {
              const data = {
                displayName: result.user.displayName,
                email: result.user.email,
                photoURL: res.data?.data?.display_url,
                address,
                phoneNo: `+880${phoneNo}`,
                nid,
                userType: "user",
                beach: "no select",
                totalDueAmmout: 0,
                lastSmsSendingDate: "",
                totalPurchesAmmount: 0,
                purchesProductCollection: [],
              };
              axiosPublic.post("/user", data).then(() => {
                setLoading(false);
                showSuccessAlert();
                navigate("/");
              });
            })
            .catch((error) => {
              showErrorAlert(error.message);
              setLoading(false);
            });
        })
        .catch((error) => {
          showErrorAlert(error.message);
          setLoading(false);
        });
    } finally {
      // setLoading(false);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handlePhoneNoChange = (e) => {
    setPhoneNo(e.target.value);
  };

  const handlenidChange = (e) => {
    setNid(e.target.value);
  };

  return (
    <div>
      <div
        style={{
          backgroundImage:
            "url(https://img.freepik.com/free-vector/abstract-white-tone-memphis-social-background_53876-113860.jpg)",
          backgroundSize: "cover",
        }}
        className="py-8 px-4  min-h-screen"
      >
        <div className=" bg-blue-950 w-full  mx-auto max-w-md p-8 pb-16 space-y-3 rounded-xl border my-5  ">
          <Link to="/">
            <div className="w-24 mx-auto block rounded-full  ">
              <img src={logo} />
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-center pb-2  text-white">
            আবেদন ফরম
          </h1>
          <form onSubmit={handleSignUp} className="space-y-6">
            <div className="space-y-1 text-sm">
              <label htmlFor="displayName" className="block text-white">
                আপনার নাম
              </label>
              <input
                type="text"
                name="displayName"
                id="displayName"
                placeholder="name"
                className="w-full  border px-4 py-3 rounded-md  focus:dark:border-violet-400"
                required
              />
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="photoURL" className="block text-white">
                আপনার ছবি
              </label>
              <input
                type="file"
                name="photoURL"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   "
              />
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="email" className="block text-white">
                আপনার ইমেইল
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                id="email"
                placeholder="Email"
                className="w-full border px-4 py-3 rounded-md    focus:dark-border-violet-400"
                required
              />
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="address" className="block text-white">
                আপনার ঠিকানা
              </label>
              <input
                type="text"
                name="address"
                value={address}
                onChange={handleAddressChange}
                id="address"
                placeholder="Address"
                className="w-full border px-4 py-3 rounded-md    focus:dark-border-violet-400"
                required
              />
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="PhoneNo" className="block text-white">
                আপনার ফোন নাম্বার
              </label>
              <label className="input input-bordered flex items-center gap-2">
                +880
                <input type="text"
                  name="PhoneNo"
                  value={phoneNo}
                  onChange={handlePhoneNoChange}
                  pattern="[0-9]{10}"
                  placeholder="1764848007"
                  required
                  id="PhoneNo" className="grow" />
              </label>
            </div>


            <div className="space-y-1 text-sm">
              <label htmlFor="nid" className="block text-white">
                আপনার জাতীয় পরিচয় পত্র নং
              </label>
              <input
                type="text"
                name="nid"
                value={nid}
                onChange={handlenidChange}
                id="nid"
                placeholder="nid No"
                className="w-full border px-4 py-3 rounded-md    focus:dark-border-violet-400"
                required
              />
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="password" className="block text-white">
                পাসওয়ার্ড
              </label>
              <input
                value={password}
                onChange={handlePasswordChange}
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="w-full px-4 border py-3 rounded-md dark.border-gray-700 dark.bg-gray-900 dark.text-gray-100 focus:dark-border-violet-400"
                required
              />
              {passwordError && (
                <p className="text-red-200 text-sm ">{passwordError}</p>
              )}
            </div>

            <button
              type="submit"
              className="block w-full p-3 text-center rounded-xl dark.text-gray-900 dark.bg-violet-400 btn btn-primary"
              disabled={loading} // Disable the button when loading
            >
              {loading ? "অপেক্ষা করুন..." : "আবেদন করুন"}
            </button>
          </form>

          <p className="text-sm text-center sm:px-6 text-white">
            আপনার একটি অ্যাকাউন্ট আছে?
            <Link
              rel="noopener noreferrer"
              to="/signIn"
              className="underline px-2 font-semibold"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
