"use client";

import Image from "next/image";
import css from "./EditProfilePage.module.css";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/aythStore";
import { useState } from "react";
import { isAxiosError } from "axios";
import { editMe, EditProfileRequest } from "@/lib/api/clientApi";

export default function EditProfile() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const [error, setError] = useState("");
  const handleSubmit = async (formData: FormData) => {
    setError("");
    try {
      const formValues = Object.fromEntries(formData) as EditProfileRequest;
      const response = await editMe(formValues);
      if (response) {
        setUser(response);
        router.push("/profile");
      } else {
        setError("Error occured while editing your profile");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error.message);
      } else {
        setError("Internal Server Error");
      }
    }
  };
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        {user && (
          <>
            <h1 className={css.formTitle}>Edit Profile</h1>

            <Image
              src={user.avatar}
              alt="User Avatar"
              width={120}
              height={120}
              className={css.avatar}
            />

            <form className={css.profileInfo} action={handleSubmit}>
              <div className={css.usernameWrapper}>
                <label htmlFor="username">Username:</label>
                <input
                  id="username"
                  type="text"
                  className={css.input}
                  defaultValue={user.username}
                />
              </div>

              <p>Email: {user.email}</p>

              <div className={css.actions}>
                <button type="submit" className={css.saveButton}>
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/profile")}
                  className={css.cancelButton}
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        )}
        {error && <p className={css.error}>{error}</p>}
      </div>
    </main>
  );
}
