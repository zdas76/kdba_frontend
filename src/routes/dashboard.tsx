import Header from '#/component/layout/Header'
import Navber from '#/component/layout/Navber'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="flex h-screen overflow-hidden bg-gray-50 gap-2">
        <div className="w-[300px] bg-slate-700">
          <Navber />
        </div>
        <main className="flex-1 overflow-auto p-3 text-slate-900">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
