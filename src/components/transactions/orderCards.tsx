import * as React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { QueryObserverResult, QueryObserverRefetchErrorResult } from "react-query";
import { useDeleteApi } from "@/lib/service";

import { Button } from "@/components/ui/button";
import { Bold } from "lucide-react";
import { AuthContext } from "@/app/AuthContext";
import { usePutApi } from "@/lib/service";
import { useState, useEffect } from "react";
interface CardProps {
  order: {
    id: number;
    status: string;
    start_date: string;
    end_date: string;
    total_price: number;
    guest: number;
    image_url: string;
    // Add other properties as needed
  };
}

import { FormatToIDR } from "@/lib/utils";

const OrderCard: React.FC<CardProps> = ({ order }: any) => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [buttonDisabler, setDisabler] = useState(false);

  const fromReparsed = new Date();
  const toReparsed = new Date();

  fromReparsed.setTime(Number(order.start_date));
  toReparsed.setTime(Number(order.end_date));

  const config = {
    headers: {
      Accept: "multipart/form-data",
    },
  };

  const { mutate } = usePutApi(`/api/orderList/status/${order.id}`, config);

  // const buttonsDisabler=()=>{
  //     if(order.status==="sussess" || order.status==="rejected" ||order.status==="cancel")
  //     {
  //         return true;
  //     }
  //     else{
  //         return false;
  //     }
  // }

  // useEffect(() => {
  //     setDisabler(buttonsDisabler());
  //   }, [order.status]);

  const handleConfirm = () => {
    mutate({ status: "success" });
  };
  const handleReject = () => {
    mutate({ status: "rejected" });
  };
  const handleCancel = () => {
    if (order.status == "unpaid")
      try {
        mutate({ status: "cancel" });
      } catch (error) {}
  };

  return (
    <Card className="w-full object-cover ">
      <CardHeader>
        <CardTitle className="break-words overflow-hidden whitespace-nowrap overflow-ellipsis">
          Order ID : {order.id}
        </CardTitle>
        <CardDescription>
          Status :{" "}
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
        </CardDescription>
        <CardDescription>
          Tanggal booking : <div className="font-bold"> {fromReparsed.toString().substring(0, 15)} </div> s/d{" "}
          <div className="font-bold">{toReparsed.toString().substring(0, 15)}</div>
        </CardDescription>
        <CardDescription>Amount : {FormatToIDR(order.total_price)}</CardDescription>
      </CardHeader>
      <CardContent>
        <img className="h-[172px] w-full rounded-xl" src={order.image_url} />
      </CardContent>
      <CardFooter className="gridcol-3 gap-2 w-full object-cover">
        {!(order.status === "success" || order.status === "rejected" || order.status === "cancel") && (
          <Button className="text-sm" onClick={handleConfirm} disabled={buttonDisabler}>
            Confirm
          </Button>
        )}
        {!(order.status === "success" || order.status === "rejected" || order.status === "cancel") && (
          <Button variant="destructive" onClick={handleReject} disabled={buttonDisabler}>
            Reject
          </Button>
        )}
        {order.status === "unpaid" && (
          <Button variant="destructive" onClick={handleCancel} disabled={buttonDisabler}>
            Cancel
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default OrderCard;
