import { useState } from "react";
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

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const conifg = { ...defaultConfig, ...initialConfig };
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });
  const [retry, setRetry] = useState(() => () => {});
  const mountedRef = useMountedRef();

  const setData = (data: D) => {
    setState({
      data,
      stat: "success",
      error: null,
    });
  };

  const setError = (error: Error) => {
    setState({
      error,
      stat: "error",
      data: null,
    });
  };

  const run = (
    promise: Promise<D>,
    runConfig?: { retry: () => Promise<D> }
  ) => {
    if (!promise || !promise.then) {
      throw new Error("请传入 Promise 类型");
    }
    setRetry(() => () => {
      if (runConfig?.retry) {
        run(runConfig?.retry(), runConfig);
      }
    });

    setState({ ...state, stat: "loading" });
    return promise
      .then((data) => {
        if (mountedRef.current) {
          setData(data);
        }

        return data;
      })
      .catch((error) => {
        setError(error);
        if (conifg.throwOnError) {
          return Promise.reject(error);
        }
        return error;
      });
  };

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
