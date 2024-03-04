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
        ProductCategory : data.ProductCategory,
        wat: data.wat,
        productPrice: parseFloat(data.productPrice),
        productQuantity: 0,
        productDescription: data.productDescription,
        imageURL: res.data.data.url,
        addedBy: user?.email,
        discount: 0
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
              <option value="catOne">cat-1</option>
              <option value="catTwo">cat-2</option>
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
          </div>
        }

      {
        isAgent &&   <div className="space-y-1 text-sm ">
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
