import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "@/lib/hook/useLocation";
import SelectLocation from "./SelectLocation";
import axios from "axios";

const LocationField = ({ form }: { form: any }) => {
  console.log(form);
  const [locationId, setLocationId] = useState({
    regency: "",
    province: "",
  });

  const handleSelectOnChange = (label: any, value: any) => {
    form.setValue(`${label}`, value);
    setLocationId({ ...locationId, [label]: value });
  };

  const { data: provincies, isFetched } = useQuery({
    queryKey: ["provincies"],
    queryFn: async () => await axios.get("https://anwaraan.github.io/api-wilayah-indonesia/api/provinces.json"),
  });
  const proviceData = isFetched && provincies?.data;
  type IProvincies = typeof proviceData;
  type IRegencies = typeof regencies;
  // type IDistricts = typeof districts;
  const { data: regencies } = useLocation("regencies", locationId.province);
  const { data: districts } = useLocation("districts", locationId.regency);

  return (
    <>
      {isFetched && (
        <div>
          <SelectLocation
            label="provinsi"
            locations={provincies?.data}
            form={form}
            onChange={(value: IProvincies) => handleSelectOnChange("province", value)}
          />
          {regencies ? (
            <SelectLocation
              label="kabupaten"
              locations={regencies}
              form={form}
              onChange={(value: IRegencies) => handleSelectOnChange("regency", value)}
            />
          ) : (
            <Skeleton className="h-10 w-[100px] p-4 self-end" />
          )}
          {districts ? (
            <SelectLocation label="kecamatan" locations={districts} form={form} />
          ) : (
            <Skeleton className="h-10 w-[100px] p-4 self-end" />
          )}
        </div>
      )}
    </>
  );
};

export default LocationField;
