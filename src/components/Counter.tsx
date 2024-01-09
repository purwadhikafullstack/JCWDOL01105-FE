import { ButtonCounter } from "./Component";

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
      <ButtonCounter desc="-" fn={decrement} />
      <p className="mx-4">{count}</p>
      <ButtonCounter desc="+" fn={increment} />
    </div>
  );
};

export default Counter;
