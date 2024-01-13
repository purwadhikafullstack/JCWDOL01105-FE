import { DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
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

import { Label } from "../ui/label";
import { useAppDispatch, useAppSelector } from "@/lib/features/hook";
import { getPage, setPage } from "@/lib/features/globalReducer";
import { Separator } from "../ui/separator";
import SendMail from "./SendMail";
import icon from "@/assets/icons";
import { AuthContext } from "@/app/AuthContext";
import { useNavigate } from "react-router";

const LoginTenant = () => {
  const dispatch = useAppDispatch();
  const { login, id } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const page = useAppSelector(getPage);
  const googleAuth = () => {
    window.open(`${import.meta.env.VITE_AUTH_URL}/google/oauth`, "_self");
  };

  // const facebookAuth = () => {
  //   window.open(`${import.meta.env.VITE_AUTH_URL}/facebook/oauth`, "_self");
  // };

  const initForm = {
    emailOrPhoneNumber: "",
    password: "",
  };

  const navigate = useNavigate();

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
      handleLogin();
    }
    if (isError) {
      toast.error(error?.response?.data?.message);
    }
  }, [isSuccess, isError]);

  const handleLogin = () => {
    if (isSuccess && data) {
      setTimeout(() => navigate(`/tenant`), 50);
    }
  };

  return (
    <>
      {" "}
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Login as Tenant</h4>
        <br />
      </div>
      <Separator className="bg-slate-300 w-full" />
      <div className="p-8">
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
              onClick={() => dispatch(setPage(page + 1))}
            >
              reset password
            </Label>
            <Button type="submit" className="w-full font-xl">
              Submit
            </Button>
          </form>
        </Form>
      </div>
      <Separator className="bg-slate-300 w-full" />
      <div className="px-8 py-4">
        <Button
          className="bg-white hover:bg-white text-black border items-center flex w-full my-4 text-md"
          onClick={() => googleAuth()}
        >
          <div className="flex w-full items-center">
            <img className="w-6" src={icon.google} alt="" />
            <span className="mx-auto">Daftar dengan Google</span>
          </div>
        </Button>
        <Button className="bg-white hover:bg-white text-black border items-center flex w-full my-4 text-md">
          <div className="flex w-full items-center">
            <img className="w-6" src={icon.facebook} alt="" />
            <span className="mx-auto">Daftar dengan Facebook</span>
          </div>
        </Button>
        <Button className="bg-white hover:bg-white text-black border items-center flex w-full my-4 text-md">
          <div className="flex w-full items-center">
            <img className="w-6" src={icon.x} alt="" />
            <span className="mx-auto">Daftar dengan X</span>
          </div>
        </Button>
      </div>
      {/* {page === 2 && <SendMail />} */}
    </>
  );
};

export default LoginTenant;
