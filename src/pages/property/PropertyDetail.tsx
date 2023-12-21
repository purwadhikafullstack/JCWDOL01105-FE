import { useGetAPI } from "@/lib/service";
import { useParams } from "react-router";
import { StarRate, Map, BedroomParent, ChevronLeft } from "@mui/icons-material";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAppDispatch, useAppSelector } from "@/lib/features/hook";
import { getGuest, setHome } from "@/lib/features/globalReducer";
import { useEffect, useState } from "react";
import PropertyDetailSkeleton from "../../components/product/PropertyDeatailSkeleton";
import FormCheckin from "@/components/product/FormCheckin";
import Room from "@/components/product/Room";
import ReviewList from "@/components/product/ReviewList";
import { useNavigate } from "react-router";

interface IRoom {
  id: number;
  name: string;
  price: string;
  description: string;
  guest: number;
  image_url: string;
}

const PropertyDetail = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const guest = useAppSelector(getGuest);

  const [review, setReview] = useState({ rating: 0, totalReview: 0 });

  const { id } = useParams();
  const { data, isLoading, refetch } = useGetAPI(`/api/property/${id}`, "property-detail");

  useEffect(() => {
    dispatch(setHome(false));
    refetch();
  }, []);

  return (
    <div>
      {isLoading ? (
        <PropertyDetailSkeleton />
      ) : (
        <div className="space-y-4">
          <div className="flex relative items-center">
            <div className="hover:bg-slate-100 rounded-full p-2 cursor-pointer" onClick={() => navigate(-1)}>
              <ChevronLeft fontSize="large" />
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium">{data.name}</h1>
          </div>
          <div className="w-11/12 mx-auto space-y-4">
            <div className="flex w-full space-x-1">
              <img loading="lazy" className="w-1/2 mr-3 rounded-l-xl" src={data.image_url} />
              <div className="space-y-1 mt-1">
                <img className="" src={data.image_url} />
                <img src={data.image_url} />
              </div>
              <div className="space-y-1 mt-1">
                <img className="rounded-tr-xl" src={data.image_url} />
                <img className="rounded-br-xl" src={data.image_url} />
              </div>
            </div>

            <div className="flex items-center py-4">
              <div>
                <StarRate className="pb-1" />
              </div>
              <span>{review.rating}</span>
              <span className="underline cursor-pointer ml-2">{review.totalReview} ulasan</span>
            </div>

            <Separator />

            <div className="flex py-4 items-center space-x-4">
              <Avatar>
                <AvatarImage src={data.image_url} />
              </Avatar>
              <div>
                <p>Tuan Rumah: Mang Ujang</p>
                <p>Tuan rumah sejak 10 nov 2023</p>
              </div>
            </div>

            <p>{data.description}</p>

            <Separator />

            <div className="flex justify-between space-x-4">
              <div className="overflow-scroll max-h-[440px] mr-2 w-3/4 pr-2 pb-2">
                {data.rooms.length > 0 ? (
                  data.rooms.map((room: IRoom) => {
                    if (room.guest === guest) {
                      return <Room key={room.id} data={room} />;
                    } else if (guest == 100) {
                      return <Room key={room.id} data={room} />;
                    }
                  })
                ) : (
                  <div className="flex flex-col text-center">
                    <div>
                      <BedroomParent sx={{ fontSize: "100px" }} />
                    </div>
                    <span className="text-2xl mt-4">Ruangan Tidak Tersedia</span>
                  </div>
                )}
              </div>
              <div className="flex overflow-auto items-start">
                <FormCheckin rooms={data.rooms} />
              </div>
            </div>

            <Separator />

            <ReviewList property={data} setReview={setReview} />

            <Separator />

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
