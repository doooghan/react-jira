import { useUrlQueryParam } from "@/utils/url";
import { useMemo } from "react";

export const useProjectSearchParams = () => {
  const [params, setParams] = useUrlQueryParam(["name", "personId"]);

  return [
    useMemo(() => {
      return {
        ...params,
        personId: Number(params.personId) || undefined,
      };
    }, [params]),

    setParams,
  ] as const;
};

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);

  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => setProjectCreate({ projectCreate: undefined });

  return {
    projectModalOpen: projectCreate === "true",
    open,
    close,
  };
};
