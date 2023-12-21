import { Form, FormControl, FormMessage, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registeSchema } from "@/lib/schema";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Toaster, toast } from "sonner";
import { useEffect, useState } from "react";
import { usePostApi } from "@/lib/service";
import { Separator } from "../ui/separator";
import icon from "@/assets/icons";

interface ITab {
  tab: boolean;
  setTab: (b: boolean) => void;
}

const Register: React.FC<ITab> = ({ setTab, tab }) => {
  const [show, setShow] = useState(false);

  const googleAuth = () => {
    window.open(`${import.meta.env.VITE_AUTH_URL}/google/oauth`, "_self");
  };

  const initForm = {
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  };

  type FormType = typeof initForm;
  const form = useForm({
    resolver: zodResolver(registeSchema),
    defaultValues: initForm,
  });

  const { mutate, isSuccess, isError } = usePostApi("/api/user/register");
  const onSubmit = (values: FormType) => {
    mutate({
      name: values.name,
      email: values.email,
      password: values.password,
      phoneNumber: values.phoneNumber,
      role: "user",
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Register Sukses");
      form.reset(initForm);
    }
    if (isError) {
      toast.error("Register gagal");
      // toast.error(error?.response?.data.message);
    }
  }, [isSuccess, isError]);

  return (
    <div>
      <Toaster richColors expand={false} />

      <div className="mt-10">
        <p className="text-2xl">Selamat Datang di Lawang</p>
        <span className="text-slate-500 text-sm">
          Belum memiliki akun{" "}
          <span className="underline cursor-pointer" onClick={() => setTab(!tab)}>
            di sini
          </span>
        </span>

        <Separator className="bg-slate-300 my-4" />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, (err) => console.log(err))}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormControl>
                    <Input type="text" id="name" placeholder="Nama lengkap" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="my-4">
                  <FormControl>
                    <Input type="text" id="email" placeholder="Alamat email" {...field} />
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

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="my-4">
                  <FormControl>
                    <Input type="text" id="phoneNumber" placeholder="Nomor telepon" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
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
    </div>
  );
};

export default Register;
