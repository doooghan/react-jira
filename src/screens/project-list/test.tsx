import { useMount } from "@/utils";
import { Button } from "antd";
import { useEffect, useState } from "react";

// react hook 与闭包经典的坑
export const Test = () => {
  const [num, setNum] = useState(0);

  useMount(() => {
    setInterval(() => {
      console.log("setInterval", num);
    }, 3000);
  });

  useEffect(() => {
    return () => {
      console.log("卸载", num);
    };
  }, []);

  const add = () => setNum(num + 1);

  return (
    <div>
      <Button onClick={add}>点击加1</Button>
      number: {num}
    </div>
  );
};
