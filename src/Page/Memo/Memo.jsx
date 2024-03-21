import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useParams } from "react-router-dom";


const Invoice = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: demoData } = useQuery({
    queryKey: ["memoData"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bill/findOne?billId=${id}`);
      return res.data;
    },
  });

  console.log(demoData);


  return (
    <div className="max-w-4xl mx-auto p-6 bg-white  rounded-md relative">

      <div className="w-24 mx-auto block rounded-full  absolute top-5 right-10">
        <img className="" src='https://i.ibb.co/Qrc1Vvq/Black-And-White-Modern-Vintage-Retro-Brand-Logo-3.png' />
      </div>
      <div className="text-center">


        <h1 className="text-3xl text-red-600 font-black font-mono">TMW Corporation</h1>
        {/* <div className="flex justify-end">
          <p className="pr-32 mt-3 font-extrabold">T. Ch. No: </p>
        </div> */}
        <h2 className="text-center py-3 font-semibold">112 south bishil,Mirpur 1, Dhaka, Bangladesh</h2>
        <div>
          <h2 className="text-xl font-semibold">Bill</h2>
          <div className="border-dashed border-2 border-orange-800">
            <h3 className="text-2xl text-blue-800 font-semibold">{demoData?.shopInfo?.shopOwner}</h3>
          </div>
        </div>

        <div className="flex mt-6 font-semibold">
          <div className="w-1/2 flex">
            <div>
              <h3 className="text-start">Bill No : {demoData?.orderNo}</h3>
              {/* <h3>Customer ID: </h3> */}
            </div>
          </div>
          <div className="w-1/2 flex">
            <div >
              <h3>Invoice Date: {demoData?.orderDate}</h3>
              {/* <h3 className="text-start">Order No:</h3> */}
            </div>

          </div>
        </div>
      </div>


      <div className="mt-6">
        <div className="overflow-x-auto">
          <table className="w-full table-auto  border-dotted border-4 border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 border text-center">Product Name</th>
                <th className="py-2 border text-center">Qty</th>
                <th className="py-2 border text-center">Ctn</th>
                <th className="py-2 border text-center">Price</th>
                <th className="py-2 border text-center">Amount</th>
              </tr>
            </thead>
            <tbody>
              {demoData?.requestedItems?.map((product, idx) => (
                <tr key={idx}>
                  <td className="py-2 border-dotted border-4 text-center">{product?.product?.productName}</td>
                  <td className="py-2 border-dotted border-4 text-center">{product?.quantity}</td>
                  <td className="py-2 border-dotted border-4 text-center">{product?.product?.perCartonQuantity}</td>
                  <td className="py-2 border-dotted border-4 text-center">{product?.product?.productPrice}</td>

                  <td className="py-2 border-dotted border-4 text-center">
                    {product?.quantity * product?.product?.productPrice}
                  </td>
                </tr>
              ))}
              {/* Total row */}
              <tr>
                <td className="py-2 border-dotted border-l-white border-y-white border-4"></td>
                <td colSpan="3" className="py-2 border-dotted border-4 font-bold text-center">Total bill:</td>
                <td className="py-2 border-dotted border-4 text-center font-bold">
                  {demoData?.totalPrice}
                </td>
              </tr>
              {
                demoData?.discount > 0 && <tr>
                  <td className="py-2 border-dotted border-l-white border-y-white border-4"></td>
                  <td colSpan="3" className="py-2 border-dotted border-4 font-bold text-center">Discount:</td>
                  <td className="py-2 border-dotted border-4 text-center font-bold">
                    {demoData?.discount}
                  </td>
                </tr>
              }
              {
                demoData?.due > 0 && <tr>
                  <td className="py-2 border-dotted border-l-white border-y-white border-4"></td>
                  <td colSpan="3" className="py-2 border-dotted border-4 font-bold text-center">Due:</td>
                  <td className="py-2 border-dotted border-4 text-center font-bold">
                    {demoData?.discount}
                  </td>
                </tr>
              }

              <tr>
                <td className="py-2 border-dotted border-l-white border-y-white border-4"></td>
                <td colSpan="3" className="py-2 border-dotted border-4 font-bold text-center">Total payable:</td>
                <td className="py-2 border-dotted border-4 text-center font-bold">
                  {demoData?.totalPrice - (parseInt(demoData?.discount) + parseInt(demoData?.discount))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>




      {/* <div className="pl-4 mt-6 border-t border-gray-300">
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
      </div> */}
      <div className="flex justify-between mx-8 mt-24">
        <p className="text-left mt-4 border-t-2 border-dotted">Received by</p>
        <p className="text-left mt-4 border-t-2 border-dotted">TMW Corporation</p>
      </div>


    </div>
  );
};

export default Invoice;
