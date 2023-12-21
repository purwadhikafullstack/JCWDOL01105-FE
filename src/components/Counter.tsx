import { Button } from "./ui/button";

interface ICounter {
  state?: string;
  count: number;
  total: number;
  max: number;
  setCount: (n: number) => void;
}

const Counter: React.FC<ICounter> = ({ state, count, setCount, total, max }) => {
  const decrement = () => {
    if (state === "kids" && count > 0) {
      setCount(count - 1);
    } else if (state === "adult" && count > 1) {
      setCount(count - 1);
    }
  };

  const increment = () => {
    if (total < max) {
      setCount(count + 1);
    }
  };

  return (
    <div className="flex items-center">
      <Button className="bg-white hover:bg-slate-200 text-slate-500 rounded-full border" onClick={() => decrement()}>
        {" "}
        -
      </Button>
      <p className="mx-4">{count}</p>
      <Button className="bg-white hover:bg-slate-200 text-slate-500 rounded-full border" onClick={() => increment()}>
        +
      </Button>
    </div>
  );
};

export default Counter;
