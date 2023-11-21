import { DialogContent, DialogHeader, DialogDescription, DialogTitle } from "@/components/ui/dialog";
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
import icon from "../../assets/icons/index";

const Register = () => {
  const [show, setShow] = useState(false);

  const googleAuth = () => {
    window.open(`${import.meta.env.VITE_AUTH_URL}/google/oauth`, "_self");
  };

  // const facebookAuth = () => {
  //   window.open(`${import.meta.env.VITE_AUTH_URL}/facebook/oauth`, "_self");
  // };

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

  const { mutate, isSuccess, isError, error } = usePostApi("/api/user/register");
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
      console.log(error);
      toast.error(error?.response?.data.message);
    }
  }, [isSuccess, isError]);

  return (
    <DialogContent className="sm:max-w-[425px]">
      <Toaster richColors expand={false} />
      <DialogHeader>
        <DialogTitle>Daftar</DialogTitle>
        <DialogDescription>Selamat Datang di Lawang</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, (err) => console.log(err))}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mb-3">
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
              <FormItem className="my-3">
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
              <FormItem className="my-3">
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
              <FormItem className="my-3">
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

      <Button className="bg-white hover:bg-white text-black border items-center flex" onClick={() => googleAuth()}>
        <div className="flex w-full items-center">
          <img className="w-6" src={icon.google} alt="" />
          <span className="mx-auto">Daftar dengan Google</span>
        </div>
      </Button>

      <Button className="bg-white hover:bg-white text-black border items-center flex">
        <div className="flex w-full items-center">
          <img className="w-6" src={icon.facebook} alt="" />
          <span className="mx-auto">Daftar dengan Facebook</span>
        </div>
      </Button>

      <Button className="bg-white hover:bg-white text-black border items-center flex">
        <div className="flex w-full items-center">
          <img className="w-6" src={icon.x} alt="" />
          <span className="mx-auto">Daftar dengan X</span>
        </div>
      </Button>
    </DialogContent>
  );
};

export default Register;
