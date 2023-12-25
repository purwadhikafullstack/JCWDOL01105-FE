import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const [timeLeft, setTimeLeft] = useState(5);
  const navigate = useNavigate();
  const decrementTime = useCallback(() => {
    setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
  }, []);

  useEffect(() => {
    const timer = setInterval(decrementTime, 1000);
    if (timeLeft === 0) {
      navigate("/");
    }
    return () => clearInterval(timer);
  }, [decrementTime, timeLeft]);

  return (
    <div className="flex h-screen w-screen">
      <div className="m-auto text-center">
        <h1 className="text-8xl font-bold">Oops!</h1>
        <p className="my-12 text-2xl">Halaman tidak ditemukan</p>
        <p>kembali ke halaman utama dalam {timeLeft} detik</p>

        <span>
          atau
          <Link to="" className="underline font-thin italic mx-1">
            kembali
          </Link>
          sekarang
        </span>
      </div>
    </div>
  );
};

export default NotFound;
