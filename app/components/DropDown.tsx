"use client"

import * as React from "react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"

export function RoleSelector() {
  const [role, setRole] = React.useState("writer")

  return (
    <>
      {/* hidden input to submit with form */}
      <input type="hidden" name="title" value={role} />

      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="border rounded p-2">
            I am a: {role === "agentManager"
              ? "Agent/Manager"
              : role === "otherProfessional"
              ? "Other Professional"
              : "Writer"}
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="bg-white border shadow p-2 rounded">
          <DropdownMenu.Label>Select your role</DropdownMenu.Label>
          <DropdownMenu.Separator className="my-2 h-px bg-gray-200" />
          <DropdownMenu.RadioGroup
            value={role}
            onValueChange={(newRole) => setRole(newRole)}
          >
            {["writer", "agentManager", "otherProfessional"].map((r) => (
              <DropdownMenu.RadioItem
                key={r}
                value={r}
                className="p-2 rounded hover:bg-gray-100 cursor-pointer data-[state=checked]:bg-blue-100"
              >
                {r === "agentManager"
                  ? "Agent/Manager"
                  : r === "otherProfessional"
                  ? "Other Professional"
                  : "Writer"}
              </DropdownMenu.RadioItem>
            ))}
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </>
  )
}
