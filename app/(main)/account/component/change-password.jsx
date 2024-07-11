"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";
import { toast } from "sonner";

import { changePassword } from "@/app/actions/account";

const ChangePassword = ({ email }) => {
  const [passwordState, setPasswordState] = useState({
    "oldPassword": "",
    "newPassword": "",
  });
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);

  function handleChange(event) {
    const key = event.target.name;
    const value = event.target.value;

    setPasswordState({ ...passwordState, [key]: value });
  }

  async function doPassowrdChange(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const confirmPassword = formData.get("confirmPassword");

    if (passwordState?.newPassword !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match!");
      return;
    }

    try {
      setConfirmPasswordError(null);

      await changePassword(email, passwordState?.oldPassword, passwordState?.newPassword);

      toast.success(`Password changed successfully.`)
    } catch (err) {
      console.error(err);
      toast.error(`Error: ${err.message}`)
    }
  }

  return (
    <div>
      <h5 className="text-lg font-semibold mb-4">Change password :</h5>
      <form onSubmit={doPassowrdChange}>
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Label className="mb-2 block">Old password :</Label>
            <Input
              type="password"
              placeholder="Old password"
              id="oldPassword"
              name="oldPassword"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label className="mb-2 block">New password :</Label>
            <Input
              type="password"
              placeholder="New password"
              id="newPassword"
              name="newPassword"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label className="mb-2 block">Re-type New password :</Label>
            <Input
              type="password"
              placeholder="Re-type New password"
              id="confirmPassword"
              name="confirmPassword"
              required=""
            />
            {confirmPasswordError && <div className="text-red-500">{confirmPasswordError}</div>}
          </div>
        </div>

        <Button className="mt-5 cursor-pointer" type="submit">
          Save password
        </Button>
      </form>
    </div>
  );
};

export default ChangePassword;