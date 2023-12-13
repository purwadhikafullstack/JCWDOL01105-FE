import { Form, FormControl, FormMessage, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "@/lib/schema";
import { Toaster, toast } from "sonner";
import { useEffect, useState } from "react";
import { usePostApi } from "@/lib/service";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const userId = searchParams.get("userId");
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const initForm = {
    newPassword: "",
    confirmPassword: "",
  };
  type FormType = typeof initForm;
  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: initForm,
  });

  const { mutate, isSuccess, isError } = usePostApi("/api/user/reset-password");
  const onSubmit = (values: FormType) => {
    mutate({
      newPassword: values.newPassword,
      confirmPassword: values.confirmPassword,
      token: token,
      userId: userId,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Reset Password Sukses");
      form.reset(initForm);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
    if (isError) {
      toast.error("Reset password gagal");
      // toast.error(error?.response?.data?.message);
    }
  }, [isSuccess, isError]);

  return (
    <div>
      <div className="top-1/2 left-1/2 absolute transform -translate-x-1/2 -translate-y-1/2 w-[400px]">
        <Toaster richColors expand={false} />
        <h1 className="mb-2 text-2xl font-semibold">Reset Password</h1>
        <div className="my-4">Masukkan password baru</div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, (err) => console.log(err))}>
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormControl>
                    <FormItem className="flex relative">
                      <Input
                        className="text-lg"
                        type={`${show ? "text" : "password"}`}
                        id="password"
                        placeholder="Password"
                        {...field}
                      />
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
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormControl>
                    <FormItem className="flex relative">
                      <Input
                        className="text-lg"
                        type={`${show2 ? "text" : "password"}`}
                        id="password"
                        placeholder="Password"
                        {...field}
                      />
                      <FormLabel className="absolute right-2" onClick={() => setShow2(!show2)}>
                        {show2 ? <Visibility /> : <VisibilityOff />}
                      </FormLabel>
                    </FormItem>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full text-xl font-semibold">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
