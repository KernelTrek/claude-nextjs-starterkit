import { Sidebar } from "@/components/layout/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-64 pt-16">
        <div className="container mx-auto max-w-7xl px-4 py-8">
          {children}
        </div>
      </main>
    </div>
  )
}
