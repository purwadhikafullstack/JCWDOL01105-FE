import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/schema";
import { toast } from "sonner";
import { useContext, useEffect, useState } from "react";
import { usePostApi } from "@/lib/service";
import { AuthContext } from "@/app/AuthContext";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { FormInput, FormInputPassword, LoginOauth } from "../Component";
import SendMail from "./SendMail";

const Login = () => {
  const { login } = useContext(AuthContext);
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

  const { mutate, data, isSuccess, isError } = usePostApi("/api/user/login");
  const onSubmit = (values: FormType) => {
    mutate({ ...values });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login Sukses");
      login(data.data);
      form.reset(initForm);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
    if (isError) {
      toast.error("Login gagal");
      // toast.error(error?.response?.data?.message);
    }
  }, [isSuccess, isError]);

  return (
    <div className="text-base">
      {page === 1 && (
        <div className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, (err) => console.log(err))} className="space-y-4">
              <FormInput form={form} name="emailOrPhoneNumber" desc="Email / nomor telepone" />
              <FormInputPassword form={form} name="password" />

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

          <LoginOauth googleAuth={googleAuth} />
        </div>
      )}
      {page === 2 && <SendMail setPage={setPage} page={page} />}
    </div>
  );
};

export default Login;
