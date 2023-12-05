import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface IData {
  data: { id: string; name: string; description: string; image_url: string; location: { city: string } };
}

const Product: React.FC<IData> = ({ data }) => {
  return (
    <Link className="w-full md:max-w-[320px] mx-2 mb-4" to={`/property/${data.id}`}>
      <Card className="h-full">
        <CardContent className="w-full p-4">
          <img loading="lazy" className="w-full md:w-[300px] h-[200px]" src={data.image_url} alt="" />
          <CardTitle className="my-2 text-lg">{data.name}</CardTitle>
          <CardDescription>{data.location.city}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Product;
