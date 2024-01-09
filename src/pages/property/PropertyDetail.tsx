import { useGetAPI } from "@/lib/service";
import { useParams } from "react-router";
import { StarRate, Map, BedroomParent } from "@mui/icons-material";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAppDispatch, useAppSelector } from "@/lib/features/hook";
import { getGuest, setHome } from "@/lib/features/globalReducer";
import { useEffect } from "react";
import { facilities } from "@/lib/constant";
import { HeaderBack } from "@/components/Component";
import moment from "moment";
import PropertyDetailSkeleton from "../../components/product/PropertyDeatailSkeleton";
import FormCheckin from "@/components/product/FormCheckin";
import Room from "@/components/product/Room";
import ReviewList from "@/components/product/ReviewList";
import ReviewDetail from "@/components/product/ReviewDetail";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

interface IRoom {
  id: number;
  name: string;
  price: string;
  description: string;
  guest: number;
  image_url: string;
}

interface IFacility {
  id: string;
  facility: { facility: string };
}

const PropertyDetail = () => {
  const dispatch = useAppDispatch();
  const guest = useAppSelector(getGuest);

  const { id } = useParams();
  const { data, isLoading, refetch: refetchProperty } = useGetAPI(`/api/property/${id}`, "property-detail");
  const {
    data: reviews,
    isFetched,
    refetch: refetchReview,
  } = useGetAPI(
    `/api/review/property?propertyId=${!isLoading && data.property.id}`,
    `review-${!isLoading && data.property.id}`
  );

  useEffect(() => {
    dispatch(setHome(false));
    refetchReview();
    refetchProperty();
  }, [reviews]);

  return (
    <div>
      {isLoading ? (
        <PropertyDetailSkeleton />
      ) : (
        <div className="space-y-4">
          <HeaderBack desc={data.property.name} />

          <div className="w-11/12 mx-auto space-y-8">
            <div>
              <div className="flex w-full space-x-1">
                <img loading="lazy" className="w-1/2 mr-3 rounded-l-xl" src={data.property.image_url} />
                <div className="space-y-1 mt-1">
                  <img src={data.property.image_url} />
                  <img src={data.property.image_url} />
                </div>
                <div className="space-y-1 mt-1">
                  <img className="rounded-tr-xl" src={data.property.image_url} />
                  <img className="rounded-br-xl" src={data.property.image_url} />
                </div>
              </div>

              <div className="flex items-center py-4">
                <div>
                  <StarRate className="pb-1" />
                </div>
                {isFetched && (
                  <Dialog>
                    <DialogTrigger>
                      <span>{reviews.score.rating}</span>
                      <span className="underline cursor-pointer ml-2">{reviews.reviews.count} ulasan</span>
                    </DialogTrigger>
                    <ReviewDetail reviews={reviews.reviews.rows} score={reviews.score} />
                  </Dialog>
                )}
              </div>
            </div>

            <Separator />

            <div className="flex py-4 items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={data.property.user.image_url} />
              </Avatar>
              <div>
                <p className="text-lg">Tuan rumah: {data.property.user.name}</p>
                <p className="text-base text-slate-500 font-thin">
                  Tuan rumah sejak {moment(data.property.user.createdAt).fromNow()}
                </p>
              </div>
            </div>

            <p>{data.property.description}</p>

            <Separator />

            <div className="space-y-8">
              <p className="text-2xl">Fasilitas</p>
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {data.property.facility_lists.map((facility: IFacility) => {
                  const item = facilities.filter((e) => e.value === facility.facility.facility)[0];
                  return (
                    <div key={item.value} className="grid grid-cols-6">
                      <div className="flex space-x-6 mb-6">
                        <span>{item.icon}</span>
                        <p className="font-thin text-2xl text-slate-700">{item.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <Separator />

            <div className="flex justify-between space-x-4 text-lg">
              <div className="overflow-scroll max-h-[440px] mr-2 w-3/4 pr-2 pb-2">
                {data.property.rooms.length > 0 ? (
                  data.property.rooms.map((room: IRoom) => {
                    if (room.guest === guest) {
                      return <Room key={room.id} data={room} />;
                    } else if (guest == 100) {
                      return <Room key={room.id} data={room} />;
                    }
                  })
                ) : (
                  <div className="text-center mt-[30%] md:mt-[4%]">
                    <div>
                      <BedroomParent sx={{ fontSize: "100px" }} />
                    </div>
                    <span className="text-2xl mt-4">Ruangan Tidak Tersedia</span>
                  </div>
                )}
              </div>
              <div className="flex overflow-auto items-start">
                <FormCheckin rooms={data.property.rooms} />
              </div>
            </div>

            <Separator />

            {isFetched && <ReviewList reviews={reviews.reviews.rows} score={reviews.score} />}

            {isFetched && reviews.length > 0 && (
              <Dialog>
                <DialogTrigger className="font-thin rounded-xl border px-4 py-2 border-black">
                  Tampilkan Semua ({reviews.reviews.count}) Ulasan
                </DialogTrigger>
                <ReviewDetail reviews={reviews.reviews.rows} score={reviews.score} />
              </Dialog>
            )}

            <Separator />

            <div className="flex">
              <p className="text-xl">Cari Lokasi di Peta</p>
              <Map />
            </div>

            <iframe
              className="w-full rounded-2xl h-[400px]"
              src={`https://maps.google.com/maps?q=${data.property.location.lat},${data.property.location.lng}&hl=id&z=15&amp&output=embed`}
              loading="lazy"
              allow="fullscreen"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <p className="mb-20 mt-2">{data.property.location.city}, Indonesia</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;
