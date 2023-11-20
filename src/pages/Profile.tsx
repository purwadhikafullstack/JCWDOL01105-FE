import { AuthContext } from "@/app/AuthContext";
import { useContext, useEffect, useState, useRef } from "react";
import { useGetAPI, usePostApi } from "@/lib/service";
import { Form, FormControl, FormItem, FormLabel, FormMessage, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/lib/features/hook";
import { Button } from "@/components/ui/button";
import { uploadImageSchema } from "@/lib/schema";
import { AddAPhoto } from "@mui/icons-material";
import { setRand } from "@/lib/features/globalReducer";
import { random } from "@/lib/features/globalReducer";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { toast, Toaster } from "sonner";

const Profile = () => {
  const { id, imageUrl } = useContext(AuthContext);
  const { data, isFetched, refetch } = useGetAPI(`/api/user/id/${id}`, "user-profile");
  const [otp, setOtp] = useState("");
  const { mutate } = usePostApi(`/api/user/id/${id}`);
  const { mutate: otpRequest } = usePostApi(`/api/user/otp/request`);
  const {
    mutate: verify,
    isSuccess: verifyIsSuccess,
    isError: verifyIsError,
    error: verifyError,
  } = usePostApi(`/api/user/verify-email`);
  const dispathc = useAppDispatch();
  const rand = useAppSelector(random);

  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    if (hiddenFileInput.current !== null) hiddenFileInput.current.click();
  };

  const formUpload = useForm({
    resolver: zodResolver(uploadImageSchema),
  });

  const handleChange = (name: any, value: React.ChangeEvent<HTMLInputElement> | File) => {
    formUpload.setValue(name, value);
  };

  const onSubmitUpload = (values: any) => {
    const formData = new FormData();
    formData.append("file", values.file);
    // mutate({...values});
  };

  const handleRequest = () => {
    otpRequest({ email: data.email });
  };

  const handleVerify = () => {
    verify({ email: data?.email, otp: otp });
  };
  // console.log(data.email);

  useEffect(() => {
    if (verifyIsSuccess) {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      toast.success("Verifikasi berhasil");
    }
    if (verifyIsError) {
      console.log(verifyError?.response.data.message);
      toast.error(verifyError?.response.data.message);
    }
    refetch();
  }, [refetch, verifyIsError, verifyIsSuccess]);
  return (
    <div className="border rounded-xl p-10 flex flex-row">
      <div className="w-1/3">
        <div className="">
          <img src={imageUrl as string} alt="" className="w-[250px] rounded-full mx-auto" />
          <div className="flex mt-2">
            <Button
              className="bg-slate-100 rounded-full shadow-2xl text-black px-6 font-normal text-md hover:bg-slate-200 mx-auto"
              onClick={() => handleClick()}
            >
              <AddAPhoto fontSize="small" className="mr-2" />
              upload
            </Button>
          </div>
        </div>

        <div className="text-center mb-10">
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
                        form={formUpload}
                        onChange={(value) => handleChange("file", value.target.files[0])}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="mx-auto mt-2 bg-[#3FC1C9]"
                type="submit"
                onClick={() => dispathc(setRand(Math.random()))}
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>

        {isFetched && (
          <div className="mx-auto text-center">
            <p className="italic font-thin">
              {data.email_verified ? "Email telah diverifikasi" : "Email belum diverifikasi"}
            </p>
            <Dialog>
              <DialogTrigger
                className={data?.email_verified ? "hidden" : "mx-auto hover:underline"}
                onClick={() => handleRequest()}
              >
                Minta Verifikasi
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Masukkan Kode OTP</DialogTitle>
                  <DialogDescription className="">
                    Cek email Anda untuk mendapatkan kode OTP verifikasi email
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-end">
                  <Input
                    className="h-16 w-48 text-4xl text-slate-400 tracking-[8px]"
                    type="text"
                    placeholder="______"
                    maxLength={6}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOtp(e.target.value)}
                  />
                  <p
                    className="ml-2 font-medium italic hover:underline cursor-pointer text-sm"
                    onClick={() => handleRequest()}
                  >
                    kirim ulang
                  </p>
                </div>

                <Button onClick={() => handleVerify()}>Verifikasi</Button>
              </DialogContent>
              <Toaster richColors />
            </Dialog>
          </div>
        )}
      </div>

      {isFetched && (
        <div className="w-2/3 px-20">
          <div className="flex justify-end">
            <p className="cursor-pointer hover:underline">Edit</p>
          </div>

          <div className="my-6">
            <p className="text-lg font-medium">Nama Lengkap</p>
            <p className="text-lg font-thin">{data.name}</p>
          </div>
          <div className="my-6">
            <p className="text-lg font-medium">Alamat Email</p>
            <p className="text-lg font-thin">{data.email}</p>
          </div>
          <div className="my-6">
            <p className="text-lg font-medium">Alamat</p>
            <p className="text-lg font-thin">{data.address ? data.address : "Tidak ada"}</p>
          </div>
          <div className="my-6">
            <p className="text-lg font-medium">Jenis Kelamin</p>
            <p className="text-lg font-thin">{data.gender ? data.gender : "Tidak ada"}</p>
          </div>
          <div className="my-6">
            <p className="text-lg font-medium">Normor Telepone</p>
            <p className="text-lg font-thin">{data.phone_number ? data.phone_number : "Tidak ada"}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
