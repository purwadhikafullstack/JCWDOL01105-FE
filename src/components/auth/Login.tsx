import { Form, FormControl, FormMessage, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/schema";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Toaster, toast } from "sonner";
import { useContext, useEffect, useState } from "react";
import { usePostApi } from "@/lib/service";
import { AuthContext } from "@/app/AuthContext";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Dialog } from "../ui/dialog";
import SendMail from "./SendMail";
import icon from "@/assets/icons";

interface ITab {
  tab: boolean;
  setTab: (b: boolean) => void;
}

const Login: React.FC<ITab> = ({ setTab, tab }) => {
  const { login } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  const googleAuth = () => {
    window.open(`${import.meta.env.VITE_AUTH_URL}/google/oauth`, "_self");
  };

  const initForm = {
    emailOrPhoneNumber: "",
    password: "",
  };

  type FormType = typeof initForm;
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: initForm,
  });

  const { mutate, data, isSuccess, isError, error } = usePostApi("/api/user/login");
  const onSubmit = (values: FormType) => {
    mutate({ ...values });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login Sukses");
      login(data.data);
      form.reset(initForm);
    }
    if (isError) {
      toast.error(error?.response?.data?.message);
    }
  }, [isSuccess, isError]);

  return (
    <Dialog>
      <Toaster richColors expand={false} />
      {page === 1 && (
        <div className="mt-10">
          <p className="text-2xl">Selamat Datang di Lawang</p>
          <span className="text-slate-500 text-sm">
            Sudah memiliki akun{" "}
            <span className="underline cursor-pointer" onClick={() => setTab(!tab)}>
              di sini
            </span>
          </span>

          <Separator className="bg-slate-300 my-4" />

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, (err) => console.log(err))}>
              <FormField
                control={form.control}
                name="emailOrPhoneNumber"
                render={({ field }) => (
                  <FormItem className="mb-b">
                    <FormControl>
                      <Input type="text" id="emailOrPhoneNumber" placeholder="Email / nomor telepone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="my-4">
                    <FormControl>
                      <FormItem className="flex relative">
                        <Input type={`${show ? "text" : "password"}`} id="password" placeholder="Password" {...field} />
                        <FormLabel className="absolute right-2" onClick={() => setShow(!show)}>
                          {show ? <Visibility /> : <VisibilityOff />}
                        </FormLabel>
                      </FormItem>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Label
                className="mb-4 flex justify-end hover:cursor-pointer hover:underline"
                onClick={() => setPage(page + 1)}
              >
                reset password
              </Label>
              <Button type="submit" className="w-full font-xl">
                Submit
              </Button>
            </form>
          </Form>

          <Separator className="bg-slate-300 mt-4" />

          <div className="flex justify-between">
            <Button
              className="bg-white hover:bg-white text-black border items-center flex my-4 text-md flex-grow p-6"
              onClick={() => googleAuth()}
            >
              <div className="flex items-center">
                <img className="w-6" src={icon.google} alt="" />
              </div>
            </Button>
            <Button className="bg-white hover:bg-white text-black border items-center flex my-4 text-md flex-grow p-6 mx-4">
              <div className="flex items-center">
                <img className="w-6" src={icon.facebook} alt="" />
              </div>
            </Button>
            <Button className="bg-white hover:bg-white text-black border items-center flex my-4 text-md flex-grow p-6">
              <div className="flex items-center">
                <img className="w-6" src={icon.x} alt="" />
              </div>
            </Button>
          </div>
        </div>
      )}
      {page === 2 && <SendMail setPage={setPage} page={page} />}
    </Dialog>
  );
};

export default Login;
