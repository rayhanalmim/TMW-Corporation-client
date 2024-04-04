import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const UpdateShop = () => {
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },

    } = useForm();

    const { data: shop = [], isLoading: shopLoading, refetch: shopRefetch } = useQuery({
        queryKey: ["shop", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/money/singleShop?id=${id}`)
            return res.data;
        }
    })

    const onSubmit = async (data) => {

        const shopData = {
            shopName: data.shopName,
            shopArea: data.shopArea,
            shopOwner: data.shopOwner,
            contractNumber: data.contractNumber,
            totalBuyAmout: parseInt(data.totalBuyAmout),
            totalPay: parseInt(data.totalPay),
            totalDue: parseInt(data.totalDue),
        }
        console.log(shopData);
        try {

            const res = await axiosSecure.put(`/money/updateShop?id=${id}`, shopData);

            console.log(res.data);

            if (res.data.insertedId === null) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Error Already Register!",
                    position: "top-right",
                });
            } else {
                Swal.fire({
                    title: "Shop Updated Success!",
                    text: "Thanks You!",
                    icon: "success",
                    position: "top-right",
                    timer: 1500,
                });
                shopRefetch()
                navigate("/shop");
            }
        } catch (error) {
            console.error("Error adding property:", error);
        }
    };

    return (
        <div>
            <div className="rounded-xl text-white p-8 ">
                <h3 className="font-bold text-2xl md:text-4xl pb-4">Update Shop</h3>
                <form className="space-y-6 " onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex w-full gap-4 flex-col lg:flex-row">
                        <div className="space-y-1 text-sm w-full lg:w-1/2">
                            <label className="block dark-text-gray-400">Shop Name</label>
                            <input
                                {...register("shopName", {
                                    required: "Shop Name is required",
                                })}
                                defaultValue={shop?.shopName}
                                type="text"
                                className="text-gray-900 w-full px-4 py-3 rounded-md dark-border-gray-700 focus:dark-border-violet-400"
                            />
                            {errors.shopName && (
                                <p className="text-red-500">{errors.shopName.message}</p>
                            )}
                        </div>
                        <div className="space-y-1 text-sm w-full lg:w-1/2">
                            <label className="block dark-text-gray-400">Shop Area</label>
                            <input
                                {...register("shopArea", {
                                    required: "Shop Area is required",
                                })}
                                defaultValue={shop?.shopArea}
                                type="test"
                                className="text-gray-900 w-full px-4 py-3 rounded-md dark-border-gray-700 focus:dark-border-violet-400"
                            />
                            {errors.shopArea && (
                                <p className="text-red-500">{errors.shopArea.message}</p>
                            )}
                        </div>

                    </div>



                    <div className="flex w-full gap-4 flex-col lg:flex-row">
                        <div className="space-y-1 text-sm w-full lg:w-1/2">
                            <label className="block dark-text-gray-400">Shop Owner Name</label>
                            <input
                                {...register("shopOwner", {
                                    required: "Shop Owner Name is required",
                                })}
                                defaultValue={shop?.shopOwner}
                                type="text"
                                className="text-gray-900 w-full px-4 py-3 rounded-md dark-border-gray-700 focus:dark-border-violet-400"
                            />
                            {errors.shopOwner && (
                                <p className="text-red-500">{errors.shopOwner.message}</p>
                            )}
                        </div>
                        <div className="space-y-1 text-sm w-full lg:w-1/2">
                            <label className="block dark-text-gray-400">Contract Number</label>

                            <label className="input text-black  flex items-center gap-2">
                                +880
                                <input
                                    {...register("contractNumber", {
                                        required: "Contract Number is required",
                                    })}
                                    defaultValue={shop?.contractNumber}
                                    type="text"
                                    pattern="[0-9]{10}"
                                    placeholder="1764848007"
                                    className="text-gray-900 w-full px-3 py-3 rounded-md dark-border-gray-700 focus:dark-border-violet-400"
                                />
                            </label>

                            {errors.contractNumber && (
                                <p className="text-red-500">{errors.contractNumber.message}</p>
                            )}
                        </div>



                    </div>


                    <div className="flex w-full gap-4 flex-col lg:flex-row">
                        {/* Product Type */}
                        <div className="space-y-1 text-sm w-full lg:w-1/2">
                            <label className="block dark-text-gray-400">Total purchase</label>
                            <input
                                {...register("totalBuyAmout",
                                )}
                                type="number"
                                defaultValue={shop?.totalBuyAmout}
                                className="w-full bg-white text-black px-4 py-2.5 rounded-md dark-border-gray-700 focus:dark-border-violet-400"
                            />

                            {errors.totalBuyAmout && (
                                <p className="text-red-500">{errors.totalBuyAmout.message}</p>
                            )}
                        </div>

                        {/* Wat */}
                        <div className="space-y-1 text-sm w-full lg:w-1/2">
                            <label className="block dark-text-gray-400">Total Payment</label>
                            <input
                                {...register("totalPay",
                                )}
                                type="number"
                                defaultValue={shop?.totalPay}
                                className="w-full bg-white text-black px-4 py-2.5 rounded-md dark-border-gray-700 focus:dark-border-violet-400"
                            />
                            {errors.totalPay && (
                                <p className="text-red-500">{errors.totalPay.message}</p>
                            )}
                        </div>

                        {/* Discount */}
                        <div className="space-y-1 text-sm w-full lg:w-1/2">
                            <label className="block dark-text-gray-400">Total Due</label>
                            <input
                                {...register("totalDue",
                                )}
                                type="number"
                                defaultValue={shop?.totalDue}
                                className="w-full bg-white text-black px-4 py-2.5 rounded-md dark-border-gray-700 focus:dark-border-violet-400"
                            />
                             {errors.totalDue && (
                                <p className="text-red-500">{errors.totalDue.message}</p>
                            )}
                        </div>
                    </div>

                    {/* ... (other form fields) ... */}

                    <div className="flex gap-2 items-end justify-end">
                        <button
                            type="submit"
                            className="block p-3 btn-success  text-white text-center rounded-xl dark-text-gray-900 dark-bg-violet-400 btn btn-1"
                        >
                            Update Shop
                        </button>
                        <Link to="/shop">
                            <button type="button" className="btn btn-error text-white">
                                Close
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateShop;