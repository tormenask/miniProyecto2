interface Props {
  title: string;
  subtitle: string;
}

export const AuthHeader = ({
  title,
  subtitle,
}: Props) => {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        {title}
      </h1>

      <p className="mt-2 text-sm text-slate-500">
        {subtitle}
      </p>
    </div>
  );
};