import { DialogContent, DialogHeader, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormMessage, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registeSchema } from "@/lib/schema";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import icon from "@/assets";

const Register = () => {
  const [show, setShow] = useState(false);
  const initForm = {
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  };

  type FormType = typeof initForm;
  const form = useForm({
    resolver: zodResolver(registeSchema),
    defaultValues: initForm,
  });

  const onSubmit = (values: FormType) => {
    console.log(values);
  };
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Daftar</DialogTitle>
        <DialogDescription>Selamat Datang di Lawang</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, (err) => console.log(err))}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="my-2">
                <FormControl>
                  <Input type="text" id="name" placeholder="Nama lengkap" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="my-2">
                <FormControl>
                  <Input type="text" id="email" placeholder="Alamat email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="my-2">
                <FormControl>
                  <FormItem className="flex relative">
                    <Input type={`${show ? "text" : "password"}`} id="password" placeholder="Password" {...field} />
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
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="my-2">
                <FormControl>
                  <Input type="text" id="phoneNumber" placeholder="Nomor telepon" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <div className="flex justify-center"> */}
          <Button type="submit">Submit</Button>
          {/* </div> */}
        </form>
      </Form>

      <Button className="bg-white hover:bg-white text-black border items-center flex">
        <div className="flex w-full items-center">
          <img className="w-6" src={icon.google} alt="" />
          <span className="mx-auto">Masuk dengan Google</span>
        </div>
      </Button>

      <Button className="bg-white hover:bg-white text-black border items-center flex">
        <div className="flex w-full items-center">
          <img className="w-6" src={icon.facebook} alt="" />
          <span className="mx-auto">Masuk dengan Facebook</span>
        </div>
      </Button>

      <Button className="bg-white hover:bg-white text-black border items-center flex">
        <div className="flex w-full items-center">
          <img className="w-6" src={icon.x} alt="" />
          <span className="mx-auto">Masuk dengan X</span>
        </div>
      </Button>
    </DialogContent>
  );
};

export default Register;
