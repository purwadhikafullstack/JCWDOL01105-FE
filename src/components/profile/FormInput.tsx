import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Form, FormControl, FormMessage, FormField, FormItem } from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import React from "react";

interface IFormInput {
  description: string;
  form: any;
  name: string;
  handleClick: () => void;
}

const onSubmit = (values: any) => {
  console.log("this", values);
};

const FormInput: React.FC<IFormInput> = ({ description, form, name }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <p className="italic hover:underline hover:cursor-pointer font-medium">Edit</p>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, (err: any) => console.log(err))} encType="multipart/form-data">
            <DialogHeader>
              <DialogTitle className="mb-4">{description}</DialogTitle>
              <DialogDescription>Pastikan data yang kamu input valid</DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name={`${name}`}
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormControl>
                    <Input type="text" id={`${name}`} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="text-xl font-semibold">
              Simpan
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FormInput;
