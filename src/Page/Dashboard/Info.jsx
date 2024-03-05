import { useEffect, useState } from "react";
import Calculator from "../../Components/Calculator";
import Time from "../../Components/Time";

const Info = () => {
  const [status, setStatus] = useState([]);

  useEffect(() => {
    fetch("https://tmw-corpo-server.vercel.app/")
      .then((res) => res.text())
      .then((data) => setStatus(data))
      .catch((error) => {
        console.error("Error fetching database status:", error.message);
        setStatus("! DB not connected , please contact: 01761322176");
      });
  }, []);
  return (
    <div>
        
      <Time />
      <div className="text-white">
        <p className="p-4">{status}</p>
      </div>
      <hr className="py-4" />

     
    </div>
  );
};

export default Info;
