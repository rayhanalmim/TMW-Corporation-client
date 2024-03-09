import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Title from "../../Components/Shared/Title";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hook/useAxiosPublic";

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axios
      .get("https://tmw-corpo-server.vercel.app/product")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });
  }, []);

  const { data: inventory = [], isLoading: inventoryLoading, refetch: inventoryRefetch } = useQuery({
    queryKey: ["inventory"],
    queryFn: async () => {
      const res = await axiosPublic.get('/product/inventory')
      return res.data;
    }
  })

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
          .delete(`https://tmw-corpo-server.vercel.app/product/${productId}`)
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
              inventoryRefetch();
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
        <Title title="Manage Product"></Title>
      </div>
      <div className="flex w-full  ">
        <Link to="/AddProduct">
          <button className=" btn btn-primary">Add Product</button>
        </Link>
      </div>

      <div className="overflow-x-auto my-4">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border">Inventory</th>
              <th className="py-2 px-4 border">QUENTITY</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border font-bold">Total Product</td>
              <td className="py-2 px-4 border">{products?.length}</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border font-bold">Total product in stock</td>
              <td className="py-2 px-4 border">{inventory?.totalItemInStock}</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border font-bold">Total amount of product</td>
              <td className="py-2 px-4 border">{inventory?.totalAmountOProduct} BDT</td>
            </tr>
          </tbody>
        </table>
      </div>



      <div className="overflow-x-auto">
        <table className="table border-2 border-gray-700 rounded-xl">
          <thead className=" text-sm">
            <tr>
              <th>No</th>
              <th>Image</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Unit Price (tk)</th>
              <th>Category</th>
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

                <td>{product?.productName}</td>

                <td>{product?.productQuantity}</td>
                <td>{product?.productPrice} </td>
                <td className="text-green-500">{product?.ProductCategory}  </td>


                <td className="   ">
                  <Link to={`/product/${product?._id}`} className="m-1">
                    <button className="btn btn-warning btn-sm marker: ">
                      Details
                    </button>
                  </Link>
                  {/* <Link to={`/UpdateProduct/${product?._id}`} className="m-1">
                    <button className="btn btn-warning btn-sm marker: ">
                      Edit
                    </button>
                  </Link> */}
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
