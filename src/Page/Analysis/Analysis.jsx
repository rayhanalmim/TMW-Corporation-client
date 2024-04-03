import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Marquee from "react-fast-marquee";


const Analysis = () => {
  const axiosSecure = useAxiosSecure();

  const { data: sellData = {} } = useQuery({
    queryKey: ["sellInfo"],
    queryFn: async () => {
      const res = await axiosSecure.get("/sell/allSell");
      return res.data;
    },
  });

  const { totalSellAmount, monthlySellAmount, yearlySellAmount, dailySellAmmount } = sellData;

  const formatMonth = (monthString) => {
    const date = new Date(monthString);
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${month} ${year}`;
  };

  const formatDateForDaily = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  // Calculate monthly sell data only if monthlySellAmount is defined
  const monthlySellData = monthlySellAmount
    ? monthlySellAmount.map((monthData) => ({
      month: monthData.month,
      totalAmmount: monthData.totalAmmount,
    }))
    : [];

  // Calculate each month's sell value
  for (let i = 1; i < monthlySellData.length; i++) {
    monthlySellData[i].totalAmmount -= monthlySellData[i - 1].totalAmmount;
  }

  return (
    <div className="p-4 text-gray-800 bg-gradient-to-r from-sky-700 via-indigo-600 to-blue-600 rounded-lg shadow-md relative">

      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-full  opacity-80 z-0"></div>
        <div className="relative z-10">
          <Marquee speed={100}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-4">Sales Overview</h2>
          </Marquee>
        </div>
      </div>


      <div className="absolute right-0 top-0">
      </div>

      <hr className="mb-6" />

      <div className="mb-8 border p-4">
        <div className="flex justify-center">
          <div className="flex  mb-2 relative">
            <h3 className="text-2xl font-bold text-white ml-8">Displays the total amount of sales </h3>
            <div className="absolute -left-2 -top-1 bg-rose-400 w-8 h-8 rounded-full animate-ping"></div>
            <div className="absolute -left-2 -top-1 bg-rose-400 w-8 h-8 rounded-full animate-pulse"></div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse w-full">
            <tbody>
              <tr className="bg-white">
                <td className="border font-semibold px-4 py-2">Total Sales</td>
                <td className="border font-semibold px-4 py-2">{totalSellAmount}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
    <div className="mb-8 border p-4">
        <div className="flex justify-center">
          <div className="flex  mb-2 relative">
            <h3 className="text-2xl font-bold text-white ml-8">Provides a breakdown of sales on a daily basist</h3>
            <div className="absolute -left-2 -top-1 bg-blue-400 w-8 h-8 rounded-full animate-ping"></div>
            <div className="absolute -left-2 -top-1 bg-blue-400 w-8 h-8 rounded-full animate-pulse"></div>
          </div>
        </div>


        <div className="overflow-x-auto">
          <table className="table-auto border-collapse w-full">
            <thead>
              <tr className="bg-white">
                <th className="border px-4 py-2">Transaction Date</th>
                <th className="border px-4 py-2">Sales Amount</th>
              </tr>
            </thead>
            <tbody>
              {dailySellAmmount?.slice(0, 30).reverse().map((dayData, index) => (
                <tr key={dayData.day}>
                  <td className={`border font-semibold  px-4 py-2 ${index % 2 !== 0 ? 'bg-white' : 'text-gray-200'}`}>{formatDateForDaily(dayData.day)}</td>
                  <td className={`border font-semibold px-4 py-2 ${index % 2 !== 0 ? 'bg-white' : 'text-gray-200'}`}>{dayData.totalAmmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      <div className="mb-8 border p-4">
        <div className="flex justify-center">
          <div className="flex  mb-2 relative">
            <h3 className="text-2xl font-bold text-white ml-8">Shows the sales amount for each month</h3>
            <div className="absolute -left-2 -top-1 bg-yellow-400 w-8 h-8 rounded-full animate-ping"></div>
            <div className="absolute -left-2 -top-1 bg-yellow-400 w-8 h-8 rounded-full animate-pulse"></div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table-auto border-collapse w-full">
            <thead>
              <tr className="bg-white">
                <th className="border px-4 py-2">Transaction Month</th>
                <th className="border px-4 py-2">Sales Amount</th>
              </tr>
            </thead>
            <tbody>
              {monthlySellData.map((monthData, index) => (
                <tr key={monthData.month}>
                  <td className={`border px-4 py-2 ${index % 2 !== 0 ? 'bg-white' : 'text-gray-200'}`}>{formatMonth(monthData.month)}</td>
                  <td className={`border px-4 py-2 ${index % 2 !== 0 ? 'bg-white' : 'text-gray-200'}`}>{monthData.totalAmmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>


      <div className="mb-8 border p-4">
        <div className="flex justify-center">
          <div className="flex  mb-2 relative">
            <h3 className="text-2xl font-bold text-white ml-8">Presents the total sales amount for each year</h3>
            <div className="absolute -left-2 -top-1 bg-green-400 w-8 h-8 rounded-full animate-ping"></div>
            <div className="absolute -left-2 -top-1 bg-green-400 w-8 h-8 rounded-full animate-pulse"></div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse w-full">
            <thead>
              <tr className="bg-white">
                <th className="border px-4 py-2">Transaction Year</th>
                <th className="border px-4 py-2">Sales Amount</th>
              </tr>
            </thead>
            <tbody>
              {yearlySellAmount?.map((yearData, index) => (
                <tr key={yearData.year}>
                  <td className={`border px-4 py-2 ${index % 2 !== 0 ? 'bg-white' : 'text-gray-200'}`}>{yearData.year}</td>
                  <td className={`border px-4 py-2 ${index % 2 !== 0 ? 'bg-white' : 'text-gray-200'}`}>{yearData.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


    </div>
  );
};

export default Analysis;
