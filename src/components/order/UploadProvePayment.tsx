import { Form, FormControl, FormItem, FormMessage, FormField } from "@/components/ui/form";
import { usePutApi } from "@/lib/service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadImageSchema } from "@/lib/schema";
import { useContext, useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { AddAPhoto } from "@mui/icons-material";
import { DialogContent } from "../ui/dialog";
import { useEffect } from "react";
import { Toaster, toast } from "sonner";
import { AuthContext } from "@/app/AuthContext";

const UploadProvePayment = ({ orderId }: { orderId: string }) => {
  const { token } = useContext(AuthContext);
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (hiddenFileInput.current) hiddenFileInput.current.click();
  };

  const formUpload = useForm({
    resolver: zodResolver(uploadImageSchema),
  });

  const { mutate, isSuccess, isError } = usePutApi(`/api/order/upload-image/${orderId}`, {
    headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const selectedFiles = files as FileList;
    formUpload.setValue("file", selectedFiles[0]);
  };

  const onSubmitUpload = async (values: any) => {
    const formData = new FormData();
    formData.append("file", values.file);
    console.log("values", values);
    mutate(values);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Upload Gambar Sukses");
    }
    if (isError) {
      toast.error("Upload Gambar Gagal");
    }
  }, [isSuccess, isError]);

  return (
    <DialogContent className="text-center">
      <Toaster richColors />{" "}
      <div className="flex mt-2">
        <Button
          className="bg-slate-100 rounded-full shadow-2xl text-black px-6 font-normal text-md hover:bg-slate-200 mx-auto"
          onClick={() => handleClick()}
        >
          <AddAPhoto fontSize="small" className="mr-2" />
          upload
        </Button>
      </div>
      <Form {...formUpload}>
        <form
          onSubmit={formUpload.handleSubmit(onSubmitUpload, (err) => console.log(err))}
          encType="multipart/form-data"
        >
          <FormField
            control={formUpload.control}
            name="file"
            render={() => (
              <FormItem>
                <FormControl>
                  <Input
                    ref={hiddenFileInput}
                    className="hidden"
                    type="file"
                    id="file"
                    onChange={(value) => handleChange(value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="mx-auto mt-2" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
};

export default UploadProvePayment;
