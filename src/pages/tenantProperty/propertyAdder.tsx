import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import MainNavBarTenant from '@/components/mainNavBarTenant/mainNavBarTenant';
import { formAddPropertySchema } from '@/lib/schema';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"


import { useGetAPI, usePostApi } from "@/lib/service";

const initialPropertyData = {

  name: "",
  description: "",
  image_url: "",
}



const AddProperty: React.FC = () => {

  
  console.log("Proptery Adder");

  // const form = useForm({defaultValues: initialPropertyData, resolver: zodResolver(formAddPropertySchema)})
  const form = useForm({defaultValues: initialPropertyData,})
  // const {reset} = useForm();
  // const form = {formState : formState, reset : reset, setValue : setValue, handleSubmit : handleSubmit, control : control}
    // const { isDirty, isValid } = formState;

  const [propertyData, setPropertyData] = useState(initialPropertyData);

  const config = {
    headers: {
      Accept: 'multipart/form-data'
    }
  }


  const { mutate } = usePostApi("/api/propertyList", config)


  const onSubmit = async (values: any) => {
    console.log(values);
    try {
      // Call the mutate function to make the POST request
      await mutate({ ...values });

      form.reset();
      // form.setValue("name","");
      // form.setValue("description","");
      // form.setValue("image_url","");
    }
    catch (error) {
      // Handle any errors that may occur during the API call
      console.error("Error posting property data:", error);
    }

  }

  return (
    <>
      <MainNavBarTenant />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" encType="multipart/form-data">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Properti</FormLabel>
                <FormControl>
                  <Input placeholder="Nama Properti Anda" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deskripsi Properti</FormLabel>
                <FormControl>
                  <Input placeholder="Deskripsikan Properti Anda" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL Gambar Properti</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan Link Gambar Properti Anda" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}

export default AddProperty;