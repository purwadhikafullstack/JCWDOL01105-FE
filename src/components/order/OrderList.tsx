import { useGetAPI } from "@/lib/service";
import { useContext } from "react";
import { AuthContext } from "@/app/AuthContext";
import { useEffect } from "react";
import Order from "./Order";

interface IOrder {
  id: number;
  start_date: number;
  end_date: number;
  total_price: number;
  guest: number;
  status: string;
  room: { image_url: string };
}

const OrderList = () => {
  const { id } = useContext(AuthContext);
  const { data, isFetched, refetch } = useGetAPI(`/api/order/user/${id}`, "orderlist");

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="flex flex-grow flex-wrap justify-center">
      {isFetched && data.map((order: IOrder) => <Order key={order.id} order={order} />)}
    </div>
  );
};

export default OrderList;
