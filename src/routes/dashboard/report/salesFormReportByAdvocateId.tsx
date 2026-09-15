import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/report/salesFormReportByAdvocateId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/report/salesFormReportByAdvocateId"!</div>
}
