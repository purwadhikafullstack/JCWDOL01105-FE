import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "@/lib/hook/useLocation";
import SelectLocation from "./SelectLocation";
import axios from "axios";

const LocationField = ({ form }: { form: any }) => {
  const [locationId, setLocationId] = useState({
    regency: "",
    province: "",
    district: "",
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
  type IDistricts = typeof districts;
  const { data: regencies } = useLocation("regencies", locationId.province);
  const { data: districts } = useLocation("districts", locationId.regency);

  return (
    <>
      {isFetched && (
        <div className="flex justify-between">
          <div>
            <SelectLocation
              label="province"
              locations={provincies?.data}
              form={form}
              onChange={(value: IProvincies) => handleSelectOnChange("province", value)}
            />
          </div>

          {regencies ? (
            <div>
              <SelectLocation
                label="regency"
                locations={regencies}
                form={form}
                onChange={(value: IRegencies) => handleSelectOnChange("regency", value)}
              />
            </div>
          ) : (
            <Skeleton className="h-10 w-[180px] p-4 self-end" />
          )}
          {districts ? (
            <div>
              <SelectLocation
                label="district"
                locations={districts}
                form={form}
                onChange={(value: IDistricts) => handleSelectOnChange("district", value)}
              />
            </div>
          ) : (
            <Skeleton className="h-10 w-[180px] p-4 self-end" />
          )}
        </div>
      )}
    </>
  );
};

export default LocationField;
