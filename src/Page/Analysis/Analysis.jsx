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
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return `${month} ${year}`;
  };

  const formatDateForDaily = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  // Calculate monthly sell data only if monthlySellAmount is defined
  const monthlySellData = monthlySellAmount ? monthlySellAmount.map(monthData => ({
    month: monthData.month,
    totalAmmount: monthData.totalAmmount
  })) : [];

  // Calculate each month's sell value
  for (let i = 1; i < monthlySellData.length; i++) {
    monthlySellData[i].totalAmmount -= monthlySellData[i - 1].totalAmmount;
  }

  return (
    <div className="p-4 text-white">
      <Marquee speed={100}>
        <h2 className="text-2xl font-bold ">Sell History</h2>
      </Marquee>

      <hr />

      <div className="mb-8 pt-6">
        <h3 className="text-lg font-semibold mb-2">Total Sell Amount:</h3>
        <table className="table-auto border-collapse w-full">
          <tbody>
            <tr>
              <td className="border px-4 py-2">{totalSellAmount}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold m-2">Daily Sell Amount:</h3>
        <table className="table-auto border-collapse w-full">
          <tbody>
            {dailySellAmmount?.slice(0, 30).reverse().map(dayData => (
              <tr key={dayData.day}>
                <td className="border px-4 py-2">{formatDateForDaily(dayData.day)}</td>
                <td className="border px-4 py-2">{dayData.totalAmmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Monthly Sell Amount:</h3>
        <table className="table-auto border-collapse w-full">
          <tbody>
            {monthlySellData.map(monthData => (
              <tr key={monthData.month}>
                <td className="border px-4 py-2">{formatMonth(monthData.month)}</td>
                <td className="border px-4 py-2">{monthData.totalAmmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Yearly Sell Amount:</h3>
        <table className="table-auto border-collapse w-full">
          <tbody>
            {yearlySellAmount?.map(yearData => (
              <tr key={yearData.year}>
                <td className="border px-4 py-2">{yearData.year}</td>
                <td className="border px-4 py-2">{yearData.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Analysis;
