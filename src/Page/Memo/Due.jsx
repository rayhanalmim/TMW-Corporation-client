import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hook/useAxiosSecure";


const Due = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    let totalQty = 0;
    let totalCtn = 0;
    



    const { data: data = [], isLoading: reqLoading, refetch } = useQuery({
        queryKey: ["memo", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/dsrRequ/findOne?reqId=${id}`)
            return res.data;
        }
    })
    


    const { data: allData = [] } = useQuery({
        queryKey: ["allrequ", id],
        queryFn: async () => {
            const response = await axiosSecure.get("/dsrRequ");
            return response.data;
        }
    })
   
    const res = data.requestedItems?.map((item)=>{
        totalCtn = totalCtn + item.product.perCartonQuantity;
        totalQty = totalQty + item.productQuentity;
    })

    console.log(allData.length);



    return (
        <div className="max-w-2xl mx-auto p-6 bg-white  rounded-md">
            <div className="text-center">
                <h1 className="text-2xl text-red-600 font-black">TMW Corporation</h1>
                {/* <div className="flex justify-end">
          <p className="pr-32 mt-3 font-extrabold">T. Ch. No: </p>
        </div> */}
                <div>
                        <h3 className="text-xl font-semibold">{data?.shopInfo?.shopName}</h3>
                   
                </div>
                <h3 className="text-start font-semibold">Owner Name : <span className="text-rose-600">{data?.shopInfo?.shopOwner}</span> </h3>
                <div className="flex mt-4 font-semibold">
                    <div className="w-1/2 flex">
                        <div>
                            <h3 className="text-start">Do No : {data?.orderNo} </h3>
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
                                <td colSpan="1" className="py-2 border-dotted border-4 font-bold text-center">Total Qty & Ctn</td>
                                <td  className="py-2 border-dotted border-4 text-center font-bold">
                                    {totalQty}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>



            <div className="grid grid-cols-3 justify-items-center mt-16">
            <p className="text-left mt-4 border-t-2 border-dotted">Receiver <br /> Signature</p>
            <p className="text-left mt-4 border-t-2 border-dotted">Prepared By <br /> Signature</p>
            <p className="text-left mt-4 border-t-2 border-dotted">Checking <br /> Signature</p>
            </div>
           
        </div>
    );
};

export default Due;