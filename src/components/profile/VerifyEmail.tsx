import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { toast, Toaster } from "sonner";
import { useState, useEffect, useContext } from "react";
import { usePostApi } from "@/lib/service";
import { Input } from "../ui/input";
import { AuthContext } from "@/app/AuthContext";

interface IData {
  data: { email: string; email_verified: string };
}

const VerifyEmail: React.FC<IData> = ({ data }) => {
  const { id, token } = useContext(AuthContext);
  const [otp, setOtp] = useState("");
  const { mutate } = usePostApi(`/api/user/id/${id}`);
  const { mutate: otpRequest, isSuccess, data: request } = usePostApi(`/api/user/otp/request`);

  const {
    mutate: verify,
    isSuccess: verifyIsSuccess,
    isError: verifyIsError,
    error: verifyError,
  } = usePostApi(`/api/user/verify-email`, { headers: { Authorization: `Bearer ${token}` } });
  const handleRequest = () => {
    otpRequest({ email: data.email });
  };

  const handleVerify = () => {
    verify({ email: data?.email, otp: otp });
  };

  useEffect(() => {
    if (verifyIsSuccess) {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      toast.success("Verifikasi berhasil");
    }
    if (verifyIsError) {
      toast.error(verifyError?.response.data.message);
    }
  }, [verifyIsError, verifyIsSuccess]);

  useEffect(() => {
    if (isSuccess) {
      toast(request.message);
    }
  }, [request]);

  return (
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
          <DialogDescription className="">Cek email Anda untuk mendapatkan kode OTP verifikasi email</DialogDescription>
        </DialogHeader>
        <div className="flex items-end">
          <Input
            className="h-16 w-48 text-4xl text-slate-400 tracking-[8px]"
            type="text"
            placeholder="______"
            maxLength={6}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOtp(e.target.value)}
          />
          <p className="ml-2 font-medium italic hover:underline cursor-pointer text-sm" onClick={() => handleRequest()}>
            kirim ulang
          </p>
        </div>

        <Button onClick={() => handleVerify()}>Verifikasi</Button>
      </DialogContent>
      <Toaster richColors />
    </Dialog>
  );
};

export default VerifyEmail;
