import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Favorite as FavoriteIcon } from "@mui/icons-material";
import { usePostApi } from "@/lib/service";
import { useContext } from "react";
import { AuthContext } from "@/app/AuthContext";
import { setRand } from "@/lib/features/globalReducer";
import { useAppDispatch } from "@/lib/features/hook";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { FormatToIDR } from "@/lib/utils";
import AuthUser from "../auth/AuthUser";

interface IData {
  data: {
    id: string;
    name: string;
    image_url: string;
    location: { city: string };
    rooms: { price: number }[];
  };
}

interface IStatus {
  status: boolean;
}

const PropertyFavorite: React.FC<IData & IStatus> = ({ data, status }) => {
  const dispatch = useAppDispatch();
  const { id, bearer, isLogin } = useContext(AuthContext);
  const { mutate } = usePostApi("/api/property/favorite", bearer);

  const handleFavorite = () => {
    if (isLogin) {
      mutate({ userId: id, propertyId: data.id });
      dispatch(setRand(Math.random()));
    }
  };

  const lowestRoomPrice =
    data.rooms.length > 0 ? FormatToIDR(Math.min(...data.rooms.map((room) => room.price))) : "Kamar Tidak Tersedia";

  const FavoriteComponent = () => (
    <span onClick={() => handleFavorite()} className="hover:cursor-pointer absolute right-2 top-2">
      <FavoriteIcon className={"text-[#FC5185]"} />
    </span>
  );

  const maxTitle = data.name.length > 30 ? data.name.substring(0, 30) + "..." : data.name;

  return (
    <div className="mb-4">
      {status === true && (
        <Card className="h-full w-full md:max-w-[320px] mx-2">
          <CardContent className="w-full p-4">
            <div className="relative">
              <img loading="lazy" className="w-full md:w-[300px] h-[200px]" src={data.image_url} alt="" />
              {isLogin ? (
                <FavoriteComponent />
              ) : (
                <Dialog>
                  <DialogTrigger>
                    <FavoriteComponent />
                  </DialogTrigger>
                  <AuthUser />
                </Dialog>
              )}
            </div>
            <Link to={`/property/${data.id}`}>
              <CardTitle className="my-1 text-md ">{maxTitle}</CardTitle>
              <CardDescription>{data.location.city}</CardDescription>
              <span>{lowestRoomPrice}</span>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PropertyFavorite;
