import { AuthContext } from "@/app/AuthContext";
import { usePostApi } from "@/lib/service";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";

const MidtransTransaction = () => {
  const getOrderId = localStorage.getItem("orderId");
  const navigate = useNavigate();

  const { bearer } = useContext(AuthContext);
  const { mutate, isSuccess } = usePostApi("/api/order/transaction-success", bearer);

  useEffect(() => {
    if (getOrderId) mutate({ orderId: JSON.parse(getOrderId) });
  }, [getOrderId]);

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
        <p className="font-thin">kamu akan kembali ke halaman utama sesaat lagi</p>
      </div>
    </div>
  );
};

export default MidtransTransaction;
