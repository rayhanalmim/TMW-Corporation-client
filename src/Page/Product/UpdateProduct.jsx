import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Swal from "sweetalert2";
import useAdmin from "../../Hook/useAdmin";
import useAgent from "../../Hook/useAgent";

const UpdateProduct = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [isAdmin] = useAdmin();
  const [isAgent] = useAgent();  //Dsr

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosSecure.get(`/product/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product data: ", error);
        setError("Error fetching product data");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [axiosSecure, id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <div className="container mx-auto my-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      productName: e.target.productName.value,
      wat: e.target.wat.value,
      productType: e.target.type.value,
      discount: e.target.discount.value,
      productQuantity: parseInt(e.target.productQuantity.value),
      productPrice: parseInt(e.target.productPrice.value) - parseInt(e.target.discount.value),
      perCartonQuantity: parseInt(e.target.perCatonQuantity.value),
      productDescription: e.target.productDescription.value,
    };
    try {
      const updateRes = await axiosSecure.put(`/product/${id}`, formData);

      if (updateRes.data) {
        navigate("/manageProduct");
        Swal.fire({
          text: updateRes.data.message,
          icon: "success",
          position: "top-right",
          timer: 1000,
        });
      } else {
        Swal.fire({
          icon: "error",
          text: updateRes.data.message,
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error updating product: ", error);
    }
  };

  return (
    <div className="w-11/12 mx-auto max-w-4xl p-8 space-y-3 rounded-xl m-5 text-white">
      <h1 className="text-2xl font-bold text-center">Update Product</h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Product Name */}
        <div className="space-y-1 text-sm">
          <label className="block dark-text-gray-400">Product Name</label>
          <input
            type="text"
            name="productName"
            defaultValue={product?.productName}
            className="text-gray-900 w-full px-4 py-3 rounded-md dark-border-gray-700 dark-bg-gray-900 dark-text-gray-100 focus:dark-border-violet-400"
          />
        </div>

        <div className="flex w-full gap-4 flex-col lg:flex-row">

        <div className="space-y-1 text-sm w-full lg:w-1/2">
              <label className="block dark-text-gray-400">Product Type</label>
              <select
              type="text"
              defaultValue={product?.productType}
              name="type"
                className="text-gray-900 w-full px-4 py-2.5 rounded-md dark-border-gray-700 focus:dark-border-violet-400"
              >
                <option value="">Select Type</option>
                <option value="B22">B22</option>
                <option value="E27">E27</option>
                <option value="E14">E14</option>
                <option value="Round">Round</option>
                <option value="Squre">Squre</option>
              </select>
            </div>

          <div className="space-y-1 text-sm w-full lg:w-1/2">
            <label className="block dark-text-gray-400">Wat </label>
            <input
              type="number"
              name="wat"
              defaultValue={product?.wat}
              className="w-full bg-white text-black px-4 py-2.5 rounded-md dark-border-gray-700 focus:dark-border-violet-400"
            />
          </div>

          <div className="space-y-1 text-sm w-full lg:w-1/2">
            <label className="block dark-text-gray-400">Discount (TK)</label>
            <input
              type="number"
              name="discount"
              defaultValue={product?.discount}
              className="w-full bg-white text-black px-4 py-2.5 rounded-md dark-border-gray-700 focus:dark-border-violet-400"
            />
          </div>

        </div>

        {/* Product Quantity and Product Price */}
        {
          isAdmin &&
          <div className="flex w-full gap-4 flex-col lg:flex-row">
            <div className="space-y-1 text-sm w-full lg:w-1/2">
              <label className="block dark-text-gray-400">Product Quantity</label>
              <input
                type="number"
                name="productQuantity"
                defaultValue={product?.productQuantity}
                className="text-gray-900 w-full px-4 py-3 rounded-md dark-border-gray-700 focus:dark-border-violet-400"
              />
            </div>
            <div className="space-y-1 text-sm w-full lg:w-1/2">
              <label className="block dark-text-gray-400">Per Carton Quantity</label>
              <input
                type="number"
                name="perCatonQuantity"
                defaultValue={product?.perCartonQuantity}
                className="text-gray-900 w-full px-4 py-3 rounded-md dark-border-gray-700 focus:dark-border-violet-400"
              />
            </div>


            <div className="space-y-1 text-sm w-full  ">
              <label className="block dark-text-gray-400">Unit Price</label>
              <input
                type="number"
                name="productPrice"
                defaultValue={product?.productPrice}
                className="text-gray-900 w-full px-4 py-3 rounded-md dark-border-gray-700 focus:dark-border-violet-400"
              />
            </div>
          </div>
        }

        {
          isAgent && <div className="flex w-full gap-4 flex-col lg:flex-row">
            <div className="space-y-1 text-sm w-full lg:w-1/2">
              <label className="block dark-text-gray-400">Per Carton Quantity</label>
              <input
                type="number"
                name="perCatonQuantity"
                defaultValue={product?.perCartonQuantity}
                className="text-gray-900 w-full px-4 py-3 rounded-md dark-border-gray-700 focus:dark-border-violet-400"
              />
            </div>


            <div className="space-y-1 text-sm w-full lg:w-1/2">
              <label className="block dark-text-gray-400">Unit Price</label>
              <input
                type="number"
                name="productPrice"
                defaultValue={product?.productPrice}
                className="text-gray-900 w-full px-4 py-3 rounded-md dark-border-gray-700 focus:dark-border-violet-400"
              />
            </div>
          </div>
        }



        {/* Product Description */}
        <div className="space-y-1 text-sm">
          <label className="block dark-text-gray-400">
            Product Description
          </label>
          <textarea
            name="productDescription"
            defaultValue={product?.productDescription}
            className="text-gray-900 w-full px-4 py-3 rounded-md dark-border-gray-700 dark-bg-gray-900 dark-text-gray-100 focus:dark-border-violet-400"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="block w-full p-3 text-center rounded-xl dark-text-gray-900 dark-bg-violet-400 btn btn-primary"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
