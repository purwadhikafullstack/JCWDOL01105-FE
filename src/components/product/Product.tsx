import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface IData {
  data: { id: string; name: string; description: string; image_url: string; location: { city: string } };
}

const Product: React.FC<IData> = ({ data }) => {
  return (
    // <Link className="w-full sm:w-[320px] flex-grow flex m-2" to={`/property/${data.id}`}>
    <Link className="w-full sm:w-[300px] flex-grow flex mb-4" to={`/property/${data.id}`}>
      <Card className="w-full sm:w-[320px] flex-grow flex">
        <CardContent className="w-full p-4">
          <img loading="lazy" className="w-full" src={data.image_url} alt="" />
          <CardTitle className="my-2">{data.name}</CardTitle>
          <CardDescription>{data.location.city}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Product;
