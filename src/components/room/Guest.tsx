import { useEffect, useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import Counter from "../Counter";

interface IRoom {
  room: { guest: number };
  setTotalGuest: (num: number) => void;
}

const Guest: React.FC<IRoom> = ({ room, setTotalGuest }) => {
  const [countAdult, setCountAdult] = useState(1);
  const [countKid, setCountKid] = useState(0);
  const [countInfant, setCountInfant] = useState(0);
  const [isEditDialogOpen2, setIsEditDialogOpen2] = useState(false);

  const totalGuest = countAdult + countKid + countInfant;

  useEffect(() => {
    setTotalGuest(totalGuest);
  }, [totalGuest]);

  return (
    <div className="flex justify-between my-8">
      <div>
        <p>Tamu</p>
        <p className="text-slate-500 font-thin">{totalGuest} tamu</p>
      </div>

      <Dialog open={isEditDialogOpen2} onOpenChange={setIsEditDialogOpen2}>
        <DialogTrigger>
          <span className="font-thin underline cursor-pointer">Ubah</span>
        </DialogTrigger>
        <DialogContent>
          <p className="text-2xl">Tamu</p>
          <div className="flex justify-between items-end my-4">
            <div>
              <p>Dewasa</p>
              <p className="font-thin text-sm">Usia 13+</p>
            </div>
            <Counter state="adult" count={countAdult} setCount={setCountAdult} total={totalGuest} max={room.guest} />
          </div>

          <div className="flex justify-between items-end my-4">
            <div>
              <p>Anak-anak</p>
              <p className="font-thin text-sm">Usia 2-12</p>
            </div>
            <Counter state="kids" count={countKid} setCount={setCountKid} total={totalGuest} max={room.guest} />
          </div>

          <div className="flex justify-between items-end my-4">
            <div>
              <p>Balita</p>
              <p className="font-thin text-sm">Di bawah 2 tahun</p>
            </div>
            <Counter state="kids" count={countInfant} setCount={setCountInfant} total={totalGuest} max={room.guest} />
          </div>

          <Button onClick={() => setIsEditDialogOpen2(false)}>Simpan</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Guest;
