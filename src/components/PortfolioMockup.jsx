function DashboardMockup() {
  return (
    <div className="rounded-[1.7rem] border border-white/[0.08] bg-slate-950/65 p-4">
      <div className="mb-4 flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
      </div>
      <div className="grid gap-3">
        <div className="h-24 rounded-[1.2rem] bg-gradient-to-br from-cyan-300/15 via-sky-400/10 to-white/5" />
        <div className="grid grid-cols-[0.72fr_0.28fr] gap-3">
          <div className="grid gap-3">
            <div className="h-12 rounded-2xl bg-white/[0.04]" />
            <div className="h-16 rounded-2xl bg-white/[0.04]" />
          </div>
          <div className="h-full rounded-2xl bg-white/[0.04]" />
        </div>
      </div>
    </div>
  );
}

function MobileMockup() {
  return (
    <div className="mx-auto w-40 rounded-[2.4rem] border border-white/10 bg-slate-950/75 p-3 shadow-soft">
      <div className="rounded-[2rem] bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-3">
        <div className="mb-4 flex items-center justify-between">
          <span className="h-2 w-12 rounded-full bg-white/[0.12]" />
          <span className="h-2 w-2 rounded-full bg-cyan-300" />
        </div>
        <div className="space-y-3">
          <div className="h-24 rounded-[1.4rem] bg-gradient-to-br from-cyan-300/18 via-sky-400/10 to-white/5" />
          <div className="grid grid-cols-2 gap-2">
            <div className="h-12 rounded-2xl bg-white/[0.04]" />
            <div className="h-12 rounded-2xl bg-white/[0.04]" />
          </div>
          <div className="h-10 rounded-2xl bg-white/[0.04]" />
        </div>
      </div>
    </div>
  );
}

function WebsiteMockup() {
  return (
    <div className="rounded-[1.7rem] border border-white/[0.08] bg-slate-950/65 p-4">
      <div className="mb-4 flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
      </div>
      <div className="space-y-3">
        <div className="h-24 rounded-[1.2rem] bg-gradient-to-r from-cyan-300/15 via-white/[0.03] to-white/5" />
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-20 rounded-2xl bg-white/[0.04]" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PortfolioMockup({ type }) {
  if (type === "mobile") {
    return <MobileMockup />;
  }

  if (type === "website") {
    return <WebsiteMockup />;
  }

  return <DashboardMockup />;
}
