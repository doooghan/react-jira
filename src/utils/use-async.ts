import { useCallback, useReducer, useState } from "react";
import { useMountedRef } from ".";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
  error: null,
  data: null,
  stat: "idle",
};

const defaultConfig = {
  throwOnError: false,
};

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef();

  return useCallback(
    (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),
    [dispatch, mountedRef]
  );
};

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const conifg = { ...defaultConfig, ...initialConfig };
  // 打破使用action的规则
  const [state, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }),
    {
      ...defaultInitialState,
      ...initialState,
    }
  );
  const [retry, setRetry] = useState(() => () => {});
  const safeDispatch = useSafeDispatch(dispatch);

  const setData = useCallback(
    (data: D) => {
      safeDispatch({
        data,
        stat: "success",
        error: null,
      });
    },
    [safeDispatch]
  );

  const setError = useCallback(
    (error: Error) => {
      safeDispatch({
        error,
        stat: "error",
        data: null,
      });
    },
    [safeDispatch]
  );

  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error("请传入 Promise 类型");
      }
      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig?.retry(), runConfig);
        }
      });

      safeDispatch({ stat: "loading" });
      return promise
        .then((data) => {
          setData(data);

          return data;
        })
        .catch((error) => {
          setError(error);
          if (conifg.throwOnError) {
            return Promise.reject(error);
          }
          return error;
        });
    },
    [conifg.throwOnError, setData, setError, safeDispatch]
  );

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isSuccess: state.stat === "success",
    isError: state.stat === "error",
    setData,
    setError,
    run,
    retry,
    ...state,
  };
};
