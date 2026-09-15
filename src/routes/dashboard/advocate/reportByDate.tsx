import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/advocate/reportByDate')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/reportByAdvocate/reportByDate"!</div>
}
