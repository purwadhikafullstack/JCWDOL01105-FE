import { Button } from "@/components/ui/button";
import { useGetAPI, usePostApi } from "@/lib/service";
import { FormatToIDR } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { ChevronLeft } from "@mui/icons-material";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import UploadProvePayment from "@/components/order/UploadProvePayment";

const OrderDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: order, isFetched, refetch } = useGetAPI(`/api/order/id/${id}`, "order-detail");

  const [token, setToken] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);

  const checkIn = isFetched && new Date(order.start_date).toLocaleDateString();
  const checkOut = isFetched && new Date(order.end_date).toLocaleDateString();
  const countDay = isFetched && Math.round(Math.abs(order.start_date - order.end_date) / (24 * 36 * 1e5));
  const hours = Math.floor(timeLeft / 60);
  const minutes = Math.floor(timeLeft % 60);

  const { mutate, data: transactionOrder, isSuccess } = usePostApi(`api/order/transaction`);
  const { mutate: expiredOrder } = usePostApi(`api/order/expired`);

  const transaction = () => {
    const payload = isFetched && {
      orderId: id,
    };
    mutate(payload);
  };

  useEffect(() => {
    if (isFetched) {
      const expiresTime = order.expired - new Date().getTime();
      if (expiresTime > 0) {
        setTimeLeft(expiresTime / 6e4);
      } else {
        expiredOrder({ orderId: id });
      }
    }
  }, [isFetched]);

  useEffect(() => {
    if (!timeLeft) return;

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 6e4);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  useEffect(() => {
    if (isSuccess) {
      setToken(transactionOrder.data.token);
      if (token) {
        window.snap.pay(transactionOrder.data.token);
      }
    }
    refetch();
  }, [isSuccess, order, token]);

  useEffect(() => {
    const midtransUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const midtransClientKey = "SB-Mid-client-ua4G3MNRZB0VnKx_";
    let script = document.createElement("script");
    script.src = midtransUrl;
    script.setAttribute("data-client-key", midtransClientKey);
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="border rounded-xl md:h-full">
      {isFetched && (
        <Dialog>
          <div className="px-12 pt-4">
            <div className="flex relative items-center mb-4">
              <div
                className="absolute left-[-40px] hover:bg-slate-100 rounded-full cursor-pointer"
                onClick={() => navigate(-1)}
              >
                <ChevronLeft fontSize="large" />
              </div>
              <span className="text-2xl">kembali</span>
            </div>
            <div className="flex flex-col md:flex-row-reverse">
              <div>
                <img className="w-full rounded-xl" src={order.room.image_url} alt="" />
              </div>
              <div className="w-full relative mt-12 md:mt-0 md:pr-8">
                <div className="flex justify-end">
                  {order.status === "unpaid" ? (
                    <span className={`border rounded-full px-4 py-1 bg-yellow-300 text-yellow-700 shadow-xl`}>
                      {hours}:{minutes.toString().padStart(2, "0")}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <p className="text-xl">ORDER ID</p>
                  <p className="text-sm">{order.id}</p>
                </div>
                <div className="flex justify-between my-4"></div>
                <div className="flex justify-between my-4">
                  <p className="text-xl font-thin">Total harga</p>
                  <p className="text-xl font-thin">{FormatToIDR(order.total_price)}</p>
                </div>
                <div className="flex justify-between my-4">
                  <p className="text-xl font-thin">Tamu</p>
                  <p className="text-xl font-thin">{order.guest} orang</p>
                </div>
                <div className="flex justify-between my-4">
                  <p className="text-xl font-thin">Lama menginap</p>
                  <p className="text-xl font-thin">{countDay} malam</p>
                </div>
                <div className="flex justify-between my-4">
                  <p className="text-xl font-thin">Tanggal Check-In</p>
                  <p className="text-xl font-thin">{checkIn}</p>
                </div>
                <div className="flex justify-between my-4">
                  <p className="text-xl font-thin">Tanggal Check-out</p>
                  <p className="text-xl font-thin">{checkOut}</p>
                </div>
                <Button className={`${order.status !== "unpaid" ? "hidden" : ""}`} onClick={() => transaction()}>
                  Bayar sekarang
                </Button>
                <DialogTrigger>
                  <Button className={`${order.status !== "unconfirm" ? "hidden" : ""}`} onClick={() => transaction()}>
                    Upload bukti bayar
                  </Button>
                </DialogTrigger>
                <UploadProvePayment />
              </div>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default OrderDetail;
