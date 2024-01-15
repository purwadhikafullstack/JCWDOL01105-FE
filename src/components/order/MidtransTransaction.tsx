import { usePostApi } from "@/lib/service";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const MidtransTransaction = () => {
  const getOrderId = localStorage.getItem("orderId");
  const navigate = useNavigate();

  const { mutate, isSuccess } = usePostApi("/api/order/transaction-success");

  useEffect(() => {
    if (getOrderId) mutate({ orderId: JSON.parse(getOrderId) });
  }, []);

  useEffect(() => {
    if (isSuccess) {
      localStorage.removeItem("orderId");
      setTimeout(() => {
        navigate("/");
      }, 2500);
    }
  }, [isSuccess]);

  return (
    <div className="flex text-center h-screen">
      <div className="m-auto space-y-4">
        <p className="text-4xl font-thin">Transaksi berhasil</p>
        <p className="text-xl font-bold">Terimakasih telah menggunakan layanan kami</p>
        <span className="font-thin">
          kamu akan kembali ke halaman utama sesaat lagi atau klik{" "}
          <span className="underline italic cursor-pointer" onClick={() => navigate("/")}>
            kembali
          </span>
        </span>
      </div>
    </div>
  );
};

export default MidtransTransaction;
