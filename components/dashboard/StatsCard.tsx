type StatsCardProps = {
    title: string;
    value: string;
    subtitle: string;
  };
  
  export default function StatsCard({
    title,
    value,
    subtitle,
  }: StatsCardProps) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <p className="text-sm text-slate-400">{title}</p>
  
        <p className="mt-3 text-3xl font-bold text-white">
          {value}
        </p>
  
        <p className="mt-2 text-sm text-slate-500">
          {subtitle}
        </p>
      </div>
    );
  }