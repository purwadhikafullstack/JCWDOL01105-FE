import { DateRangePicker } from "../ui/date-range-picker";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { setGuest } from "@/lib/features/globalReducer";
import { useAppDispatch } from "@/lib/features/hook";
import { setDate } from "@/lib/features/globalReducer";

interface IData {
  rooms: { id: number; guest: number | string }[];
}
const FormCheckin: React.FC<IData> = ({ rooms }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="p-4 border rounded-xl space-y-4">
      <Label className="text-xl">Cari Kamar</Label>
      <DateRangePicker
        onUpdate={(values) =>
          dispatch(
            setDate({
              from: values.range.from.setHours(14, 0, 0, 0),
              to: values.range.to
                ? values.range.to?.setHours(12, 0, 0, 0)
                : new Date(new Date().getTime() + 24 * 36e5).setHours(12, 0, 0, 0),
            })
          )
        }
        initialDateFrom={new Date()}
        initialDateTo={new Date(new Date().getTime() + 24 * 36 * 1e5)}
        align="start"
        locale="en-GB"
        showCompare={false}
      />

      <Select onValueChange={(value) => dispatch(setGuest(value))}>
        <SelectTrigger className="w-full md:w-[49%] h-12 mt-4 flex md:px-6 lg:px-10">
          <SelectValue placeholder="JUMLAH TAMU" />
        </SelectTrigger>
        <SelectContent side="right">
          <SelectGroup>
            <SelectItem key={100} value={"100"}>
              SEMUA
            </SelectItem>
            {rooms.map((room) => {
              return (
                <SelectItem key={room.id} value={room.guest as string} defaultValue={10}>
                  {room.guest}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FormCheckin;
