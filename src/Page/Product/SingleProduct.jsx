import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const SingleProduct = () => {
  const axiosSecure = useAxiosSecure();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

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


  return (
    <div className="container mx-auto my-8 text-white  p-2">
      <div className="flex flex-col lg:flex-row-reverse w-full">
        <div className="w-full rounded-lg lg:w-1/2">
          <img
            src={product?.imageURL}
            alt={product?.productName}
            className="w-64 mt-5 rounded-lg mx-auto"
          />
        </div>
        <div className="w-full lg:w-1/2 text-left mt-4 lg:ml-8">
          <p className="text-xl font-bold mb-4">Product Info: </p>
          <p>
            <span className="font-bold text-teal-300">Name: </span>
            {product?.productName}
          </p>
          <p>
            <span className="font-bold text-teal-300">Product Category: </span>
            {product?.ProductCategory}
          </p>
          <p>
            <span className="font-bold text-teal-300">WAT: </span>
            {product?.wat}
          </p>
          <p>
            <span className="font-bold text-teal-300">Product Type: </span>
            {product?.productType}
          </p>
          <p>
            <span className="font-bold text-teal-300">Light Color: </span>
            {product?.lightColor}
          </p>
          <p>
            <span className="font-bold text-teal-300">Per Carton Quantity: </span>
            {product?.perCartonQuantity}
          </p>
          <p>
            <span className="font-bold text-teal-300">Orginal Price: </span>
            {product?.orginalPrice} TK
          </p>{" "}
          <p>
            <span className="font-bold text-teal-300">Current Price: </span>
            {product?.productPrice} TK
          </p>{" "}
          <p>
            <span className="font-bold text-teal-300">Product Quantity: </span>
            {product?.productQuantity}
          </p>{" "}
          <p>
            <span className="font-bold text-teal-300">Discount: </span>
            {product?.discount}
          </p>{" "}

          <p>
            <span className="font-bold text-teal-300">
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
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {product?.sellCollections?.map((product, index) => (
                  <tr className="  border-gray-300" key={index}>
                    <td>{product?.date}</td>
                    <td>{product?.to?.shopName}</td> 
                    <td>{product?.quantity}</td>
                    <td>{product?.via?.displayName}</td> 
                    <td>{parseInt(product?.quantity) * parseInt(product?.unitPrice)}</td> 
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
