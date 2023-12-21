import { useGetAPI, usePostApi } from "@/lib/service";
import { useNavigate, useParams } from "react-router";
import { StarRate, ChevronLeft } from "@mui/icons-material";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch, useAppSelector } from "@/lib/features/hook";
import { Card, CardContent } from "@/components/ui/card";
import { FormatToIDR } from "@/lib/utils";
import { setDate, getDate, setHome } from "../../lib/features/globalReducer";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useContext, useEffect, useState } from "react";
import { DateRangePicker2 } from "@/components/ui/date-range-picker2";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/app/AuthContext";
import { Label } from "@/components/ui/label";
import { Toaster, toast } from "sonner";
import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import Guest from "@/components/room/Guest";

const PropertyDetail = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const date = useAppSelector(getDate);

  const [tab, setTab] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalGuest, setTotalGuest] = useState(1);

  const { id } = useParams();
  const { isLogin } = useContext(AuthContext);
  const { bearer } = useContext(AuthContext);
  const { data: room, isFetched, refetch: refetchRoom } = useGetAPI(`/api/room/${id}`, "room-detail");
  const { data: rating, isFetched: fetchRating } = useGetAPI(`/api/review/room?roomId=${id}`, `room-rating-${id}`);
  const { mutate, isSuccess, isError, error } = usePostApi("/api/order/book", bearer);
  const {
    data: bookOrder,
    isFetched: bookOrderFetched,
    refetch: bookOrderRefetch,
  } = useGetAPI(`/api/order/book-order?roomId=${id}&start=${date.from}&end=${date.to}`, `book-order-${id}`);

  const startDate = new Date(date.from).getTime();
  const endDate = new Date(date.to).getTime();
  const countDay = Math.round(Math.abs(startDate - endDate) / (24 * 36 * 1e5));

  const onSubmit = () => {
    const data = {
      startDate: new Date(date.from).getTime(),
      endDate: new Date(date.to).getTime(),
      guest: totalGuest,
      totalPrice: totalPrice,
      roomId: isFetched && room.id,
    };
    mutate(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Order Sukses");
    }
    if (isError) {
      toast.error(error?.response?.data.message);
    }
    if (isFetched) {
      setTotalPrice(room.price * countDay);
    }
    dispatch(setHome(false));
  }, [isSuccess, isError, date, room]);

  useEffect(() => {
    refetchRoom();
    if (bookOrderFetched && bookOrder === "exist") {
      toast("Kamar Tidak Tersedia");
    } else {
      toast("Silakan Melakukan Pemesanan");
    }
    bookOrderRefetch();
  }, [bookOrder, date]);

  return (
    <div>
      {isFetched && (
        <div className="flex flex-col space-y-4">
          <Toaster richColors />
          <div className="flex relative items-center">
            <div className="hover:bg-slate-100 rounded-full p-2 cursor-pointer" onClick={() => navigate(-1)}>
              <ChevronLeft fontSize="large" />
            </div>
            <h1 className="text-4xl">Konfirmasi pemesanan</h1>
          </div>

          <div className="flex flex-col-reverse md:flex-row justify-between md:space-x-12 mx-auto w-11/12">
            <div className="w-full md:w-1/2 mt-12 md:mt-0">
              <p className="text-2xl">Perjalanan Anda</p>
              <div>
                <div className="flex justify-between my-8">
                  <div>
                    <p>Tanggal</p>
                    <p className="text-slate-500 font-thin">{countDay} hari</p>
                  </div>
                  <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogTrigger>
                      <span className="font-thin underline cursor-pointer">Ubah</span>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      {isFetched && (
                        <DateRangePicker2
                          onUpdate={(values) => {
                            dispatch(
                              setDate({
                                from: values.range.from.setHours(14, 0, 0, 0),
                                to: values.range.to
                                  ? values.range.to?.setHours(12, 0, 0, 0)
                                  : new Date(new Date().getTime() + 24 * 36e5).setHours(12, 0, 0, 0),
                              })
                            );
                            setIsEditDialogOpen(false);
                          }}
                          initialDateFrom={new Date()}
                          initialDateTo={new Date(new Date().getTime() + 24 * 36 * 1e5)}
                          align="start"
                          locale="en-US"
                          showCompare={false}
                          bookDate={bookOrder}
                        />
                      )}
                    </DialogContent>
                  </Dialog>
                </div>

                <Guest room={room} setTotalGuest={setTotalGuest} />
              </div>

              {isLogin ? "" : <Label className="text-slate-400">Anda perlu masuk akun untuk melakukan pemesanan</Label>}
              <div className="flex justify-center">
                <Button
                  className="w-full text-xl"
                  disabled={!isLogin || bookOrder === "exist"}
                  onClick={() => onSubmit()}
                >
                  Pesan
                </Button>
              </div>

              {isLogin ? <></> : tab ? <Login setTab={setTab} tab={tab} /> : <Register setTab={setTab} tab={tab} />}
            </div>

            <Card className="w-full md:max-w-[350px] lg:max-w-[450px] xl:max-w-[600px]">
              <CardContent className="p-6">
                <div>
                  <img className="w-rounded-xl mb-2 rounded-xl" src={room.image_url} />
                  <p className="font-thin">{room.name}</p>
                  {fetchRating && (
                    <div className="flex items-center">
                      <StarRate className="md:mb-1" fontSize="small" />
                      <span>{rating.rating}</span>
                      <p className="font-thin text-slate-400 text-[12px] cursor-pointer">
                        ({rating.totalReview} ulasan)
                      </p>
                    </div>
                  )}
                </div>

                <Separator className="bg-slate-300 my-6" />

                <p className="text-2xl">Rincian</p>
                <div className="flex justify-between my-2">
                  <p className="font-this text-slate-500">
                    {FormatToIDR(room.price)} x {countDay} malam
                  </p>
                  <p className="font-thin">{FormatToIDR(room.price * countDay)}</p>
                </div>
                <div className="flex justify-between my-2">
                  <p className="font-this text-slate-500">Tamu</p>
                  <p className="font-thin">{`Max ${room.guest} orang`}</p>
                </div>

                <Separator className="bg-slate-300 my-6" />

                <div className="flex justify-between my-2">
                  <p>Total</p>
                  <p>{FormatToIDR(totalPrice)}</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="h-20"></div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;
