import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Form, FormControl, FormMessage, FormField, FormItem } from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { emailSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const FormEmail = ({ email }: { email: string }) => {
  const initForm = {
    email: email,
  };
  const form = useForm({ resolver: zodResolver(emailSchema), defaultValues: initForm });

  const onSubmit = (values: any) => {
    console.log("this", values);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <p className="italic hover:underline hover:cursor-pointer font-medium">Ubah</p>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, (err: any) => console.log(err))} encType="multipart/form-data">
            <DialogHeader>
              <DialogTitle className="mb-4">Ubah Nama Lengkap</DialogTitle>
              <DialogDescription>Pastikan data yang kamu input valid</DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormControl>
                    <Input type="text" id="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex">
              <Button type="submit" className="text-xl font-semibold mx-auto">
                Simpan
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FormEmail;
