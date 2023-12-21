import { createUserWithEmailAndPassword } from "firebase/auth";
import { Button } from "../ui/button";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/lib/firebase.config";

const Test = () => {
  const email = "anwaraan998@gmail.com";
  const password = "Megagican12";
  const onSubmit = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      console.log(res.user);
      console.log((await res.user.getIdTokenResult()).token);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <p>Test</p>
      <Button onClick={() => onSubmit()}>Click</Button>
    </div>
  );
};

export default Test;
