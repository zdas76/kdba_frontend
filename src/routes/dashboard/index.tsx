import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800">ড্যাশবোর্ড</h1>
      <p className="text-gray-600 mt-2">স্বাগতম ড্যাশবোর্ডে।</p>
    </div>
  )
}

