import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Form, FormControl, FormMessage, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { nameSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const FormName = ({ name }: { name: string }) => {
  const initForm = {
    name: name,
  };
  const form = useForm({ resolver: zodResolver(nameSchema), defaultValues: initForm });

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
            <DialogTitle className="mb-2">Ubah Nama Lengkap</DialogTitle>
            <DialogDescription className="my-4">Pastikan data yang kamu input valid</DialogDescription>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormControl>
                    <Input type="text" id={`${name}`} {...field} />
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

export default FormName;
