import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ManageProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/product")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });
  }, []);

  const handleDeleteProduct = (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Send a request to delete the product
        axios
          .delete(`http://localhost:5000/product/${productId}`)
          .then((response) => {
            if (response.status === 200) {
              setProducts((prevProducts) =>
                prevProducts.filter((product) => product._id !== productId)
              );
              Swal.fire(
                "Deleted!",
                "Your product has been deleted.",
                "success"
              );
            } else {
              Swal.fire("Error!", "Failed to delete the product.", "error");
            }
          })
          .catch((error) => {
            console.error("Error deleting product:", error);
            Swal.fire("Error!", "Failed to delete the product.", "error");
          });
      }
    });
  };

  return (
    <div className="bg-base-200 p-0 m-0 lg:p-4 lg:m-4 rounded-xl">
      <div className="text-3xl py-2 ">
        <h2> Manage Product</h2>
      </div>
      <div className="flex w-full  ">
        <Link to="/AddProduct">
          <button className=" btn btn-primary">Add Product</button>
        </Link>
      </div>
      <h4>Total Product: {products?.length}</h4>

      <div className="overflow-x-auto">
        <table className="table">
          <thead className=" text-sm">
            <tr>
              <th>No</th>
              <th>Image</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product, index) => (
              <tr className="border-b-1 border-gray-300" key={index}>
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
                <td>{product?.ProductType}</td>

                <td className="   ">
                  <Link to={`/UpdateProduct/${product?._id}`} className="m-1">
                    <button className="btn btn-warning btn-sm marker: ">
                      Edit
                    </button>
                  </Link>
                  <button
                    className="btn btn-sm btn-error m-1"
                    onClick={() => handleDeleteProduct(product?._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProduct;
