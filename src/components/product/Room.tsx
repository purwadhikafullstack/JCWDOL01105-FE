import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { FormatToIDR } from "@/lib/utils";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import { Link } from "react-router-dom";

interface IDataProps {
  data: {
    id: number;
    name: string;
    price: string;
    description: string;
    guest: number;
    image_url: string;
  };
  specialPrice?: { percentage: number; price: number };
}

const Room: React.FC<IDataProps> = ({ data, specialPrice }) => {
  const [fullDescription, setFullDescription] = useState(false);
  const price = Number(data.price);
  let adjustPrice = price;

  if (specialPrice && specialPrice.percentage) {
    adjustPrice = price * (1 + Number(specialPrice.percentage) / 100);
  } else if (specialPrice && specialPrice.price) {
    adjustPrice = price + Number(specialPrice.price);
  }

  return (
    <Dialog>
      <Card className="mb-4 shadow-lg">
        <div className="flex flex-col xl:flex-row">
          <img className="h-[205px] rounded-xl" src={data.image_url} />
          <div className="w-full">
            <CardHeader>
              <div className="flex justify-between items-end">
                <CardTitle>{data.name.length > 15 ? data.name.substring(12) + "..." : data.name}</CardTitle>
                <CardDescription className="text-lg">{FormatToIDR(adjustPrice)}/malam</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              {data.description.length > 100 ? (
                <span>
                  {fullDescription ? (
                    <div>
                      <span>{data.description}</span>
                      <span
                        className="hover:cursor-pointer ml-2 font-thin italic"
                        onClick={() => setFullDescription(false)}
                      >
                        sembunyikan
                      </span>
                    </div>
                  ) : (
                    <div>
                      <span>{data.description.substring(0, 100) + "..."}</span>
                      <span
                        className="hover:cursor-pointer ml-2 font-thin italic"
                        onClick={() => setFullDescription(true)}
                      >
                        tampilkan
                      </span>
                    </div>
                  )}
                </span>
              ) : (
                <span>{data.description}</span>
              )}
            </CardContent>
            <CardFooter className="font-thin flex justify-between items-end">
              <p>Maksimal tamu {data.guest}</p>
              <Link to={`/room/${data.id}`}>
                <Button size={"sm"}>Selanjutnya</Button>
              </Link>
            </CardFooter>
          </div>
        </div>
      </Card>
    </Dialog>
  );
};

export default Room;
