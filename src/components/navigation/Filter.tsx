import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog";
import { Checkbox } from "../ui/checkbox";
import { Tune } from "@mui/icons-material";
import { Label } from "../ui/label";
import { useState } from "react";
import { useAppDispatch } from "@/lib/features/hook";
import { setFilter } from "@/lib/features/globalReducer";
import { Button } from "../ui/button";

const Filter = () => {
  const dispatch = useAppDispatch();

  const prices = [
    { value: "expensive", text: "Tertinggi" },
    { value: "cheap", text: "Terendah" },
  ];
  const sorts = [
    { value: "asc", text: "A-Z" },
    { value: "desc", text: "Z-A" },
  ];

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectApartement, setSelectApartement] = useState("apartement");
  const [selectHotel, setSelectHotel] = useState("hotel");
  const [selectVilla, setSelectVilla] = useState("villa");
  const [selectPrice, setSelectPrice] = useState("cheap");
  const [selectSort, setSelectSort] = useState("asc");

  const onSubmit = () => {
    dispatch(
      setFilter({
        apartement: selectApartement,
        hotel: selectHotel,
        villa: selectVilla,
        price: selectPrice,
        sort: selectSort,
      })
    );
  };

  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogTrigger className="rounded-full w-12 h-12 bg-inherite">
        <Tune className="text-[#FC5185]" />
      </DialogTrigger>
      <DialogContent>
        <div className="space-x-2 items-center">
          <Tune />
          <span>Filter</span>
        </div>

        <div className="flex justify-around">
          <div className="space-y-2">
            <Label>Kategori</Label>
            <div className="flex items-center space-x-2  accent-pink-500">
              <Checkbox
                id={"apartement"}
                checked={selectApartement == "apartement"}
                onClick={() => setSelectApartement(selectApartement ? "" : "apartement")}
              />
              <Label
                htmlFor={"apartement"}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 accent-pink-500"
              >
                {"APARTEMENT"}
              </Label>
            </div>
            <div className="flex items-center space-x-2  accent-pink-500">
              <Checkbox
                id={"hotel"}
                checked={selectHotel == "hotel"}
                onClick={() => setSelectHotel(selectHotel ? "" : "hotel")}
              />
              <Label
                htmlFor={"hotel"}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 accent-pink-500"
              >
                {"HOTEL"}
              </Label>
            </div>
            <div className="flex items-center space-x-2  accent-pink-500">
              <Checkbox
                id={"villa"}
                checked={selectVilla == "villa"}
                defaultValue={"villa"}
                onClick={() => setSelectVilla(selectVilla ? "" : "villa")}
              />
              <Label
                htmlFor={"villa"}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 accent-pink-500"
              >
                {"VILLA"}
              </Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Harga</Label>
            {prices.map((price) => (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={price.value}
                  checked={selectPrice == price.value}
                  onClick={() => setSelectPrice(price.value)}
                />
                <Label
                  htmlFor={price.value}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {price.text.toLocaleUpperCase()}
                </Label>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Label>Urutan</Label>
            {sorts.map((sort) => (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={sort.value}
                  checked={selectSort == sort.value}
                  onClick={() => setSelectSort(sort.value)}
                />
                <Label
                  htmlFor={sort.value}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {sort.text.toLocaleUpperCase()}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Button
          onClick={() => {
            onSubmit();
            setIsEditDialogOpen(false);
          }}
        >
          OK
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default Filter;
