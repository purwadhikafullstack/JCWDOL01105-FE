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
}

const Room: React.FC<IDataProps> = ({ data }) => {
  const [fullDescription, setFullDescription] = useState(false);

  return (
    <Dialog>
      <Card className="mb-4 shadow-lg">
        <div className="flex flex-col xl:flex-row">
          <img className="h-[205px] rounded-xl" src={data.image_url} />
          <div className="w-full">
            <CardHeader>
              <div className="flex justify-between items-end">
                <CardTitle>{data.name}</CardTitle>
                <CardDescription className="text-lg">{FormatToIDR(Number(data.price))}/malam</CardDescription>
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
