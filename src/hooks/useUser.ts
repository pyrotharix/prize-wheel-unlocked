// src/hooks/useUser.ts
import { useState } from "react";

interface User {
  id: string;
  email: string;
  username: string;
  // добавь другие поля, если нужно
}

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);

  const register = async (
    email: string,
    username: string,
    password: string
  ): Promise<User> => {
    const referral_code = localStorage.getItem("referral_code");
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        username,
        password,
        invited_by: referral_code || null,
      }),
    });

    if (!res.ok) throw new Error("Registration failed");

    const data = await res.json();
    setUser(data.user);
    return data.user;
  };

  // Добавь функции login/logout при необходимости

  return { user, register };
};
