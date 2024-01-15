import {
  ChevronLeft,
  CleaningServices,
  GppGood,
  SentimentVerySatisfied,
  SupportAgent,
  StarRate,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { FormItem, FormControl, FormMessage, FormField, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { Link } from "react-router-dom";
import { DialogTrigger } from "./ui/dialog";
import { useState } from "react";
import icon from "@/assets";

const LoginOauth = ({ googleAuth }: { googleAuth: Function }) => {
  const oauth = [
    { icon: icon.google, fn: () => googleAuth() },
    { icon: icon.facebook, fn: () => {} },
    { icon: icon.x, fn: () => {} },
  ];

  return (
    <div className="flex justify-between">
      {oauth.map((btn, i) => (
        <Button
          className="bg-white hover:bg-white text-black border items-center flex text-md flex-grow p-6 mx-4"
          onClick={btn.fn}
          key={i}
        >
          <div className="flex items-center">
            <img className="w-6" src={btn.icon} alt="" />
          </div>
        </Button>
      ))}
    </div>
  );
};

const ButtonCounter = ({ desc, fn }: { desc: string; fn: () => void }) => {
  return (
    <Button className="bg-white hover:bg-slate-200 text-slate-500 rounded-full border" onClick={fn}>
      {desc}
    </Button>
  );
};

const HeaderBack = ({ desc }: { desc: string }) => {
  const navigate = useNavigate();
  return (
    <div className="flex relative items-center">
      <div className="hover:bg-slate-100 rounded-full p-2 cursor-pointer" onClick={() => navigate(-1)}>
        <ChevronLeft fontSize="large" />
      </div>
      <span className="text-2xl md:text-3xl lg:text-4xl font-medium">{desc}</span>
    </div>
  );
};

const ReviewPointA = ({ desc, score }: { desc: string; score: string }) => {
  return (
    <div>
      {desc === "rating" ? (
        <StarRate className="mb-2" sx={{ fontSize: "40px" }} />
      ) : desc === "kebersihan" ? (
        <CleaningServices className="mb-2" sx={{ fontSize: "40px" }} />
      ) : desc === "keamanan" ? (
        <GppGood className="mb-2" sx={{ fontSize: "40px" }} />
      ) : desc === "pelayanan" ? (
        <SupportAgent className="mb-2" sx={{ fontSize: "40px" }} />
      ) : desc === "kepuasan" ? (
        <SentimentVerySatisfied className="mb-2" sx={{ fontSize: "40px" }} />
      ) : (
        "INVALID"
      )}
      <p>{desc}</p>
      <p>{score}</p>
    </div>
  );
};

const ReviewPointB = ({ desc, score }: { desc: string; score: string }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        {desc === "rating" ? (
          <StarRate className="mb-2" sx={{ fontSize: "32px" }} />
        ) : desc === "kebersihan" ? (
          <CleaningServices className="mb-2" sx={{ fontSize: "32px" }} />
        ) : desc === "keamanan" ? (
          <GppGood className="mb-2" sx={{ fontSize: "32px" }} />
        ) : desc === "pelayanan" ? (
          <SupportAgent className="mb-2" sx={{ fontSize: "32px" }} />
        ) : desc === "kepuasan" ? (
          <SentimentVerySatisfied className="mb-2" sx={{ fontSize: "32px" }} />
        ) : (
          "INVALID"
        )}
        <p>{desc}</p>
      </div>
      <p>{score}</p>
    </div>
  );
};

const MenuLink = ({ desc, link, model = "a" }: { desc: string; link: string; model?: string }) => {
  return (
    <DropdownMenuItem className={`${model === "a" ? "font-medium" : "font-thin"} text-md  py-2 cursor-pointer`}>
      <Link className="w-full" to={link}>
        {desc}
      </Link>
    </DropdownMenuItem>
  );
};

const TriggerBiodataUpdate = () => {
  return <DialogTrigger className="italic hover:underline hover:cursor-pointer font-thin text-lg">Ubah</DialogTrigger>;
};

const OrderStatus = ({ status }: { status: string }) => {
  return (
    <p
      className={`${
        status === "unpaid"
          ? "bg-yellow-400"
          : status === "unconfirm"
          ? "bg-yellow-600"
          : status === "success"
          ? "bg-green-600"
          : "bg-[#D80032]"
      } text-slate-100 border rounded-full px-4 shadow-xl font-thin`}
    >
      {status === "unpaid"
        ? "belum bayar"
        : status === "unconfirm"
        ? "diproses"
        : status === "success"
        ? "sukses"
        : status === "expired"
        ? "kadaluarsa"
        : status === "cancel"
        ? "dibatalkan"
        : "ditolak"}
    </p>
  );
};

const FormInput = ({ form, name, desc }: { form: any; name: string; desc?: string }) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input type="text" id={name} {...field} placeholder={desc} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const FormInputPassword = ({ form, name }: { form: any; name: string }) => {
  const [show, setShow] = useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <FormItem className="flex relative">
              <Input type={`${show ? "text" : "password"}`} id={name} placeholder="Password" {...field} />
              <FormLabel className="absolute right-2" onClick={() => setShow(!show)}>
                {show ? <Visibility /> : <VisibilityOff />}
              </FormLabel>
            </FormItem>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export {
  LoginOauth,
  ButtonCounter,
  HeaderBack,
  ReviewPointA,
  ReviewPointB,
  MenuLink,
  TriggerBiodataUpdate,
  OrderStatus,
  FormInput,
  FormInputPassword,
};
