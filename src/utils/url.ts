import { useSearchParams } from "react-router-dom";

/**
 * 返回页面 url 中，指定键的参数值
 * @param keys
 * @returns
 */
export const useUrlQueryParam = (keys: string[]) => {
  const [searchParams, setSearchParam] = useSearchParams();
  return [
    keys.reduce((prev, key) => {
      return { ...prev, [key]: searchParams.get(key) || "" };
    }, {} as { [key in string]: string }),
    setSearchParam,
  ] as const;
};
