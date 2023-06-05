/* @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { useEffect } from "react";
import { useState } from "react";
import { Form, Input, Select } from "antd";
import { Project } from "./list";
import { UserSelect } from "@/components/user-select";

export interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

interface SearchPanelProps {
  users: User[];
  params: Partial<Pick<Project, "name" | "personId">>;
  setParams: (params: SearchPanelProps["params"]) => void;
}

export const SearchPanel = ({ params, setParams, users }: SearchPanelProps) => {
  return (
    <Form css={{ marginBottom: "2rem" }} layout="inline">
      <Form.Item>
        <Input
          placeholder="项目名"
          type="text"
          value={params.name}
          onChange={(evt) =>
            setParams({
              ...params,
              name: evt.target.value,
            })
          }
        />
      </Form.Item>

      <Form.Item>
        <UserSelect
          defaultOptionsName={"负责人"}
          value={params.personId}
          onChange={(value) => {
            console.log(value);
            setParams({
              ...params,
              personId: value,
            });
          }}
        ></UserSelect>
      </Form.Item>
    </Form>
  );
};
