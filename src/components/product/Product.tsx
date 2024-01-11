import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Favorite } from "@mui/icons-material";
import { usePostApi } from "@/lib/service";
import { useContext } from "react";
import { AuthContext } from "@/app/AuthContext";
import { setRand } from "@/lib/features/globalReducer";
import { useAppDispatch } from "@/lib/features/hook";
import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog";
import { FormatToIDR } from "@/lib/utils";
import AuthUser from "../auth/AuthUser";

interface IData {
  data: {
    id: string;
    name: string;
    description: string;
    image_url: string;
    location: { city: string };
    favorites: { status: boolean; userId: string }[];
    rooms: { price: number }[];
  };
}

const Product: React.FC<IData> = ({ data }) => {
  const dispatch = useAppDispatch();
  const { id, bearer, isLogin } = useContext(AuthContext);
  const { mutate } = usePostApi("/api/property/favorite", bearer);

  const handleFavorite = () => {
    if (isLogin) {
      mutate({ propertyId: data.id });
      dispatch(setRand(Math.random()));
    }
  };

  const find = data.favorites.find((favorite) => favorite.userId === id) ? true : false;
  const favorite = find ? data.favorites.find((favorite) => favorite.userId === id)?.status : false;
  const lowestRoomPrice = data.rooms.length > 0 ? FormatToIDR(data.rooms[0].price) : "Ruangan Tidak Tersedia";

  const FavoriteComponent = () => (
    <span onClick={() => handleFavorite()} className="hover:cursor-pointer absolute right-2 top-2">
      <Favorite className={`${favorite ? "text-[#FC5185]" : ""}`} />
    </span>
  );

  const maxTitle = data.name.length > 30 ? data.name.substring(0, 30) + "..." : data.name;
  return (
    <div className="mb-4">
      <Card className="h-full w-full md:max-w-[320px] shadow-lg mx-2">
        <CardContent className="w-full p-0">
          <div className="relative h-[200px]">
            <img loading="lazy" className="w-full rounded-t-md h-[200px]" src={data.image_url} alt="" />
            {isLogin ? (
              <FavoriteComponent />
            ) : (
              <Dialog>
                <DialogTrigger>
                  <FavoriteComponent />
                </DialogTrigger>
                <DialogContent className="p-12">
                  <AuthUser />
                </DialogContent>
              </Dialog>
            )}
          </div>
          <div className="p-4 text-base">
            <Link to={`/property/${data.id}`} className="">
              <CardTitle className="text-base">{maxTitle}</CardTitle>
              <CardDescription>{data.location.city}</CardDescription>
              <span>{lowestRoomPrice}</span>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Product;
