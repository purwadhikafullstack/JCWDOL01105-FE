import { Form, FormControl, FormItem, FormMessage, FormField, FormLabel } from "@/components/ui/form";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { changePasswordSchema } from "@/lib/schema";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Privacy = () => {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);

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

  const onSubmit = (value: IForm) => {};

  return (
    <div className="border rounded-xl p-10 flex flex-row">
      <div className="w-full lg:w-1/2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, (err) => console.log(err))} encType="multipart/form-data">
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem className="my-3">
                  <FormLabel className="font-semibold">Password Lama</FormLabel>
                  <FormControl>
                    <FormItem className="flex relative">
                      <Input
                        className="h-12"
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
                  <FormLabel className="font-semibold">Password Baru</FormLabel>
                  <FormControl>
                    <FormItem className="flex relative">
                      <Input
                        className="h-12"
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
                  <FormLabel className="font-semibold">Konfirmasi Password</FormLabel>
                  <FormControl>
                    <FormItem className="flex relative">
                      <Input
                        className="h-12"
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
            <Button className="mx-auto mt-2" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Privacy;
