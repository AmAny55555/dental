"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "@/services/api";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Spinner from "../ui/Spinner";
import { Label } from "../ui/label";

export default function LoginForm() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: api.login,

    onSuccess: (data) => {
      if (!data?.token) {
        toast.error("لم يتم استلام التوكن");
        return;
      }

      localStorage.setItem("token", data.token);

      toast.success("تم تسجيل الدخول بنجاح");

      router.push("/dashboard");
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "فشل تسجيل الدخول";

      toast.error(message);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedPassword = password.trim();

    if (!trimmedPassword) {
      toast.error("من فضلك ادخل الرقم السري");
      return;
    }

    loginMutation.mutate({ password: trimmedPassword });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 animate-in fade-in-0 zoom-in-95 duration-500"
    >
      <div className="space-y-2">
        <Label htmlFor="password" className="font-medium text-slate-700">
          الرقم السري
        </Label>

        <Input
          id="password"
          type="password"
          placeholder="ادخل الرقم السري"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-12 rounded-xl border-slate-200 transition-all duration-300 focus:border-cyan-500 focus:ring-cyan-500"
        />
      </div>

      <Button
        type="submit"
        disabled={loginMutation.isPending}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-sky-700 text-base font-semibold tracking-wide text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-cyan-700 hover:to-sky-800 hover:shadow-xl active:scale-[0.98]"
      >
        {loginMutation.isPending ? (
          <>
            <Spinner />
            جاري الدخول...
          </>
        ) : (
          "تسجيل الدخول"
        )}
      </Button>
    </form>
  );
}