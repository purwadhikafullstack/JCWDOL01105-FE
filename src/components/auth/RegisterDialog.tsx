import { DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
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

const RegisterDialog = () => {
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
      toast.error("Register gagal");
      // toast.error(error?.response?.data.message);
    }
  }, [isSuccess, isError]);

  return (
    <DialogContent className="max-w-[350px] rounded-xl sm:max-w-[500px] p-0">
      <Toaster richColors expand={false} />
      <div className="px-8 pt-8">
        <DialogTitle className="mb-2">Daftar</DialogTitle>
        <DialogDescription className="my-4">Selamat Datang di Lawang</DialogDescription>
      </div>
      <Separator className="bg-slate-300 w-full" />
      <div className="px-8 py-4">
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
      </div>
      <Separator className="bg-slate-300 w-full" />
      <div className="px-8 pb-4">
        <Button
          className="bg-white hover:bg-white text-black border items-center flex w-full text-md my-4"
          onClick={() => googleAuth()}
        >
          <div className="flex w-full items-center">
            <img className="w-6" src={icon.google} alt="" />
            <span className="mx-auto">Daftar dengan Google</span>
          </div>
        </Button>

        <Button className="bg-white hover:bg-white text-black border items-center flex w-full text-md my-4">
          <div className="flex w-full items-center">
            <img className="w-6" src={icon.facebook} alt="" />
            <span className="mx-auto">Daftar dengan Facebook</span>
          </div>
        </Button>

        <Button className="bg-white hover:bg-white text-black border items-center flex w-full text-md my-4">
          <div className="flex w-full items-center">
            <img className="w-6" src={icon.x} alt="" />
            <span className="mx-auto">Daftar dengan X</span>
          </div>
        </Button>
      </div>
    </DialogContent>
  );
};

export default RegisterDialog;
