import { UserInterface } from "@/lib/interface";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Home = () => {
  /////// TestAPI
  const { data: user, isFetched } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      return res.data;
    },
  });
  return (
    <div>
      {isFetched &&
        user.map((item: UserInterface) => (
          <p className="text-blue-400" key={item.id}>
            {item.name}
          </p>
        ))}
    </div>
  );
};

export default Home;
