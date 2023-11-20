import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { Plus, X, ArrowLeft, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useNavigate } from "react-router-dom";
import LocationField from "@/components/location/LocationField.js";
import { SelectTrigger, Select, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useGetAPI } from "@/lib/service";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const emptyForm = {
  name: "",
  provinces: "",
  regency: "",
  district: "",
  address: "",
  date: new Date(),
  time: {
    hours: "0",
    minutes: "0",
    type: "PM",
  },
  description: "",
  type: "free",
  price: "",
  tags: [],
  file: "",
  province: "",
  regency: "",
  district: "",
};
import { useLocation } from "@/lib/hook/useLocation";
const Location = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const form = useForm({
    // resolver: zodResolver(formSchema),
    defaultValues: emptyForm,
  });

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset(emptyForm);
    }
  }, [form]);

  const handleChange = (name, value) => {
    form.setValue(name, value);
  };

  const { data: provincies, isFetched } = useQuery({
    queryKey: ["provincies"],
    queryFn: async () => await axios.get("https://anwaraan.github.io/api-wilayah-indonesia/api/provinces.json"),
  });
  const proviceData = isFetched && provincies?.data;
  type IProvincies = typeof proviceData;
  type IRegencies = typeof regencies;
  type IDistricts = typeof districts;
  const { data: regencies } = useLocation("regencies", "11");
  const { data: districts } = useLocation("districts", "1105");
  console.log(isFetched && provincies?.data);
  const onSubmit = (values: any) => {
    // setTags([]);
    // const formData = new FormData();
    // formData.append("file", values.file);
    // mutate({
    //   ...values,
    //   price: values.type === "free" ? 0 : values.price,
    //   isOnline: values.location.isOnline,
    //   province: values.location.province,
    //   regency: values.location.regency,
    //   district: values.location.district,
    //   address: values.location.address,
    //   date: new Date(values.date).getTime(),
    //   time: `${values.time.hours}:${values.time.minutes} ${values.time.type.toUpperCase()}`,
    //   userId: userId,
    // });
  };

  return (
    <div className="w-full space-y-4 border rounded-md p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, (err) => console.log(err))}>
          <LocationField form={form} />
        </form>
      </Form>
    </div>
  );
};

export default Location;
