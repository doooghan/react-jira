import { useMount } from "@/utils";
import { Button } from "antd";
import { useEffect, useState } from "react";

const test = () => {
  let num = 0;

  const effect = () => {
    num += 1;
    const message = `现在的num是${num}`;
    return () => {
      console.log(message);
    };
  };

  return effect;
};

const add = test();
const unmount = add();
add();
add();
unmount();

// react hook 与闭包经典的坑
export const Test = () => {
  const [num, setNum] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      console.log("setInterval", num);
    }, 3000);
    return () => clearInterval(id);
  }, [num]);

  useEffect(() => {
    return () => {
      console.log("卸载", num);
    };
  }, [num]);

  const add = () => setNum(num + 1);

  return (
    <div>
      <Button onClick={add}>点击加1</Button>
      number: {num}
    </div>
  );
};
