import { useEffect, useCallback, useState } from "react";

const CountdownTimer = ({ orderDate }: { orderDate: Date }) => {
  const convertOrderDate = Math.floor((new Date(orderDate).getTime() + 2 * 36e5 - Date.now()) / 1000);
  const [timeLeft, setTimeLeft] = useState(convertOrderDate);

  const decrementTime = useCallback(() => {
    setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
  }, []);

  useEffect(() => {
    const timer = setInterval(decrementTime, 1000);
    return () => clearInterval(timer);
  }, [decrementTime]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div>
      <span className={`border rounded-full px-4 py-1 bg-yellow-300 text-yellow-700 shadow-xl`}>
        {hours}:{minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
      </span>
    </div>
  );
};
export default CountdownTimer;
