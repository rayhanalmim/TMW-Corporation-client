import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const RequestDetails = () => {
    const axiosSecure = useAxiosSecure();
    const [product, setProduct] = useState({});
    const { id } = useParams();

    const { data: dsrReq = [], isLoading: reqLoading, refetch: reqRefetch } = useQuery({
        queryKey: ["dsrReq", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/dsrRequ/findOne?reqId=${id}`)
            setProduct(res.data);
            return res.data;
        }
    })

    return (
        <div className="container mx-auto my-8 text-white  p-2">
            <div className="flex flex-col gap-10 lg:flex-row-reverse w-full">
                <div className="w-full rounded-lg lg:w-1/2">
                    <h1 className="text-center font-semibold text-2xl border-b-2 border-white mb-2">Requested Shop Info: </h1>
                    <p>
                        <span className="font-bold text-teal-300">Shop Name: </span>
                        {product?.shopInfo?.shopName}
                    </p>
                    <p>
                        <span className="font-bold text-teal-300">Shop Area: </span>
                        {product?.shopInfo?.shopArea}
                    </p>
                    <p>
                        <span className="font-bold text-teal-300">Owner name: </span>
                        {product?.shopInfo?.shopOwner}
                    </p>
                    <p>
                        <span className="font-bold text-teal-300">Contract No: </span>
                        +0{product?.shopInfo?.contractNumber}
                    </p>
                </div>
                <div className="w-full lg:w-1/2 lg:ml-8 text-center">
                    <h1 className="text-center font-semibold text-2xl border-b-2 border-white mb-2 ">DSR Info: </h1>
                    <p>
                        <span className="font-bold text-teal-300">DSR Name: </span>
                        {product?.dsrInfo?.displayName}
                    </p>
                    <p>
                        <span className="font-bold text-teal-300">Working Area: </span>
                        {product?.dsrInfo?.ifDsrArea}
                    </p>
                    <p>
                        <span className="font-bold text-teal-300">Contract no: </span>
                        {product?.dsrInfo?.phoneNo}
                    </p>
                </div>
            </div>

            <div className="mt-10">
                <div className="rounded-xl">
                    <div className="text-3xl py-2 ">
                        <h2 className="font-semibold">Requested Products</h2>
                    </div>
                    <div className="flex w-full  "></div>

                    <div className="overflow-x-auto">
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
                                {product?.requestedItems?.map((pro, index) => (
                                    <tr className="border-b-1 border-gray-300" key={index}>
                                        <td className="text-center">{index + 1}</td>

                                        <td>{pro?.product?.productName}</td>
                                        <td className="text-center">{pro?.product?.productQuantity}</td>
                                        <td className="text-center">{pro?.product?.productPrice} </td>
                                        {/* <td className="text-green-500">{product?.ProductCategory}  </td> */}
                                        <td className="text-center">{pro?.product?.lightColor}  </td>
                                        <td className="text-center">{pro?.product?.productType}  </td>
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

export default RequestDetails;