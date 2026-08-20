import { PublicNav } from "@/components/layout/public-nav";

export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-white">
      <PublicNav />
      <main className="flex-1">{children}</main>
    </div>
  );
}
