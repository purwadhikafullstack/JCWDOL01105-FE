import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormMessage, FormField, FormItem } from "@/components/ui/form";
import { Button } from "../ui/button";
import { genderSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { usePutApi } from "@/lib/service";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/AuthContext";
import { toast } from "sonner";
import { useAppDispatch } from "@/lib/features/hook";
import { setRand } from "@/lib/features/globalReducer";
import { TriggerBiodataUpdate } from "../Component";

const FormGender = ({ gender }: { gender: string }) => {
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const { bearer } = useContext(AuthContext);
  const { mutate, isSuccess, isError } = usePutApi(`/api/user/update`, bearer);

  const initForm = {
    gender: gender ? gender : "unknown",
  };
  const form = useForm({ resolver: zodResolver(genderSchema), defaultValues: initForm });

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
      <DialogContent className="max-w-[400px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, (err: any) => console.log(err))} encType="multipart/form-data">
            <DialogTitle className="mb-2">Ubah Gender</DialogTitle>
            <DialogDescription className="my-4">Pastikan data yang kamu input valid</DialogDescription>
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormControl className="flex">
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem key={"male"} value="male">
                          Laki-laki
                        </SelectItem>
                        <SelectItem key={"female"} value="female">
                          Perempuan
                        </SelectItem>
                      </SelectContent>
                    </Select>
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

export default FormGender;
