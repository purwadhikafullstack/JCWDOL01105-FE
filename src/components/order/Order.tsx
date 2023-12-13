import { FormatToIDR } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Link } from "react-router-dom";

interface IOrderProps {
  order: {
    id: number;
    start_date: number;
    end_date: number;
    total_price: number;
    guest: number;
    status: string;
    room: { image_url: string };
  };
}

const Order: React.FC<IOrderProps> = ({ order }) => {
  return (
    <Link className="w-full md:max-w-[320px] mb-8 mx-4" to={`/setting/order/${order.id}`}>
      <Card>
        <CardHeader className="pb-2"></CardHeader>
        <CardContent className="text-slate-500">
          <img className="w-full rounded-xl" src={order.room.image_url} />
          <div className="mt-2">
            <div className="flex justify-end my-2">
              <p
                className={`${
                  order.status === "unpaid"
                    ? "bg-yellow-300"
                    : order.status === "unconfirm"
                    ? "bg-yellow-600"
                    : order.status === "success"
                    ? "bg-green-600"
                    : "bg-[#D80032]"
                } text-slate-100 border rounded-full  px-3 py-1 shadow-xl`}
              >
                {order.status}
              </p>
            </div>
            <div className="flex justify-between">
              <p>Tamu</p>
              <p>{order.guest}</p>
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
