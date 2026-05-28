
interface Props {
  title: string;
  subtitle: string;
}

export const AuthHeader = ({ title, subtitle }: Props) => {
  return (
    <div className="mb-6 flex flex-col items-center text-center gap-3">
      <div className="flex h-16 w-16 items-center justify-center text-5xl font-bold text-[#1B3D6F]">
        UniCall
      </div>
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900">
          {title}
        </h1>
        <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
      </div>
    </div>
  );
};
