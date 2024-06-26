import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Title from "../../Components/Shared/Title";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import useAdmin from "../../Hook/useAdmin";
import { FaDeleteLeft } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { TbShoppingCartCheck } from "react-icons/tb";
import { TbShoppingCartOff } from "react-icons/tb";
import useAdminCard from "../../Hook/useAdminCard";


const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const axiosPublic = useAxiosPublic();
  const [isAdmin] = useAdmin();

  const {adminCard, cardLoading, cardRefetch} = useAdminCard();


  const { data: productData = [], isLoading: productLoading, refetch: productRefetch } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const res = await axiosPublic.get('/product')
      setProducts(res.data);
      return res.data;
    }
  })

  const handleFilterChange = (event) => {

    console.log(event);

    if (event === '') {
      productRefetch();
    } else {
      const regex = new RegExp(event, 'i'); 
      const filteredResults = products.filter((product) => regex.test(product.productName));

      filteredResults.sort((a, b) => a.productName.localeCompare(b.productName));

      setProducts(filteredResults);
    }
  };

  const { data: inventory = [], refetch: inventoryRefetch } = useQuery({
    queryKey: ["inventory"],
    queryFn: async () => {
      const res = await axiosPublic.get('/product/inventory')
      return res.data;
    }
  })

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace') {
      handleFilterChange(e.target.value);
      productRefetch();
    }
  };

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

  const addToCard = async(productId) =>{
      const res = await axiosPublic.put(`/card/addToAdminCard?productId=${productId}`);
      console.log(res);
      if(res.data){
        Swal.fire({
          position: "top-start",
          icon: "success",
          title: "Added In Card",
          showConfirmButton: false,
          timer: 1500
        });
        productRefetch();
        cardRefetch();
      }
  }

  const removeToCard = async(productId) =>{
      const res = await axiosPublic.put(`/card/removeToAdminCard?productId=${productId}`);
      console.log(res);
      if(res.data){
        Swal.fire({
          position: "top-start",
          icon: "success",
          title: "Removed From Card",
          showConfirmButton: false,
          timer: 1500
        });
        productRefetch();
        cardRefetch();
      }
  }

  return (
    <div className="bg-base-200 p-0 m-0 lg:p-4 lg:m-4 rounded-xl">
      <div className="text-3xl py-2 ">
        <Title title="Manage Product"></Title>
      </div>
      <div className="flex w-full  ">
        <Link to="/AddProduct">
          <button className=" btn btn-sm md:btn-md ml-3 lg:ml-0 mb-2 btn-primary">Add Product</button>
        </Link>
      </div>

      <input
        type="text"
        placeholder="Search by product name"
        onChange={(e) => handleFilterChange(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
        className="w-1/2 mx-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 transition duration-300"
      />


      <div className="overflow-x-auto my-4">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border">Inventory</th>
              <th className="py-2 px-4 border">QUANTITY</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border font-bold">Total item of products</td>
              <td className="py-2 px-4 border">{products?.length}</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border font-bold">Gross product in stock</td>
              <td className="py-2 px-4 border">{inventory?.totalItemInStock}</td>
            </tr>
            {
              isAdmin && <tr>
              <td className="py-2 px-4 border font-bold">Net value of products</td>
              <td className="py-2 px-4 border">{inventory?.totalAmountOProduct} BDT</td>
            </tr>
            }
            
          </tbody>
        </table>
      </div>



      <div className="overflow-x-auto">
        <table className="table border-2 border-gray-700 rounded-xl">
          <thead className="text-sm">
            <tr>
              <th>No</th>
              <th>Image</th>
              <th className="text-center">Name</th>
              <th>Quantity</th>
              <th>Price</th>
              {/* <th>Category</th> */}
              <th>Color</th>
              <th>Type</th>
              <th>Action</th>
              <th>To Card</th>

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


                <div className="flex justify-center items-center mt-3">
                  <Link to={`/product/${product?._id}`} className="">
                    <td><span className="text-blue-800 font-semibold hover:text-rose-500">{product?.productName}</span></td>
                  </Link>
                </div>

                <td>{product?.productQuantity}</td>
                <td>{product?.productPrice} </td>
                {/* <td className="text-green-500">{product?.ProductCategory}  </td> */}
                <td className="">{product?.lightColor}  </td>
                <td className="">{product?.productType}  </td>


                <td className="   ">
                  <MdDeleteForever  className="text-3xl m-1 cursor-pointer"
                    onClick={() => handleDeleteProduct(product?._id)}></MdDeleteForever>
                </td>
                {
                  product?.isAddedInCard ?  <td className="flex justify-center">
                  <TbShoppingCartOff  className="text-2xl m-1 cursor-pointer text-red-700"
                    onClick={() => removeToCard(product?._id)}></TbShoppingCartOff>
                </td> :  <td className="flex justify-center">
                  <TbShoppingCartCheck  className="text-2xl m-1 cursor-pointer"
                    onClick={() => addToCard(product?._id)}></TbShoppingCartCheck>
                </td>
                }
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProduct;
