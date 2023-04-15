import { useState } from "react";
import { useEffect } from "react";

// 0 是一个有效值
export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const cleanObject = (object: object) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    // @ts-ignore
    const value = result[key];
    if (isFalsy(value)) {
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

// 防抖，规定的 delay 时间内，只有最后一个触发
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebounceValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debounceValue;
};

export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);
  return {
    value,
    setValue,
    add: (item: T) => {
      setValue([...value, item]);
    },
    removeIndex: (index: number) => {
      const copy = [...value];
      copy.splice(index, 1);
      setValue(copy);
    },
    clear: () => {
      setValue([]);
    },
  };
  // const add = (value: T) => {
  //   arr.push(value);
  // };
  // const remove = (index: number) => {
  //   arr.splice(index);
  // };
  // const clear = () => {
  //   const l = arr.length;
  //   for (let i = 0; i < l; i++) {
  //     arr.pop();
  //   }
  // };
  // const value = arr;
  // return { add, remove, clear, value };
};
