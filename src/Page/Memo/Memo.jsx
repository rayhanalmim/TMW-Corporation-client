import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const Invoice = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data = [] } = useQuery({
    queryKey: ["memo", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/sell/memo?memoId=${id}`);
      return res.data;
    },
  });

  const { data: user } = useQuery({
    queryKey: [data?.email, "user"],
    queryFn: async () => {
      if (data?.agentEmail) {
        const res = await axiosSecure.get(`user/email/${data?.agentEmail}`);
        return res.data;
      }
      return null;
    },
    enabled: !!data?.agentEmail, // Enable the query only if agentEmail is available
  });

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <div className="text-center">
        <h1 className="text-3xl text-red-600 font-black font-mono">TMW Corporation</h1>
        {/* <div className="flex justify-end">
          <p className="pr-32 mt-3 font-extrabold">T. Ch. No: </p>
        </div> */}
        <div>
          <h2 className="text-xl font-semibold">Bill</h2>
          <div className="border-dashed border-2 border-orange-800">
            <h3 className="text-2xl text-blue-800 font-semibold">Zahid Hasan</h3>
          </div>
        </div>

        <div className="flex mt-6 font-semibold">
          <div className="w-1/2 flex">
            <div>
              <h3 className="text-start">Bill No : </h3>
              <h3>Customer ID: </h3>
            </div>
          </div>
          <div className="w-1/2 flex">
            <div >
              <h3>Invoice Date:</h3>
              <h3 className="text-start">Order No:</h3>
            </div>

          </div>
        </div>
      </div>

     
      <div className="mt-6">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2">Product Name</th>
                <th className="py-2">Qty</th>
                <th className="py-2">Ctn</th>
                <th className="py-2">Price</th>
                <th className="py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {data?.purchesProducts?.map((product, idx) => (
                <tr key={idx}>
                  <td className="py-2">Item {idx + 1}</td>
                  <td className="py-2">{product?.productName}</td>
                  <td className="py-2">{product?.quantity}</td>
                  <td className="py-2">{product?.unitPrice}</td>
                  <td className="py-2">
                    {product.unitPrice * product?.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="pl-4 mt-6 border-t border-gray-300">
        <p className="text-right mt-4">Total Amount: {data.totalCost} TK</p>
        <p className="text-right">Total Paid: {data.paid} TK</p>
        {data.dueAmmount > 0 && (
          <p className="text-right">{data?.discount} TK</p>
        )}
        {data.dueAmmount > 0 && (
          <p className="text-right">Due: {data?.dueAmmount} TK</p>
        )}

        {user?.totalDueAmmout > 0 && (
          <p className="text-right">Total Due: {user?.totalDueAmmout} TK</p>
        )}
      </div>
      <p className="text-left mt-4">Received by -----------------</p>
      <div className="text-center mt-6 italic text-gray-600">
        <p>Thank you for your business!</p>
      </div>
    </div>
  );
};

export default Invoice;
