import { UserRoundPlus } from "lucide-react";

interface Props {
  title: string;
  subtitle: string;
}

export const AuthHeader = ({ title, subtitle }: Props) => {
  return (
    <div className="mb-6 flex flex-col items-center text-center gap-3">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 ring-1 ring-blue-100">
        <UserRoundPlus size={28} strokeWidth={1.6} className="text-[#1B3D6F]" />
      </div>
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          {title}
        </h1>
        <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
      </div>
    </div>
  );
};