import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Form, FormControl, FormMessage, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { nameSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { usePutApi } from "@/lib/service";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/app/AuthContext";
import { toast } from "sonner";
import { useAppDispatch } from "@/lib/features/hook";
import { setRand } from "@/lib/features/globalReducer";

const FormName = ({ name }: { name: string }) => {
  const dispatch = useAppDispatch();
  const { id, bearer } = useContext(AuthContext);
  const initForm = {
    name: name,
  };

  const form = useForm({ resolver: zodResolver(nameSchema), defaultValues: initForm });
  const { mutate, isSuccess, isError } = usePutApi(`/api/user/${id}`, bearer);
  const onSubmit = (values: object) => {
    mutate({ ...values });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Sukses Mengedit");
      dispatch(setRand(Math.random()));
    }
    if (isError) {
      toast.error("Gagal Mengedit");
    }
  }, [isSuccess, isError]);

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
