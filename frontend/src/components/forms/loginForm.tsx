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
      <div className="space-y-3">
        <Label htmlFor="password" className="font-semibold text-stone-700">
          الرقم السري
        </Label>

        <Input
          id="password"
          type="password"
          placeholder="ادخل الرقم السري للوصول"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-14 rounded-2xl border-stone-200 bg-white px-5 text-lg transition-all duration-300 focus:border-emerald-800 focus:ring-emerald-800/20"
        />
      </div>

      <Button
        type="submit"
        disabled={loginMutation.isPending}
        className="group relative flex h-14 w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#022c22_0%,#064e3b_100%)] text-base font-bold tracking-wide text-amber-400 shadow-[0_10px_25px_-5px_rgba(2,44,34,0.4)] transition-all duration-300 hover:shadow-[0_15px_35px_-5px_rgba(2,44,34,0.5)] active:scale-[0.98]"
      >
        {loginMutation.isPending ? (
          <>
            <Spinner />
            جاري الدخول...
          </>
        ) : (
          "متابعة الدخول"
        )}
      </Button>
    </form>
  );
}