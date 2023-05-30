import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

/**
 * 返回页面 url 中，指定键的参数值
 * @param keys
 * @returns
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParam] = useSearchParams();
  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {} as { [key in K]: string }),
      [searchParams]
    ),

    setSearchParam,
  ] as const;
};
