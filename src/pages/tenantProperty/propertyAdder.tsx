import React, { useContext, useEffect, useState, useRef } from 'react';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import MainNavBarTenant from '@/components/mainNavBarTenant/mainNavBarTenant';
import { formPropertySchema } from '@/lib/schema';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import ProtectedRouteTenant from "@/components/auth/ProtectedRouteTenant";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { AddAPhoto } from "@mui/icons-material";
import { useGetAPI, usePostApi} from "@/lib/service";
import { useNavigate } from 'react-router';
import { AuthContext } from '@/app/AuthContext';




const AddProperty: React.FC = () => {

  console.log("Proptery Adder");
  // const form = useForm({defaultValues: initialPropertyData, resolver: zodResolver(formPropertySchema)})
  const form = useForm({ resolver: zodResolver(formPropertySchema) })
  // const formUpload =useForm({resolver:zodResolver(uploadImageSchema)});
  const { token } = useContext(AuthContext);
  ///////////////////////////////////////
  const [search, setSearch] = useState("");
  const [queryLocation, setQueryLocation] = useState("kota");
  const [location, setLocation] = useState("");
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const {
    data: locations,
    isFetched,
    refetch,
  } = useGetAPI(`/api/property/location?city=${queryLocation}`, "get-location");

  const handleChangeLocation = (e: React.FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
    setQueryLocation(e.currentTarget.value);
  };

  useEffect(() => {
    refetch();
  }, [search, queryLocation]);
  ////////////////////////////////////////

  const handleClick = () => {
    if (hiddenFileInput.current) hiddenFileInput.current.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const selectedFiles = files as FileList;
    form.setValue("file", selectedFiles[0]);
  };


  const config = {
    headers: {
      "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`
    },
  }

  const { mutate, isSuccess, isError } = usePostApi(`/api/propertyList`, config)


  const navigate = useNavigate();

  const onSubmit = async (values: any) => {

    try {
      // Call the mutate function to make the POST request
      const formData = new FormData();
      formData.append("file", values.file);
      await mutate({ ...values });
    }
    catch (error) {
      // Handle any errors that may occur during the API call
      console.error("Error posting property data:", error);
    } 
  }
  useEffect(() => {
    if (isSuccess) {
      form.reset();
      setTimeout(() => { navigate("/tenant") }, 50)
    }
  }, [isSuccess, isError])

  return (
    <ProtectedRouteTenant>
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
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pilih Kategori Properti</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={""}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1" id="1" />
                        <Label htmlFor="option-one">Villa</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="2" id="2" />
                        <Label htmlFor="option-two">Hotel</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="3" id="3" />
                        <Label htmlFor="option-two">Apartment</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <FormLabel>Pilih Gambar Properti</FormLabel>
              <div className="flex mt-2">
                <Button type="button"
                  className="bg-slate-100 rounded-full shadow-2xl text-black px-6 font-normal text-md hover:bg-slate-200 "
                  onClick={() => handleClick()}
                >
                  <AddAPhoto fontSize="small" className="mr-2" />
                  Upload
                </Button>
              </div>
            </div>
            <FormField
              control={form.control}
              name="file"
              render={() => (
                <FormItem>
                  <FormControl>
                    <Input
                      ref={hiddenFileInput}
                      className="hidden"
                      type="file"
                      id="file"
                      onChange={(value) => handleChange(value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem >
                  <FormControl>
                    <FormItem>
                      <Command className="w-[400px] md:w-[500px] lg:w-[600px]">
                        <CommandInput
                          placeholder="Cari lokasi..."
                          onChangeCapture={(e) => handleChangeLocation(e)}
                          value={search}
                        />
                        <CommandEmpty className={`${search.length > 0 ? "" : "hidden"} font-thin pt-4`}>
                          Lokasi tidak ditemukan....
                        </CommandEmpty>
                        <CommandGroup>
                          {isFetched &&
                            search.length > 0 &&
                            locations.map((location: any) => (
                              <CommandItem
                                key={location.id}
                                onSelect={() => {
                                  setLocation(location.city);
                                  // Update the form value when a CommandItem is selected
                                  field.onChange(location.city);
                                  // Clear the search
                                  setSearch("");
                                }}
                                {...field}
                              >
                                {location.city}
                              </CommandItem>
                            ))}
                        </CommandGroup>
                      </Command>
                      <Label className={`${location ? "hidden" : ""} text-sm font-thin`}>
                        Masukkan lokasi properti yang akan disewakan
                      </Label><Label className={`${location ? "" : "hidden"} text-sm font-thin`}>
                       {location}
                      </Label>
                    </FormItem>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" >Submit</Button>
          </form>
        </Form>
      </>
    </ProtectedRouteTenant>
  );
}

export default AddProperty;