import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/report/salesFormReportBycategory')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/report/salesFormReportBycategory"!</div>
}
