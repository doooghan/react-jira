import { useUsers } from "@/utils/user";
import { IdSelect } from "./id-select";

export const UserSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data } = useUsers();
  return <IdSelect options={data || []} {...props}></IdSelect>;
};
