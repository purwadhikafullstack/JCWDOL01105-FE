import { Form, FormControl, FormItem, FormMessage, FormField, FormLabel } from "@/components/ui/form";
import { useContext, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { changePasswordSchema } from "@/lib/schema";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useGetAPI, usePostApi } from "@/lib/service";
import { Toaster, toast } from "sonner";
import { AuthContext } from "@/app/AuthContext";

const Privacy = () => {
  const { bearer, logout } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);

  const { mutate, isSuccess, isError, error } = usePostApi("/api/user/update-password", bearer);
  const { data, isFetched } = useGetAPI("/api/user/id", "user-privacy", bearer);

  const initForm = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  type IForm = typeof initForm;
  const form = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: initForm,
  });
  const onSubmit = (values: IForm) => {
    mutate({
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
      confirmPassword: values.confirmPassword,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      form.reset(initForm);
      toast.success("Success Update Password");
      setTimeout(() => {
        logout();
      }, 1000);
    }
    if (isError) {
      toast.error(error.response.data.message);
    }
  }, [isSuccess, isError]);

  return (
    <div className="border rounded-xl p-10 flex flex-row h-full">
      <div className="w-full lg:w-1/2">
        <Toaster richColors />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, (err) => console.log(err))} encType="multipart/form-data">
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem className="my-3">
                  <FormLabel className="font-semibold md:text-lg">Password Lama</FormLabel>
                  <FormControl>
                    <FormItem className="flex relative">
                      <Input
                        className="md:h-12 md:text-lg"
                        type={`${show ? "text" : "password"}`}
                        id="password"
                        placeholder="Password"
                        {...field}
                      />
                      <FormLabel className="absolute right-2" onClick={() => setShow(!show)}>
                        {show ? <Visibility /> : <VisibilityOff />}
                      </FormLabel>
                    </FormItem>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem className="my-3">
                  <FormLabel className="font-semibold md:text-lg">Password Baru</FormLabel>
                  <FormControl>
                    <FormItem className="flex relative">
                      <Input
                        className="md:h-12 md:text-lg"
                        type={`${show2 ? "text" : "password"}`}
                        id="password"
                        placeholder="Password"
                        {...field}
                      />
                      <FormLabel className="absolute right-2" onClick={() => setShow2(!show2)}>
                        {show2 ? <Visibility /> : <VisibilityOff />}
                      </FormLabel>
                    </FormItem>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="my-3">
                  <FormLabel className="font-semibold md:text-lg">Konfirmasi Password</FormLabel>
                  <FormControl>
                    <FormItem className="flex relative">
                      <Input
                        className="md:h-12 md:text-lg"
                        type={`${show3 ? "text" : "password"}`}
                        id="password"
                        placeholder="Password"
                        {...field}
                      />
                      <FormLabel className="absolute right-2" onClick={() => setShow3(!show3)}>
                        {show3 ? <Visibility /> : <VisibilityOff />}
                      </FormLabel>
                    </FormItem>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isFetched && (
              <Button className="mx-auto mt-2 text-xl font-semibold" type="submit" disabled={data.password === null}>
                Submit
              </Button>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Privacy;
