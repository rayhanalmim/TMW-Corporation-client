import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hook/useAxiosSecure";


const Due = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    let totalQty = 0;
    let totalCtn = 0;

    // const { data = [] } = useQuery({
    //   queryKey: ["memo", id],
    //   queryFn: async () => {
    //     const res = await axiosSecure.get(`/sell/memo?memoId=${id}`);
    //     return res.data;
    //   },
    // });

    const { data: data = [], isLoading: reqLoading, refetch: reqRefetch } = useQuery({
        queryKey: ["memo", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/dsrRequ/findOne?reqId=${id}`)
            return res.data;
        }
    })

    const res = data.requestedItems?.map((item)=>{
        totalCtn = totalCtn + item.product.perCartonQuantity;
        totalQty = totalQty + item.productQuentity;
    })

    console.log(data);



    return (
        <div className="max-w-2xl mx-auto p-6 bg-white  rounded-md">
            <div className="text-center">
                <h1 className="text-3xl text-red-600 font-black font-mono">TMW Corporation</h1>
                {/* <div className="flex justify-end">
          <p className="pr-32 mt-3 font-extrabold">T. Ch. No: </p>
        </div> */}
                <div>
                        <h3 className="text-xl font-semibold">{data?.shopInfo?.shopOwner}</h3>
                   
                </div>
                <h3 className="text-start font-semibold">Store Name : <span className="text-rose-600">{data?.shopInfo?.shopName}</span> </h3>
                <div className="flex mt-4 font-semibold">
                    <div className="w-1/2 flex">
                        <div>
                            <h3 className="text-start">Do No : {data?.length} </h3>
                        </div>
                    </div>
                    <div className="w-1/2 flex">
                        <div >
                            <h3>Do Date: {data?.orderDate}</h3>
                        </div>

                    </div>
                </div>
            </div>


            <div className="mt-6">
                <div className="overflow-x-auto">
                    <table className="w-full table-auto  border-dotted border-4 border-collapse">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="py-2 border text-center">No</th>
                                <th className="py-2 border text-center">Product Name</th>
                                <th className="py-2 border text-center">Qty</th>
                                <th className="py-2 border text-center">Ctn</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.requestedItems?.map((items, idx) => (
                                <tr key={idx}>
                                    <td className="py-2 border-dotted border-4 text-center">{idx + 1}</td>
                                    <td className="py-2 border-dotted border-4 text-center">{items?.product?.productName}</td>
                                    <td className="py-2 border-dotted border-4 text-center">{items?.productQuentity}</td>
                                    <td className="py-2 border-dotted border-4 text-center">{items?.product?.perCartonQuantity}</td>
                                </tr>
                            ))}
                            {/* Total row */}
                            <tr>
                                <td className="py-2 border-dotted border-l-white border-y-white border-4"></td>
                                <td colSpan="1" className="py-2 border-dotted border-4 font-bold text-center">Total:</td>
                                <td className="py-2 border-dotted border-4 text-center font-bold">
                                    {totalQty}
                                </td>
                                <td className="py-2 border-dotted border-4 text-center font-bold">
                                    {totalCtn}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>



            <p className="text-left mt-4">Received by -----------------</p>
            <div className="text-center mt-6 italic text-gray-600">
                <p>Thank you for your business!</p>
            </div>
        </div>
    );
};

export default Due;