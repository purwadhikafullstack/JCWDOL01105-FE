import { AuthContext } from "@/app/AuthContext";
import { useContext, useEffect, useState, useRef } from "react";
import { useGetAPI, usePostApi } from "@/lib/service";
import { Form, FormControl, FormItem, FormMessage, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/lib/features/hook";
import { Button } from "@/components/ui/button";
import { uploadImageSchema } from "@/lib/schema";
import { AddAPhoto } from "@mui/icons-material";
import { setRand } from "@/lib/features/globalReducer";
import { random } from "@/lib/features/globalReducer";
import Biodata from "@/components/profile/Biodata";
import VerifyEmail from "@/components/profile/VerifyEmail";

const Profile = () => {
  const { id, imageUrl } = useContext(AuthContext);
  const { data, isFetched, refetch } = useGetAPI(`/api/user/id/${id}`, "user-profile");

  const dispathc = useAppDispatch();
  const rand = useAppSelector(random);

  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    if (hiddenFileInput.current) hiddenFileInput.current.click();
  };

  const formUpload = useForm({
    resolver: zodResolver(uploadImageSchema),
  });
  const handleChange = (name: any, value: React.ChangeEvent<HTMLInputElement> | File) => {
    formUpload.setValue(name, value);
  };

  const onSubmitUpload = (values: any) => {
    const formData = new FormData();
    formData.append("file", values.file);
  };

  useEffect(() => {
    refetch();
  }, [rand]);

  return (
    <div className="border rounded-xl p-10 flex flex-col sm:flex-row">
      <div className="w-full mb-10 sm:w-1/3">
        <div>
          <img src={imageUrl as string} alt="" className="w-[250px] rounded-full mx-auto" />
          <div className="flex mt-2">
            <Button
              className="bg-slate-100 rounded-full shadow-2xl text-black px-6 font-normal text-md hover:bg-slate-200 mx-auto hidden"
              onClick={() => handleClick()}
            >
              <AddAPhoto fontSize="small" className="mr-2" />
              upload
            </Button>
          </div>
        </div>

        <div className="text-center mb-10">
          <Form {...formUpload}>
            <form
              onSubmit={formUpload.handleSubmit(onSubmitUpload, (err) => console.log(err))}
              encType="multipart/form-data"
            >
              <FormField
                control={formUpload.control}
                name="file"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <Input
                        ref={hiddenFileInput}
                        className="hidden"
                        type="file"
                        id="file"
                        form={formUpload}
                        onChange={(value) => handleChange("file", value.target.files[0])}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="mx-auto mt-2 hidden" type="submit" onClick={() => dispathc(setRand(Math.random()))}>
                Submit
              </Button>
            </form>
          </Form>
        </div>

        {isFetched && (
          <div className="lg:mx-auto text-center">
            <p className="italic font-thin">
              {data.email_verified ? "Email telah diverifikasi" : "Email belum diverifikasi"}
            </p>
            <VerifyEmail data={data} />
          </div>
        )}
      </div>

      {isFetched && (
        <div className="w-full sm:w-2/3 sm:px-8 md:px-12 lg:px-16">
          <Biodata data={data} />
        </div>
      )}
    </div>
  );
};

export default Profile;
