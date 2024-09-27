import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Button } from "../ui/button";
import { nameSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { usePutApi } from "@/lib/service";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/AuthContext";
import { toast } from "sonner";
import { useAppDispatch } from "@/lib/features/hook";
import { setRand } from "@/lib/features/globalReducer";
import { FormInput, TriggerBiodataUpdate } from "../Component";

const FormName = ({ name }: { name: string }) => {
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  const { bearer } = useContext(AuthContext);
  const { mutate, isSuccess, isError } = usePutApi(`/api/user/update`, bearer);

  const initForm = {
    name: name,
  };

  const form = useForm({ resolver: zodResolver(nameSchema), defaultValues: initForm });
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
      toast.error("Gagal Mengedit");
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
            <DialogTitle>Ubah Nama Lengkap</DialogTitle>
            <DialogDescription>Pastikan data yang kamu input valid</DialogDescription>
            <FormInput form={form} name="name" />
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
