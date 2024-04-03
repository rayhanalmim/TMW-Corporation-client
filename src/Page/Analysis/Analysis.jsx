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
    <div className="p-4 text-gray-800 bg-gradient-to-r from-sky-600 via-indigo-500 to-blue-500 rounded-lg shadow-md relative">
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-full  opacity-80 z-0"></div>
        <div className="relative z-10">
          <Marquee speed={100}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-4">Sell History</h2>
          </Marquee>
        </div>
      </div>


      <div className="absolute right-0 top-0">
      </div>

      <hr className="mb-6" />

      <div className="mb-8">
        <div className="flex justify-center">
          <div className="flex  mb-2 relative">
            <h3 className="text-2xl font-bold text-gray-800 ml-8">Total Sell Amount:</h3>
            <div className="absolute -left-2 -top-1 bg-rose-400 w-8 h-8 rounded-full animate-ping"></div>
            <div className="absolute -left-2 -top-1 bg-rose-400 w-8 h-8 rounded-full animate-pulse"></div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse w-full">
            <tbody>
              <tr className="bg-white">
                <td className="border px-4 py-2">Total</td>
                <td className="border px-4 py-2">{totalSellAmount}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-center">
          <div className="flex  mb-2 relative">
            <h3 className="text-2xl font-bold text-gray-800 ml-8">Daily Sell Amount:</h3>
            <div className="absolute -left-2 -top-1 bg-blue-400 w-8 h-8 rounded-full animate-ping"></div>
            <div className="absolute -left-2 -top-1 bg-blue-400 w-8 h-8 rounded-full animate-pulse"></div>
          </div>
        </div>


        <div className="overflow-x-auto">
          <table className="table-auto border-collapse w-full">
            <thead>
              <tr className="bg-white">
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {dailySellAmmount?.slice(0, 30).reverse().map((dayData, index) => (
                <tr key={dayData.day}>
                  <td className={`border px-4 py-2 ${index % 2 !== 0 ? 'bg-white' : 'text-gray-200'}`}>{formatDateForDaily(dayData.day)}</td>
                  <td className={`border px-4 py-2 ${index % 2 !== 0 ? 'bg-white' : 'text-gray-200'}`}>{dayData.totalAmmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      <div className="mb-8 ">
        <div className="flex justify-center">
          <div className="flex  mb-2 relative">
            <h3 className="text-2xl font-bold text-gray-800 ml-8">Monthly Sell Amount</h3>
            <div className="absolute -left-2 -top-1 bg-yellow-400 w-8 h-8 rounded-full animate-ping"></div>
            <div className="absolute -left-2 -top-1 bg-yellow-400 w-8 h-8 rounded-full animate-pulse"></div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table-auto border-collapse w-full">
            <thead>
              <tr className="bg-white">
                <th className="border px-4 py-2">Month</th>
                <th className="border px-4 py-2">Amount</th>
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


      <div className="mb-8">
        <div className="flex justify-center">
          <div className="flex  mb-2 relative">
            <h3 className="text-2xl font-bold text-gray-800 ml-8">Yearly Sell Amount:</h3>
            <div className="absolute -left-2 -top-1 bg-green-400 w-8 h-8 rounded-full animate-ping"></div>
            <div className="absolute -left-2 -top-1 bg-green-400 w-8 h-8 rounded-full animate-pulse"></div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse w-full">
            <thead>
              <tr className="bg-white">
                <th className="border px-4 py-2">Year</th>
                <th className="border px-4 py-2">Amount</th>
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
