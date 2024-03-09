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
        <h1 className="text-3xl font-semibold">Humayun Traders</h1>
        <p className="text-gray-500">
          Address: Danmohol, College Road, Kendua, Netrokona
        </p>
        <p className="text-gray-500">Contact no: +8801713513659, 01973513659</p>
        <p className="text-gray-500">Date: {data?.date}</p>
      </div>
      <div className="flex justify-between mt-6">
        <div className="pr-4">
          <h2 className="text-xl font-semibold mb-2 w-full">
            Customer Details
          </h2>
          <p>Customer Name: {data?.agetName}</p>
          <p className="flex">
            <span>Customer address:</span>
            <span> {data?.address}</span>
          </p>
          <p className="w-full">Mobile no: {data?.phoneNo}</p>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Invoice Items</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2">Item</th>
                <th className="py-2">Description</th>
                <th className="py-2">Quantity</th>
                <th className="py-2">Price</th>
                <th className="py-2">Total</th>
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
