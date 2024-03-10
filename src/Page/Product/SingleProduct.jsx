import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../../Hook/useAxiosSecure";

import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";

const SingleProduct = () => {
  const axiosSecure = useAxiosSecure();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { user } = useContext(AuthContext);
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

  const handleClick = async (product) => {
    const res = await axiosSecure.post(
      `/card?userEmail=${user.email}`,
      product
    );

    if (res.status == 200 || res.status == 201) {
      Swal.fire({
        title: "Success",
        text: "Congratulations! your product added successfully",
        icon: "success",
      });
    }
    if (res.status == 202) {
      Swal.fire({
        title: "Error",
        text: "Item Already added!",
        icon: "error",
      });
    }
  };

  return (
    <div className="container mx-auto my-8 text-white  p-2">
      <div className="flex flex-col lg:flex-row w-full">
        <div className="w-full rounded-lg lg:w-1/2">
          <img
            src={product?.imageURL}
            alt={product?.productName}
            className="w-64 rounded-lg mx-auto"
          />
        </div>
        <div className="w-full lg:w-1/2 text-left mt-4 lg:ml-8">
          <p className="text-xl font-bold mb-4">Product Info: </p>
          <p>
            <span className="font-bold text-blue-500">Name: </span>
            {product?.productName}
          </p>
          <p>
            <span className="font-bold text-blue-500">Product Category: </span>
            {product?.ProductCategory}
          </p>
          <p>
            <span className="font-bold text-blue-500">WAT: </span>
            {product?.wat}
          </p>
          <p>
            <span className="font-bold text-blue-500">Product Type: </span>
            {product?.productType}
          </p>
          <p>
            <span className="font-bold text-blue-500">Light Color: </span>
            {product?.lightColor}
          </p>
          <p>
            <span className="font-bold text-blue-500">Per Carton Quantity: </span>
            {product?.perCartonQuantity}
          </p>
          <p>
            <span className="font-bold text-blue-500">Unit Price: </span>
            {product?.productPrice} TK
          </p>{" "}
          <p>
            <span className="font-bold text-blue-500">Product Quantity: </span>
            {product?.productQuantity}
          </p>{" "}
          <p>
            <span className="font-bold text-blue-500">Discount: </span>
            {product?.discount}
          </p>{" "}

          <p>
            <span className="font-bold text-blue-500">
              Product Description:{" "}
            </span>
            {product?.productDescription}
          </p>
          <div className="flex gap-4 mt-4">


            <Link to={`/UpdateProduct/${product?._id}`} >
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Update Product
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div className="rounded-xl">
          <div className="text-3xl py-2 ">
            <h2 className="font-semibold">Sell History</h2>
          </div>
          <div className="flex w-full  "></div>

          <div className="overflow-x-auto">
            <table className="table">
              <thead className=" text-sm text-white">
                <tr>
                  <th>Date</th>
                  <th>To</th>
                  <th>Quentity</th>
                  <th>via</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {product?.purchesProductCollection?.map((product, index) => (
                  <tr className="  border-gray-300" key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={product?.imageURL} alt="Product Image" />
                          </div>
                        </div>
                      </div>
                    </td>
                    <Link
                      className="text-blue-800 font-bold"
                      to={`/product/${product?._id}`}
                    >
                      <td>{product?.productName}</td>
                    </Link>

                    <td>{product?.productQuantity}</td>
                    <td>{product?.productPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
