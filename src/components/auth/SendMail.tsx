import { Form, FormControl, FormMessage, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailSchema } from "@/lib/schema";
import { toast } from "sonner";
import { useEffect } from "react";
import { usePostApi } from "@/lib/service";
import { ChevronLeft } from "@mui/icons-material";
import { Separator } from "../ui/separator";

interface ISendMail {
  page: number;
  setPage: (n: number) => void;
}

const SendMail: React.FC<ISendMail> = ({ page, setPage }) => {
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
      toast.error(error?.response?.data?.message);
    }
  }, [isSuccess, isError]);

  return (
    <div className="space-y-1">
      <div className="flex relative items-center">
        <div
          className="absolute left-[-32px] cursor-pointer hover:bg-slate-200 rounded-full p-1"
          onClick={() => setPage(page - 1)}
        >
          <ChevronLeft />
        </div>
        <span className="text-xl">Reset Password</span>
      </div>

      <div className="space-y-4">
        <p className="font-thin">Kirim alamat email untuk medapatkan link reset password</p>

        <Separator />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, (err) => console.log(err))} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="">
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

export default SendMail;
