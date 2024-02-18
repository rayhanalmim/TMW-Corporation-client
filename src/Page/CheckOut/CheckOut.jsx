import React, { useState } from "react";
import useGetCardData from "../../Hook/useGetCardata";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
const CheckOut = () => {
  const axiosSecure = useAxiosSecure();
  const { data: user = [], refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosSecure.get("/user", {});

      return res.data;
    },
  });

  const { product, productLoading } = useGetCardData();

  if (productLoading) {
    return <h3>loading</h3>;
  }

  const [products, setProducts] = useState(
    product.cardItems.map((item) => ({ ...item, quantity: 1 }))
  );

  // Function to handle quantity change for a specific product
  const handleQuantityChange = (event, productId) => {
    const newQuantity = parseInt(event.target.value);
    if (!isNaN(newQuantity)) {
      // Update quantity for the specific product
      setProducts((prevProducts) =>
        prevProducts.map((item) => {
          if (item._id === productId) {
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
      );
    }
  };

  // Function to increment quantity for a specific product
  const incrementQuantity = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((item) => {
        if (item._id === productId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    );
  };

  // Function to decrement quantity for a specific product
  const decrementQuantity = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((item) => {
        if (item._id === productId && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
    );
  };

  // Function to delete a product
  const deleteProduct = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((item) => item._id !== productId)
    );
  };

  // Function to handle checkout
  const handleCheckout = () => {
    // Log item ID with quantity
    products.forEach((item) => {
      console.log(`Item ID: ${item._id}, Quantity: ${item.quantity}`);
    });
  };

  // Calculate subtotal
  const subtotal = products.reduce(
    (total, item) => total + item.quantity * parseFloat(item.productPrice),
    0
  );

  return (
    <div>
      <section className="h-screen mb-28 py-12 sm:py-16 lg:pb-20 lg:pt-9">
        <p className="text-white">total user {user?.length}</p>
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-semibold text-white">
              Confirm Purchase
            </h1>
          </div>
          <div className="mx-auto mt-8 max-w-2xl md:mt-12">
            <div className="bg-white shadow">
              <div className="px-4 py-6 sm:px-8 sm:py-10">
                <div className="flow-root">
                  <ul className="-my-8">
                    {products.map((item) => (
                      <li
                        key={item._id}
                        className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0"
                      >
                        <div className="shrink-0">
                          <img
                            className="h-24 w-24 max-w-full rounded-lg object-cover"
                            src={item.imageURL}
                            alt={item.productName}
                          />
                        </div>

                        <div className="relative flex flex-1 flex-col justify-between">
                          <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                            <div className="pr-8 sm:pr-5">
                              <p className="text-base font-semibold text-gray-900">
                                {item.productName}
                              </p>
                              <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">
                                {item.productDescription}
                              </p>
                            </div>

                            <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                              <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                                $
                                {(
                                  item.quantity * parseFloat(item.productPrice)
                                ).toFixed(2)}
                              </p>

                              <div className="sm:order-1">
                                <div className="mx-auto flex h-8 items-stretch text-gray-600">
                                  {/* Decrement Button */}
                                  <button
                                    onClick={() => decrementQuantity(item._id)}
                                    className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                                  >
                                    -
                                  </button>
                                  {/* Input field for quantity */}
                                  <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) =>
                                      handleQuantityChange(e, item._id)
                                    }
                                    className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase"
                                    style={{
                                      "-moz-appearance": "textfield",
                                      appearance: "textfield",
                                      width: "100%",
                                      border: "none",
                                      outline: "none",
                                      resize: "none",
                                      padding: "0",
                                      textAlign: "center",
                                    }}
                                  />
                                  {/* Increment Button */}
                                  <button
                                    onClick={() => incrementQuantity(item._id)}
                                    className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                            <button
                              type="button"
                              onClick={() => deleteProduct(item._id)}
                              className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900"
                            >
                              <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 border-t border-b py-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400">Subtotal</p>
                    <p className="text-lg font-semibold text-gray-900">
                      ${subtotal.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400">Shipping</p>
                    <p className="text-lg font-semibold text-gray-900">$8.00</p>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Total</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    <span className="text-xs font-normal text-gray-400">
                      USD
                    </span>{" "}
                    {(subtotal + 8).toFixed(2)}
                  </p>
                </div>

                <div className="mt-6 text-center">
                  <button
                    type="button"
                    onClick={handleCheckout}
                    className="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                  >
                    Checkout
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CheckOut;
