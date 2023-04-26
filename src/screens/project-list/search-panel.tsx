import { useEffect } from "react";
import { useState } from "react";
import { Input, Select } from "antd";
export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

interface SearchPanelProps {
  users: User[];
  params: {
    name: string;
    personId: string;
  };
  setParams: (params: SearchPanelProps["params"]) => void;
}

export const SearchPanel = ({ params, setParams, users }: SearchPanelProps) => {
  return (
    <form>
      <div>
        <Input
          type="text"
          value={params.name}
          onChange={(evt) =>
            setParams({
              ...params,
              name: evt.target.value,
            })
          }
        />

        <Select
          value={params.personId}
          onChange={(value) => {
            console.log(value);
            setParams({
              ...params,
              personId: value,
            });
          }}
        >
          <Select.Option value={""}>负责人</Select.Option>
          {users.map((u) => (
            <Select.Option value={u.id}>{u.name}</Select.Option>
          ))}
        </Select>
      </div>
    </form>
  );
};
