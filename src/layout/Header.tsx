import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import { useGetAPI } from "@/lib/service";
import { AuthContext } from "@/app/AuthContext";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Register from "@/components/auth/Register";
import Login from "@/components/auth/Login";
import image from "@/assets/images";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import SearchField from "@/components/navigation/SearchField";
import Account from "@/components/navigation/Account";

const Header = () => {
  const { isLogin, loginGoogle } = useContext(AuthContext);
  const { data, isSuccess } = useGetAPI("/auth/login/success", "credential", {
    withCredentials: true,
  });
  const [route, setRoute] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [darkMode, setDarkMode] = useState(false);
  const { imageUrl, isLogin, loginGoogle } = useContext(AuthContext);
  const googleLogout = () => {
    window.open(`${import.meta.env.VITE_BASE_URL}/auth/logout`, "_self");
    sessionStorage.removeItem("token");
  };
  
  const { data, isSuccess } = useGetAPI("/auth/login/success", "credential", { withCredentials: true });
  useEffect(() => {
    if (isSuccess) {
      console.log("this", data);
      loginGoogle(data);
    }
  }, [data]);

  const form = useForm();
  const onSubmit = (e: any) => {};

  return (
    <nav className="dark:bg-background flex px-4 md:px-12 py-4 lg:px-20 justify-between border-b sticky z-10 top-0 w-full bg-white items-center">
      <div>
        <Link className="flex items-center" to={"/"}>
          <img className="w-12" src={image.logo} alt="logo" />
          <span className="text-3xl" style={{ color: "#3FC1C9" }}>
            Lawang
          </span>
        </Link>
      </div>

      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, (err) => console.log(err))}>
            <SearchField />
          </form>
        </Form>
      </div>

      <div>
        <Account />
      </div>
    </nav>
  );
};

export default Header;
