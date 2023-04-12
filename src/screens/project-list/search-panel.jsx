import { useEffect } from "react";
import { useState } from "react";

export const SearchPanel = ({ params, setParams }) => {
  const [users, setUsers] = useState([]);

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
