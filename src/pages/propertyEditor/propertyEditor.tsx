import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { useUpdateApi } from '@/lib/service';
import MainNavBarTenant from '@/components/mainNavBarTenant/mainNavBarTenant';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"

  const initialPropertyData = {

    name: "",
    description: "",
    image_url: "",
  }


const PropertyEditor: React.FC = () => {


    console.log("Property Editor");

    const form = useForm({defaultValues: initialPropertyData,})
    const {id}=useParams();
    console.log(id);

    const config = {
        headers: {
          Accept: 'multipart/form-data'
        }
      }
    
    
      const { mutate } = useUpdateApi(`/api/propertyList/${id}`, config)
    
    
      const onSubmit = async (values: any) => {
        console.log("ini testing values :",values);
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
          console.error("Error editing property data:", error);
        }
    
      }



    return (
        <>
            <MainNavBarTenant />
            <br />

            <Tabs defaultValue="account" className="w-[400px]">
                <TabsList>
                    <TabsTrigger value="property">Property</TabsTrigger>
                    <TabsTrigger value="room">Ruangan</TabsTrigger>
                </TabsList>
                <TabsContent value="property">
                <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" encType="multipart/form-data">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Baru Properti Anda</FormLabel>
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
                <FormLabel>Deskripsi Terbaru Properti Anda</FormLabel>
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
                <FormLabel>URL Terbaru Gambar Properti Anda</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan Link Gambar Properti Anda" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Confirm</Button>
        </form>
      </Form>

                </TabsContent>
                <TabsContent value="room">Change your room here.</TabsContent>
            </Tabs>





        </>

    );
}

export default PropertyEditor;



