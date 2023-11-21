import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"

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


  import { useGetAPI , usePostApi} from "@/lib/service";

const initialPropertyData ={

    name : "",
    description:"",
    image_url:"",
}

const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  })





const AddProperty : React.FC =()=>{

    const form = useForm({defaultValues:initialPropertyData})

    const [propertyData, setPropertyData ] =useState(initialPropertyData);

    console.log("bruh");


    const onSubmit=(values:any)=>
    {
        console.log(values);
    }

    
    const {mutate}=usePostApi("/api/propertyList")


    return (
  

<Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
             Ini nama properti Anda
              </FormDescription>
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
        <Button type="submit">Submit</Button>
      </form>
      </Form>
    
    );
}

export default AddProperty;