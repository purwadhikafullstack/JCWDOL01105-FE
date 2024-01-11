import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "@/lib/schema";
import { Toaster, toast } from "sonner";
import { useEffect } from "react";
import { usePostApi } from "@/lib/service";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FormInputPassword } from "../Component";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const initForm = {
    newPassword: "",
    confirmPassword: "",
  };
  type FormType = typeof initForm;
  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: initForm,
  });

  const { mutate, isSuccess, isError, error } = usePostApi("/api/user/reset-password", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const onSubmit = (values: FormType) => {
    mutate({
      newPassword: values.newPassword,
      confirmPassword: values.confirmPassword,
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
      toast.error(error?.response?.data?.message);
    }
  }, [isSuccess, isError]);

  return (
    <div>
      <div className="top-1/2 left-1/2 absolute transform -translate-x-1/2 -translate-y-1/2 w-[400px] space-y-2">
        <Toaster richColors expand={false} />
        <h1 className="text-2xl font-semibold">Reset Password</h1>
        <div>Masukkan password baru</div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, (err) => console.log(err))} className="space-y-4">
            <FormInputPassword form={form} name="newPassword" />
            <FormInputPassword form={form} name="confirmPassword" />

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
