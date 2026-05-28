import { ProfileProvider } from "@/lib/context/ProfileContext";
import { ToastProvider } from "@/components/shared/Toast";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProfileProvider>
      <ToastProvider>
        <div className="flex min-h-screen bg-memorias-cream">
          <Sidebar />
          <div className="flex flex-col flex-1 min-w-0">
            <Header />
            <main className="flex-1 p-6 overflow-auto">
              {children}
            </main>
          </div>
        </div>
      </ToastProvider>
    </ProfileProvider>
  );
}
