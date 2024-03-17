import axios from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../Components/hook/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import useAdmin from "../../Hook/useAdmin";
import useAgent from "../../Hook/useAgent";

const AddProduct = () => {
  const [isAdmin] = useAdmin();
  const [isAgent] = useAgent();  //Dsr
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const apiKey = "ce962703e172614d7c982b1ffcc21721";
  const imageHostingApi = `https://api.imgbb.com/1/upload?key=${apiKey}`;

  const onSubmit = async (data) => {
    const photoURL = data.photoURL[0];
    const imageFile = { image: photoURL };

    try {
      const res = await axios.post(imageHostingApi, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      const productData = {
        productName: data.productName,
        perCartonQuantity: data.perCartonQuantity,
        lightColor: data.LightColor,
        productType: data.type,
        ProductCategory: data.ProductCategory,
        wat: data.wat,
        orginalPrice: parseFloat(data.productPrice),
        productPrice: parseFloat(data.productPrice),
        productQuantity: 0,
        productDescription: data.productDescription,
        imageURL: res.data.data.url,
        addedBy: user?.email,
        discount: 0,
        sellCollections: [],
      };
      console.log(productData);
      const productRes = await axiosPublic.post("/product", productData);

      if (productRes.data) {
        reset({
          productName: "",
          perCartonQuantity: "",
          LightColor: "",
          ProductCategory: "",
          wat: "",
          type: "",
          photoURL: "",
          productQuantity: "",
          productPrice: "",
          productBuyPrice: "",
          productDescription: "",
        });

        Swal.fire({
          title: "Product added",
          text: "You clicked the button!",
          icon: "success",
        });
        navigate('/manageProduct');
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="rounded-xl  text-white p-8 ">
      <h1 className="text-2xl font-bold text-center">Add a Product</h1>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

        <div className="flex w-full gap-4 flex-col lg:flex-row">
          <div className="space-y-1 text-sm w-full lg:w-1/2">
            <label className="block dark-text-gray-400">Product Name</label>
            <input
              {...register("productName", {
                required: "Product Name is required",
              })}
              type="text"
              className="text-gray-900 w-full px-4 py-3 rounded-md dark-border-gray-700 focus:dark-border-violet-400"
            />
            {errors.productName && (
              <p className="text-red-500">{errors.productName.message}</p>
            )}
          </div>
          <div className="space-y-1 text-sm w-full lg:w-1/2">
            <label className="block dark-text-gray-400">Per Carton Quantity</label>
            <input
              {...register("perCartonQuantity", {
                required: "Cartion Quantity is required",
              })}
              type="number"
              className="text-gray-900 w-full px-4 py-3 rounded-md dark-border-gray-700 focus:dark-border-violet-400"
            />
            {errors.perCartonQuantity && (
              <p className="text-red-500">{errors.perCartonQuantity.message}</p>
            )}
          </div>

        </div>



        <div className="flex w-full gap-4 flex-col lg:flex-row">
          <div className="space-y-1 text-sm w-full lg:w-1/2">
            <label className="block dark-text-gray-400">Image </label>
            <input
              {...register("photoURL", { required: "Image URL is required" })}
              type="file"
              className="w-full bg-white text-black px-4 py-2.5 rounded-md dark-border-gray-700 focus:dark-border-violet-400"
            />
            {errors.photoURL && (
              <p className="text-red-500">{errors.photoURL.message}</p>
            )}
          </div>

          <div className="space-y-1 text-sm w-full lg:w-1/2">
            <label className="block dark-text-gray-400">Light Color</label>
            <select
              {...register("LightColor", {
                required: "Light color is required",
              })}
              className="text-gray-900 w-full px-4 py-3 rounded-md dark-border-gray-700 focus:dark-border-violet-400"
            >
              <option value="">Select Light Color</option>
              <option value="Daylight">Daylight</option>
              <option value="Warm">Warm</option>
              <option value="Green">Green</option>
              <option value="Blue">Blue</option>
              <option value="Red">Red</option>
            </select>
            {errors.LightColor && (
              <p className="text-red-500">{errors.LightColor.message}</p>
            )}
          </div>

        </div>

        {/* ------------------------productType&Wat------------------- */}
        <div className="flex w-full gap-4 flex-col lg:flex-row">

          <div className="space-y-1 text-sm w-full lg:w-1/2">
            <label className="block dark-text-gray-400">Product Category</label>
            <select
              {...register("ProductCategory", {
                required: "Category is required",
              })}
              className="text-gray-900 w-full px-4 py-3 rounded-md dark-border-gray-700 focus:dark-border-violet-400"
            >
              <option value="">Select property type</option>
              <option value="M COB">M COB</option>
              <option value="LED NIGHT-O COLOR BULB">LED NIGHT-O COLOR BULB</option>
              <option value="LED GLOBE COLOR BULB">LED GLOBE COLOR BULB</option>
              <option value="X-PRESS - 1 YEAR">X-PRESS - 1 YEAR</option>
              <option value="CANDLE CRYSTAL">CANDLE CRYSTAL</option>
              <option value="SPOT LIGHT-ECO">SPOT LIGHT-ECO</option>
              <option value="OS-22 (SMD PANEL)">OS-22 (SMD PANEL)</option>
              <option value="OS-33 (SMD PANEL)">OS-33 (SMD PANEL)</option>
              <option value="FLAT WHITE PANEL(ROUND/SQUARE)">FLAT WHITE PANEL(ROUND/SQUARE)</option>
              <option value="SURFACE PANEL">SURFACE PANEL</option>
              <option value="FLOWER PANEL">FLOWER PANEL</option>
              <option value="SURFACE FLOWER PANEL">SURFACE FLOWER PANEL</option>
              <option value="ELIT PANEL">ELIT PANEL</option>
              <option value="FLEXIBLE PANEL">FLEXIBLE PANEL</option>
              <option value="ELITE FLEXIBLE PANEL">ELITE FLEXIBLE PANEL</option>
              <option value="ELITE SURFACE FLEXIBLE PANEL">ELITE SURFACE FLEXIBLE PANEL</option>
              <option value="NEW FLEXO PANEL">NEW FLEXO PANEL</option>
              <option value="NEW SURFACE FLEXO PANEL">NEW SURFACE FLEXO PANEL</option>
              <option value="SLIM PANEL - 1 YEAR">SLIM PANEL - 1 YEAR</option>
              <option value="V-SERIES PANEL">V-SERIES PANEL</option>
              <option value="AC/DC BULB">AC/DC BULB</option>
              <option value="ECO BULB">ECO BULB</option>
              <option value="COSCO BULB - 1 YEAR">COSCO BULB - 1 YEAR</option>
              <option value="JET BULB - 1 YEAR">JET BULB - 1 YEAR</option>
              <option value="LED BULLET BULB">LED BULLET BULB</option>
              <option value="LED MOON BULB">LED MOON BULB</option>
              <option value="NEW UFO BULB">NEW UFO BULB</option>
              <option value="OLD UFO BULB">OLD UFO BULB</option>
              <option value="HIGH BAY">HIGH BAY</option>
              <option value="G-SERIES BULB">G-SERIES BULB</option>
              <option value="BOWLING BULB">BOWLING BULB</option>
              <option value="2/2 PANEL LIGHT">2/2 PANEL LIGHT</option>
              <option value="2/2 PANEL LIGHT-BACK LITE">2/2 PANEL LIGHT-BACK LITE</option>
              <option value="T8 ONLY LIGHT">T8 ONLY LIGHT</option>
              <option value="T8 TUBE LIGHT (complete)">T8 TUBE LIGHT (complete)</option>
              <option value="T5 TUBE LIGHT ( SQUARE)">T5 TUBE LIGHT ( SQUARE)</option>
              <option value="T5 TUBE LIGHT ( MASHROOM)">T5 TUBE LIGHT ( MASHROOM)</option>
              <option value="T8 GLASS TUBE">T8 GLASS TUBE</option>
              <option value="SUPPER SMART TUBE SHADE">SUPPER SMART TUBE SHADE</option>
              <option value="SMART TUBE SHADE">SMART TUBE SHADE</option>
              <option value="GLAMOUR STREET LIGHT">GLAMOUR STREET LIGHT</option>
              <option value="LED T5 LINK TUBE">LED T5 LINK TUBE</option>
              <option value="LED FLOOD LIGHT - APPLE SERIES">LED FLOOD LIGHT - APPLE SERIES</option>
              <option value="LED FLOOD LIGHT - XPRESS">LED FLOOD LIGHT - XPRESS</option>
              <option value="LED FLOOD LIGHT (E018E)">LED FLOOD LIGHT (E018E)</option>
            </select>
            {errors.ProductCategory && (
              <p className="text-red-500">{errors.ProductCategory.message}</p>
            )}
          </div>


          <div className="space-y-1 text-sm w-full lg:w-1/2">
            <label className="block dark-text-gray-400">Light Wat</label>
            <input
              {...register("wat", {
                required: "Wat is required",
              })}
              type="number"
              className="text-gray-900 w-full px-4 py-3 rounded-md dark-border-gray-700 focus:dark-border-violet-400"
            />
            {errors.wat && (
              <p className="text-red-500">{errors.wat.message}</p>
            )}
          </div>

        </div>



        {
          isAdmin &&
          <div className="flex w-full gap-4 flex-col lg:flex-row">
            <div className="space-y-1 text-sm w-full lg:w-1/2">
              <label className="block dark-text-gray-400">Product Quantity</label>
              <input
                {...register("productQuantity", {
                })}
                type="number"
                defaultValue={0}
                className="text-gray-900 w-full px-4 py-3 rounded-md dark-border-gray-700 focus:dark-border-violet-400"
              />
              {errors.productQuantity && (
                <p className="text-red-500">{errors.productQuantity.message}</p>
              )}
            </div>

            <div className="space-y-1 text-sm w-full lg:w-1/2">
              <label className="block dark-text-gray-400">Product Price</label>
              <input
                {...register("productPrice", {
                  required: "Product Price is required",
                })}
                type="number"
                className="text-gray-900 w-full px-4 py-3 rounded-md dark-border-gray-700 focus:dark-border-violet-400"
              />
              {errors.productPrice && (
                <p className="text-red-500">{errors.productPrice.message}</p>
              )}
            </div>

            <div className="space-y-1 text-sm w-full lg:w-1/2">
              <label className="block dark-text-gray-400">Product Type</label>
              <select
                {...register("type", {
                  required: "Type is required",
                })}
                className="text-gray-900 w-full px-4 py-3 rounded-md dark-border-gray-700 focus:dark-border-violet-400"
              >
                <option value="">Select Type</option>
                <option value="B22">B22</option>
                <option value="E27">E27</option>
                <option value="E14">E14</option>
                <option value="Round">Round</option>
                <option value="Squre">Squre</option>
              </select>
              {errors.type && (
                <p className="text-red-500">{errors.type.message}</p>
              )}
            </div>
          </div>
        }

        {
          isAgent && <div className="space-y-1 text-sm ">
            <label className="block dark-text-gray-400">Product Price</label>
            <input
              {...register("productPrice", {
                required: "Product Price is required",
              })}
              type="number"
              className="text-gray-900 w-full px-4 py-3 rounded-md dark-border-gray-700 focus:dark-border-violet-400"
            />
            {errors.productPrice && (
              <p className="text-red-500">{errors.productPrice.message}</p>
            )}
          </div>
        }



        {/* Product Description */}
        <div className="space-y-1 text-sm">
          <label className="block dark-text-gray-400">
            Product Description
          </label>
          <textarea
            {...register("productDescription", {
              required: "Product Description is required",
            })}
            className="text-gray-900 w-full px-4 py-3 rounded-md dark-border-gray-700 dark-bg-gray-900 dark-text-gray-100 focus:dark-border-violet-400"
          />
          {errors.productDescription && (
            <p className="text-red-500">{errors.productDescription.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="block w-full p-3 text-center rounded-xl dark-text-gray-900 dark-bg-violet-400 btn btn-primary"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
