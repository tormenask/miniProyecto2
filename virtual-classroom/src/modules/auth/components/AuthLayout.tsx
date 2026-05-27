import type { PropsWithChildren } from "react";

export const AuthLayout = ({
  children,
}: PropsWithChildren) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        {children}
      </div>
    </div>
  );
};