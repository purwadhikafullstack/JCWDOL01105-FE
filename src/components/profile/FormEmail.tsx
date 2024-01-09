import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Form, FormControl, FormMessage, FormField, FormItem } from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { editEmailSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { usePutApi } from "@/lib/service";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/AuthContext";
import { toast } from "sonner";
import { useAppDispatch } from "@/lib/features/hook";
import { setRand } from "@/lib/features/globalReducer";
import { TriggerBiodataUpdate } from "../Component";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

const FormEmail = ({ email }: { email: string }) => {
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  const { bearer } = useContext(AuthContext);
  const { mutate, isSuccess, isError, error } = usePutApi(`/api/user/update`, bearer);

  const initForm = {
    email: email,
  };
  const form = useForm({ resolver: zodResolver(editEmailSchema), defaultValues: initForm });

  const onSubmit = (values: object) => {
    mutate({ ...values });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Sukses Mengedit");
      dispatch(setRand(Math.random()));
      setTimeout(() => {
        setOpen(false);
      }, 500);
    }
    if (isError) {
      toast.error(error.response.data.message);
    }
  }, [isSuccess, isError]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TriggerBiodataUpdate />
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, (err: any) => console.log(err))} encType="multipart/form-data">
            <DialogTitle className="mb-2">Ubah Nama Lengkap</DialogTitle>
            <DialogDescription className="my-4">Pastikan data yang kamu input valid</DialogDescription>
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
              <AlertDialog>
                <AlertDialogTrigger>Simpan</AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogDescription>
                    Kamu yakin ingin mengubah alamat email? Jika iya semua transaksi tidak akan berlaku lagi di email
                    lama dan akan dialihkan ke alamat email baru
                  </AlertDialogDescription>
                  <div className="flex">
                    <AlertDialogCancel className="bg-red-700">Kembali</AlertDialogCancel>
                    <AlertDialogAction>
                      <Button type="submit" className="text-xl font-semibold mx-auto">
                        Simpan
                      </Button>
                    </AlertDialogAction>
                  </div>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FormEmail;
