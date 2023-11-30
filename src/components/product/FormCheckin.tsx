import { DateRangePicker } from "../ui/date-range-picker";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { setGuest } from "@/lib/features/globalReducer";
import { useAppDispatch } from "@/lib/features/hook";
import { setDate } from "@/lib/features/globalReducer";

interface IData {
  rooms: { id: number; person: number | string }[];
}
const FormCheckin: React.FC<IData> = ({ rooms }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="p-4 border rounded-xl">
      <Label className="text-xl">Cari Kamar</Label>
      <DateRangePicker
        onUpdate={(values) => dispatch(setDate(values.range))}
        initialDateFrom={new Date()}
        initialDateTo={new Date(new Date().getTime() + 24 * 36 * 1e5)}
        align="start"
        locale="en-GB"
        showCompare={false}
      />

      <Select onValueChange={(value) => dispatch(setGuest(value))}>
        <SelectTrigger className="w-full md:w-1/2 h-12 mt-4 flex md:px-6 lg:px-10">
          <SelectValue placeholder="Jumlah Tamu" />
        </SelectTrigger>
        <SelectContent side="right">
          <SelectGroup>
            {rooms.map((room) => {
              return (
                <SelectItem key={room.id} value={room.person as string} defaultValue={10}>
                  {room.person}
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
