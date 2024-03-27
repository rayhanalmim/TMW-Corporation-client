import { useEffect, useState } from "react";
import useAdminCard from "../../Hook/useAdminCard";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { GrDisabledOutline } from "react-icons/gr";

const RequestPage = () => {
    const axiosSecure = useAxiosSecure();
    const [products, setProducts] = useState([]);
    const [shopData, setShopData] = useState([]);
    const [dsr, setDsr] = useState('');
    const [shop, setShop] = useState('');
    const navigate = useNavigate();

    const { data: dsrData = []} = useQuery({
        queryKey: ["dsr"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/dsrRequ/dsr`)
            return res.data;
        }
    })

    const { adminCard, cardLoading, cardRefetch } = useAdminCard();

    useEffect(() => {
        if (!cardLoading && adminCard) {
            const formattedProducts = adminCard.map((item) => ({
                ID: item._id,
                product: item,
                productQuentity: 1 // Default quantity
            }));
            setProducts(formattedProducts);
        }
    }, [cardLoading, adminCard]);

    const handleQuantityChange = (event, productId) => {
        const newQuantity = parseInt(event.target.value);
        if (!isNaN(newQuantity)) {
            setProducts((prevProducts) =>
                prevProducts.map((item) => {
                    if (item.product._id === productId) {
                        return { ...item, productQuentity: newQuantity };
                    }
                    return item;
                })
            );
        }
    };

    const incrementQuantity = (productId) => {
        setProducts((prevProducts) =>
            prevProducts.map((item) => {
                if (item.product._id === productId) {
                    return { ...item, productQuentity: item.productQuentity + 1 };
                }
                return item;
            })
        );
    };

    const decrementQuantity = (productId) => {
        setProducts((prevProducts) =>
            prevProducts.map((item) => {
                if (item.product._id === productId && item?.productQuentity > 0) {
                    return { ...item, productQuentity: item?.productQuentity - 1 };
                }
                return item;
            })
        );
    };

    const handleDsr = async (e) => {
        setDsr(e.target.value)
        console.log(e.target.value);
        if (e.target.value != "") {
            const res = await axiosSecure.get(`/dsrRequ/shopById?dsrId=${e.target.value}`)
            console.log(res.data);
            setShopData(res.data);
        } else {
            setShopData([]);
        }
    }

    const handleSubmit = async () => {
        console.log("shopID: ", shop, "DSR ID: ", dsr, 'Products: ', products);

        const res = await axiosSecure.post(`/dsrRequ/adminRequest?dsrID=${dsr}&shopId=${shop}`, products);
        console.log(res.data);

        if (res.status == '201') {
            Swal.fire({
                title: "Invite DSR?",
                text: "Please select a valid DSR!",
                icon: "question"
            });
        }
        if (res.status == '202') {
            Swal.fire({
                title: "Invite Shop?",
                text: "Please select a valid Shop!",
                icon: "question"
            });
        }
        if (res.status == 200) {
            cardRefetch();
            navigate('/dsr');
        }

    }


    return (
        <div>
            <div className="relative border-s-8 border-rose-500 ">
                <h2 className="text-6xl font-bold z-20 text-white">Listed Items</h2>
            </div>
            <div className="mt-10">
                <div className="rounded-xl">
                    <div className="text-3xl py-2 ">
                        <h2 className="font-semibold text-lime-500">Requested Products</h2>
                    </div>
                    <div className="flex w-full  "></div>

                    <div className="overflow-x-auto text-white">
                        <table className="table border-2 border-white">
                            <thead className=" text-sm text-center text-white">
                                <tr>
                                    <th>No</th>
                                    <th className="pl-8">Name</th>
                                    <th>Quantity</th>
                                    <th>Unit Price (tk)</th>
                                    <th>Color</th>
                                    <th>Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products?.map((product, index) => (
                                    <tr className="border-b-1 border-gray-300" key={index}>
                                        <td className="text-center">{index + 1}</td>

                                        <td>{product?.product.productName}</td>
                                        <td className="text-center">
                                            <div className="sm:order-1">
                                                <div className="mx-auto flex h-8 items-stretch text-gray-600">
                                                    <button
                                                        onClick={() => decrementQuantity(product?.product._id)}
                                                        className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                                                    >
                                                        -
                                                    </button>
                                                    <input
                                                        type="number"
                                                        value={product?.productQuentity}
                                                        onChange={(e) => handleQuantityChange(e, product?.product._id)}
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
                                                    <button
                                                        onClick={() => incrementQuantity(product?.product._id)}
                                                        className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-center">{product?.product.productPrice} </td>
                                        <td className="text-center">{product?.product.lightColor}  </td>
                                        <td className="text-center">{product?.product.productType}  </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

            <div className="flex gap-3">
                <div className="space-y-1 flex text-sm mt-5">

                    <select
                        onChange={(e) => handleDsr(e)}
                        value={dsr}
                        name="dsr"
                        className="w-full border px-4 py-3 rounded-md focus:dark-border-violet-400"
                    >
                        <option value="">Select DSR</option>
                        {dsrData?.map((dsr) => (
                            <option key={dsr?._id} value={dsr?._id}>
                                {dsr?.displayName}
                            </option>
                        ))}
                    </select>
                </div>

                {
                    shopData.length != 0 &&
                    <div className="space-y-1 flex text-sm mt-5">

                        <select
                            onChange={(e) => setShop(e.target.value)}
                            value={shop}
                            name="shop"
                            className="w-full border px-4 py-3 rounded-md focus:dark-border-violet-400"
                        >
                            <option value="">Select shop</option>
                            {shopData?.map((shop) => (
                                <option key={shop?._id} value={shop?._id}>
                                    {shop?.shopName}
                                </option>
                            ))}
                        </select>
                    </div>
                }
            </div>

            <div className="flex justify-end mt-6">
                <div className="flex gap-4">
                    {
                        adminCard.length === 0 ? <button
                            type="button"
                            className="focus:outline-none text-white bg-gray-600   font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 inline-flex items-center"
                        >
                            Disabled
                            <GrDisabledOutline className="pl-2 pb-1 text-2xl"></GrDisabledOutline>
                        </button> : <button
                            onClick={handleSubmit}
                            type="button"
                            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >
                            Send DSR request
                        </button>
                    }

                </div>
            </div>
        </div>
    );
};

export default RequestPage;
