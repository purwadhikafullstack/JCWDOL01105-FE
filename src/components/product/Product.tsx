import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface IData {
  data: { id: string; name: string; description: string; image_url: string; location: { city: string } };
}

const Product: React.FC<IData> = ({ data }) => {
  return (
    <Card className="w-[300px] flex flex-grow m-2">
      <Link to={`/property/${data.id}`}>
        <CardContent className="w-full p-4">
          <img loading="lazy" className="w-full" src={data.image_url} alt="" />
          <CardTitle className="my-2">{data.name}</CardTitle>
          <CardDescription>{data.location.city}</CardDescription>
        </CardContent>
      </Link>
    </Card>
  );
};

export default Product;
