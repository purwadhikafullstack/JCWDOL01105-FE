import { FormatToIDR } from "@/lib/utils";
import { Card, CardContent } from "../ui/card";
import { Link } from "react-router-dom";

interface IOrderProps {
  order: {
    id: number;
    start_date: number;
    end_date: number;
    total_price: number;
    guest: number;
    status: string;
    room: { name: string; image_url: string };
  };
}

const Order: React.FC<IOrderProps> = ({ order }) => {
  return (
    <Link className="w-full md:max-w-[320px] mb-8 mx-4" to={`/setting/order/${order.id}`}>
      <Card>
        <CardContent className="text-slate-500 p-0">
          <img className="w-full rounded-xl" src={order.room.image_url} />
          <div className="p-4">
            <div className="flex justify-end">
              <p
                className={`${
                  order.status === "unpaid"
                    ? "bg-yellow-400"
                    : order.status === "unconfirm"
                    ? "bg-yellow-600"
                    : order.status === "success"
                    ? "bg-green-600"
                    : "bg-[#D80032]"
                } text-slate-100 border rounded-full px-4 shadow-xl font-thin`}
              >
                {order.status === "unpaid"
                  ? "belum bayar"
                  : order.status === "unconfirm"
                  ? "diproses"
                  : order.status === "success"
                  ? "sukses"
                  : order.status === "expired"
                  ? "kadaluarsa"
                  : order.status === "cancel"
                  ? "dibatalkan"
                  : "ditolak"}
              </p>
            </div>
            <div className="flex justify-between">
              <p>Kamar</p>
              <p>{order.room.name}</p>
            </div>
            <div className="flex justify-between">
              <p>Total harga</p>
              <p>{FormatToIDR(order.total_price)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Order;
