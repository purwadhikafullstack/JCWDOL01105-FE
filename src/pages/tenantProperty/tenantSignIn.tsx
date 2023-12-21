import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginTenant from "@/components/auth/LoginTenant";
import RegisterTenant from "@/components/auth/RegisterTenant";
import { Navigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "@/app/AuthContext";

const TenantSignIn = () => {
  const { isLogin } = useContext(AuthContext);

  if (isLogin) {
    return <Navigate to={"/tenant"} />;
  }

  return (
    <div className="border rounded-xl p-10 flex flex-col sm:flex-row h-full items-center justify-center text-center">
      <Tabs defaultValue="register" className="w-[500px] h-screen">
        <TabsList className="flex">
          <TabsTrigger value="register" className="w-[250px]">
            Register
          </TabsTrigger>
          <TabsTrigger value="login" className="w-[250px]">
            Login
          </TabsTrigger>
        </TabsList>
        <TabsContent value="register">
          <RegisterTenant />
        </TabsContent>
        <TabsContent value="login">
          <LoginTenant />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TenantSignIn;
