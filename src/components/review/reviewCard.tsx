import { FormatToIDR } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "../ui/card";
import ReviewDialog from "./reviewDialog";
import { useGetAPI } from "@/lib/service";

interface IOrderProps {
    order: {
        id: number;
        start_date: number;
        end_date: number;
        total_price: number;
        guest: number;
        status: string;
        room: { id: number, image_url: string, propertyId :number };
    };

}

const ReviewCard: React.FC<IOrderProps> = ({ order}:any) => {


    const fromReparsed = new Date();
    const toReparsed = new Date();

    fromReparsed.setTime(Number(order.start_date))
    toReparsed.setTime(Number(order.end_date))

    const {data,refetch}= useGetAPI(`api/review/order/${order.id}`,`get-review-by-order-${order.id}`)
  
    return (
        <Card className="w-full md:max-w-[320px] mb-8 mx-4">
            <CardHeader className="pb-2"></CardHeader>
            <CardContent className="text-slate-500">
                <img className="w-full rounded-xl" src={order.room.image_url} />
                <div className="mt-2">
                    <div className="flex justify-end my-2">
                        <p
                            className={`${order.status === "unpaid"
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
                    <div>
                        <p>Tanggal :</p>
                        <div className="font-bold">{fromReparsed.toString().substring(0, 15)}</div>
                        <div>s/d</div>
                        <div className="font-bold">{toReparsed.toString().substring(0, 15)}</div>
                    </div>
                    <div className="flex justify-between">
                        <p>Total harga</p>
                        <p>{FormatToIDR(order.total_price)}</p>
                    </div>
                </div>
                <div>
                {!data && <ReviewDialog order={order} refetch={refetch}/>} {data&&<span className="font-bold">Ulasan Sudah Diterima</span>}
                {/* <button onClick={() => refetch()}>Manual Refetch</button> */}
                </div>
            </CardContent>
        </Card>
    );
};

export default ReviewCard;
