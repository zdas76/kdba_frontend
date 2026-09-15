import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/advocate/reportByForm')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/reportByAdvocate/reportByForm"!</div>
}
