import { FormatToIDR } from "@/lib/utils";
import { Card, CardContent } from "../ui/card";
import { Link } from "react-router-dom";
import { OrderStatus } from "../Component";

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
          <img className="w-full rounded-t-lg" src={order.room.image_url} />
          <div className="px-4 pt-2 pb-4">
            <div className="flex justify-end">
              <OrderStatus status={order.status} />
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
