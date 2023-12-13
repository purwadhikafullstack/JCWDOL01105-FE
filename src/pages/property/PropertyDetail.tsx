import { useGetAPI } from "@/lib/service";
import { useParams } from "react-router";
import { StarRate, CleaningServices, GppGood, SentimentVerySatisfied, Map } from "@mui/icons-material";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import FormCheckin from "@/components/product/FormCheckin";
import Room from "@/components/product/Room";
import { useAppSelector } from "@/lib/features/hook";
import { getGuest } from "@/lib/features/globalReducer";
import { useEffect } from "react";

interface IRoom {
  id: number;
  name: string;
  price: string;
  description: string;
  guest: number;
  image_url: string;
}

const PropertyDetail = () => {
  const guest = useAppSelector(getGuest);
  const { id } = useParams();
  const { data, isFetched, refetch } = useGetAPI(`/api/property/${id}`, "property-detail");

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      {isFetched && (
        <div className="w-11/12 mx-auto">
          <h1 className="text-4xl font-medium pb-4">{data.name}</h1>

          <div className="flex w-full">
            <img loading="lazy" className="w-1/2 mr-3 rounded-l-xl" src={data.image_url} />
            <div className="flex flex-col justify-between lg:mr-3">
              <img className="" src={data.image_url} />
              <img src={data.image_url} />
            </div>
            <div className="flex flex-col justify-between">
              <img className="rounded-tr-xl" src={data.image_url} />
              <img className="rounded-br-xl" src={data.image_url} />
            </div>
          </div>

          <div className="flex items-center py-4">
            <div>
              <StarRate className="pb-1" />
            </div>
            <span>5.0</span>
            <span className="underline cursor-pointer ml-2">10 ulasan</span>
          </div>

          <Separator className="bg-slate-300" />

          <div className="flex py-4 items-center">
            <Avatar>
              <AvatarImage src={data.image_url} />
            </Avatar>
            <div className="ml-4">
              <p>Tuan Rumah: Mang Ujang</p>
              <p>Tuan rumah sejak 10 nov 2023</p>
            </div>
          </div>

          <Separator className="bg-slate-300" />

          <p className="my-10">{data.description}</p>

          <Separator className="bg-slate-300" />

          <div className="flex justify-between my-10">
            <div className="overflow-scroll h-[430px] mr-2 lg:mr-4 w-3/4">
              {data.rooms.map((room: IRoom) => {
                if (room.guest <= guest) {
                  return <Room key={room.id} data={room} />;
                }
              })}
            </div>
            <div className="flex overflow-auto items-start">
              <FormCheckin rooms={data.rooms} />
            </div>
          </div>

          <div>
            <div className="flex">
              <p className="text-xl">Cari Lokasi di Peta</p>
              <Map />
            </div>
            <iframe
              className="w-full rounded-2xl h-[400px]"
              src={`https://maps.google.com/maps?q=${data.location.lat},${data.location.lng}&hl=id&z=15&amp&output=embed`}
              loading="lazy"
              allow="fullscreen"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <p className="mb-20 mt-2">{data.location.city}, Indonesia</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;
