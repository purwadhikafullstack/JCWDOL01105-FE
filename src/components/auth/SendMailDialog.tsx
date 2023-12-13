import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormMessage, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailSchema } from "@/lib/schema";
import { Toaster, toast } from "sonner";
import { useEffect } from "react";
import { usePostApi } from "@/lib/service";
import { KeyboardBackspace } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "@/lib/features/hook";
import { getPage, setPage } from "@/lib/features/globalReducer";
import { Separator } from "../ui/separator";

const SendMailDialog = () => {
  const dispatch = useAppDispatch();
  const page = useAppSelector(getPage);

  const initForm = {
    email: "",
  };

  type FormType = typeof initForm;
  const form = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: initForm,
  });

  const { mutate, isSuccess, isError, error } = usePostApi("/api/user/reset-password/request");
  const onSubmit = (values: FormType) => {
    mutate({ ...values });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Mengirim Email Sukses");
      form.reset(initForm);
    }
    if (isError) {
      toast.error("Mengirim Email Gagal");
      // toast.error(error?.response?.data?.message);
    }
  }, [isSuccess, isError]);

  return (
    <div>
      <Toaster richColors expand={false} />
      <div className="px-8 pt-8">
        <div className="inline-block cursor-pointer mb-2" onClick={() => dispatch(setPage(page - 1))}>
          <KeyboardBackspace />
          <span className="ml-2">Kembali</span>
        </div>
        <DialogTitle className="mb-2">Reset Password</DialogTitle>
        <DialogDescription className="mb-6">Kirim alamat email untuk medapatkan link reset password</DialogDescription>
      </div>
      <Separator className="bg-slate-300 w-full" />
      <div className="p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, (err) => console.log(err))}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-6">
                  <FormControl>
                    <Input type="text" id="email" placeholder="Email" {...field} />
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
    </div>
  );
};

export default SendMailDialog;
