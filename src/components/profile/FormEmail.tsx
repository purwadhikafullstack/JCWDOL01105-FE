import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Button } from "../ui/button";
import { changeEmailSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { usePutApi } from "@/lib/service";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/AuthContext";
import { toast } from "sonner";
import { useAppDispatch } from "@/lib/features/hook";
import { setRand } from "@/lib/features/globalReducer";
import { FormInput, FormInputPassword, TriggerBiodataUpdate } from "../Component";
import { useRef } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

const FormEmail = ({ email, password }: { email: string; password: string }) => {
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  const { bearer, logout } = useContext(AuthContext);
  const { mutate, isSuccess, isError, error } = usePutApi(`/api/user/update`, bearer);

  const hiddenFileInput = useRef<HTMLButtonElement>(null);
  const initForm = {
    email: email,
    password: "",
  };
  const form = useForm({ resolver: zodResolver(changeEmailSchema), defaultValues: initForm });

  const handleClick = () => {
    if (hiddenFileInput.current) hiddenFileInput.current.click();
  };

  const onSubmit = (values: object) => {
    mutate({ ...values });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Sukses Mengedit");
      dispatch(setRand(Math.random()));
      setTimeout(() => {
        setOpen(false);
        logout();
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
          <form
            onSubmit={form.handleSubmit(onSubmit, (err: any) => console.log(err))}
            encType="multipart/form-data"
            className="space-y-4"
          >
            <DialogTitle>Ubah Email</DialogTitle>
            <DialogDescription>Pastikan data yang kamu input valid</DialogDescription>
            <FormInput form={form} name="email" />

            <div className="flex">
              <AlertDialog>
                <AlertDialogTrigger
                  className={`${!password ? "text-slate-300" : ""} text-center w-full`}
                  disabled={!password}
                >
                  <span className="text-xl font-semibold mx-auto">Simpan</span>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogTitle>Kamu yakin ingin mengubah alamat email?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Jika iya semua transaksi tidak akan berlaku lagi di alamat email lama dan akan dialihkan ke alamat
                    email baru
                  </AlertDialogDescription>

                  <FormInputPassword form={form} name="password" />
                  <div className="flex justify-end space-x-4">
                    <AlertDialogCancel className="text-lg p-5">Kembali</AlertDialogCancel>
                    <AlertDialogAction className="font-bold" onClick={() => handleClick()}>
                      Konfirmasi
                    </AlertDialogAction>
                  </div>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <Button type="submit" className="hidden" ref={hiddenFileInput} disabled={!password}>
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FormEmail;
