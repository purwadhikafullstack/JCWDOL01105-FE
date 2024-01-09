import { useAppSelector } from "@/lib/features/hook";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { random } from "@/lib/features/globalReducer";
import { useEffect, useRef } from "react";
import Login from "./Login";
import Register from "./Register";
import { Toaster } from "sonner";

const AuthUser = ({ tab }: { tab?: string }) => {
  const rand = useAppSelector(random);
  const loginRef = useRef<HTMLButtonElement>(null);
  const handleClick = () => {
    if (loginRef.current) loginRef.current.focus();
  };

  useEffect(() => {
    handleClick();
  }, [rand]);

  return (
    <div className="space-y-4">
      <Toaster richColors />
      <p className="text-2xl">Selamat Datang di Lawang</p>
      <Tabs defaultValue={tab} className="space-y-8">
        <TabsList className="flex w-full">
          <TabsTrigger className="w-full" value="register">
            Daftar
          </TabsTrigger>
          <TabsTrigger className="w-full" value="login" ref={loginRef}>
            Masuk
          </TabsTrigger>
        </TabsList>
        <TabsContent value="register">
          <Register />
        </TabsContent>
        <TabsContent value="login">
          <Login />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthUser;
