"use client";

import * as React from "react";
import { DropdownMenu } from "radix-ui";

export function RoleSelector({
  value,
  onChangeAction,
}: {
  value: string;
  onChangeAction: (v: string) => void;
}) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="border rounded p-2">
         Select your profession
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="bg-white border shadow p-2 rounded">

        <DropdownMenu.Separator className="my-2 h-px bg-gray-200" />
        <DropdownMenu.RadioGroup value={value} onValueChange={onChangeAction}>
          {["writer", "agentManager", "otherProfessional"].map((role) => (
            <DropdownMenu.RadioItem
              key={role}
              value={role}
              className="p-2 rounded hover:bg-gray-100 cursor-pointer data-[state=checked]:bg-blue-100"
            >
              {role === "agentManager" ? "Agent/Manager" : role === "otherProfessional" ? "Other Professional" : "Writer"}
            </DropdownMenu.RadioItem>
          ))}
        </DropdownMenu.RadioGroup>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
