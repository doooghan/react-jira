import { useEffect } from "react";
import { useState } from "react";

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
        <input
          type="text"
          value={params.name}
          onChange={(evt) =>
            setParams({
              ...params,
              name: evt.target.value,
            })
          }
        />

        <select
          value={params.personId}
          onChange={(evt) =>
            setParams({
              ...params,
              personId: evt.target.value,
            })
          }
        >
          <option value={""}>负责人</option>
          {users.map((u) => (
            <option value={u.id}>{u.name}</option>
          ))}
        </select>
      </div>
    </form>
  );
};
