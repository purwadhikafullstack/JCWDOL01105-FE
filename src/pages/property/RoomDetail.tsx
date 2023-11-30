import { useGetAPI } from "@/lib/service";
import { useNavigate, useParams } from "react-router";
import { StarRate, CleaningServices, GppGood, SentimentVerySatisfied, Map, ChevronLeft } from "@mui/icons-material";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch, useAppSelector } from "@/lib/features/hook";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { FormatToIDR } from "@/lib/utils";
import { setDate, getDate } from "../../lib/features/globalReducer";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useContext, useState } from "react";
import { DateRangePicker2 } from "@/components/ui/date-range-picker2";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/app/AuthContext";
import { Label } from "@/components/ui/label";
import Counter from "@/components/Counter";
import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";

const PropertyDetail = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [countAdult, setCountAdult] = useState(1);
  const [countKid, setCountKid] = useState(0);
  const [countInfant, setCountInfant] = useState(0);
  const [tab, setTab] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const { isLogin } = useContext(AuthContext);
  const { id } = useParams();
  const { data, isFetched } = useGetAPI(`/api/room/${id}`, "room-detail");

  const date = useAppSelector(getDate);
  const startDate = new Date(date.from).getTime();
  const endDate = new Date(date.to).getTime();
  const countDay = Math.round(Math.abs(startDate - endDate) / (24 * 36 * 1e5));

  return (
    <div className="flex flex-col">
      <div className="flex relative items-center mb-10 flex-grow">
        <div className="hover:bg-slate-100 rounded-full p-3 cursor-pointer w-16 h-16" onClick={() => navigate(-1)}>
          <ChevronLeft fontSize="large" />
        </div>
        <h1 className="text-4xl">Konfirmasi pemesanan</h1>
      </div>

      <div className="flex flex-col-reverse md:flex-row justify-around mx-auto  w-11/12">
        <div className="w-full md:w-1/2 mt-12 md:mt-0 mr-10">
          <p className="text-2xl">Perjalanan Anda</p>
          <div>
            <div className="flex justify-between my-8">
              <div>
                <p>Tanggal</p>
                <p className="text-slate-500 font-thin">{countDay} hari</p>
              </div>
              <Dialog>
                <DialogTrigger>
                  <span className="font-thin underline cursor-pointer">Ubah</span>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DateRangePicker2
                    onUpdate={(values) => dispatch(setDate(values.range))}
                    initialDateFrom={new Date()}
                    initialDateTo={new Date(new Date().getTime() + 24 * 36 * 1e5)}
                    align="start"
                    locale="en-GB"
                    showCompare={false}
                  />
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex justify-between my-8">
              <div>
                <p>Tamu</p>
                <p className="text-slate-500 font-thin">{countAdult + countKid + countInfant} tamu</p>
              </div>

              <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogTrigger>
                  <span className="font-thin underline cursor-pointer">Ubah</span>
                </DialogTrigger>
                <DialogContent>
                  <p className="text-2xl">Tamu</p>
                  <div className="flex justify-between items-end my-4">
                    <div>
                      <p>Dewasa</p>
                      <p className="font-thin text-sm">Usia 13+</p>
                    </div>
                    <Counter state="adult" count={countAdult} setCount={setCountAdult} />
                  </div>

                  <div className="flex justify-between items-end my-4">
                    <div>
                      <p>Anak-anak</p>
                      <p className="font-thin text-sm">Usia 2-12</p>
                    </div>
                    <Counter state="kids" count={countKid} setCount={setCountKid} />
                  </div>

                  <div className="flex justify-between items-end my-4">
                    <div>
                      <p>Balita</p>
                      <p className="font-thin text-sm">Di bawah 2 tahun</p>
                    </div>
                    <Counter state="kids" count={countInfant} setCount={setCountInfant} />
                  </div>

                  <Button onClick={() => setIsEditDialogOpen(false)}>Simpan</Button>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {isLogin ? (
            ""
          ) : (
            <Label className="text-slate-400">Anda perlu masuk atau datar untuk melakukan pemesanan</Label>
          )}
          <Button className="flex w-full" disabled={!isLogin}>
            Pesan
          </Button>

          {isLogin ? <></> : tab ? <Login setTab={setTab} tab={tab} /> : <Register setTab={setTab} tab={tab} />}
        </div>

        <div>
          {isFetched && (
            <Card>
              <CardContent className="p-6">
                <div>
                  <img className="w-full rounded-xl mb-2" src={data.image_url} />
                  <p className="font-thin">{data.name}</p>
                  <div className="flex items-center">
                    <StarRate className="md:mb-1" fontSize={"sm"} />0
                    <p className="font-thin text-slate-400 text-[12px] cursor-pointer">(0 ulasan)</p>
                  </div>
                </div>

                <Separator className="bg-slate-300 my-6" />

                <p className="text-2xl">Rincian harga</p>
                <div className="flex justify-between my-2">
                  <p className="font-this text-slate-500">
                    {FormatToIDR(data.price)} x {countDay} malam
                  </p>
                  <p className="font-thin">{FormatToIDR(data.price * countDay)}</p>
                </div>

                <Separator className="bg-slate-300 my-6" />

                <div className="flex justify-between my-2">
                  <p>Total</p>
                  <p>{FormatToIDR(data.price * countDay)}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <div className="h-20"></div>
    </div>
  );
};

export default PropertyDetail;
