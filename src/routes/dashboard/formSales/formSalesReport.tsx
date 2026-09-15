import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/formSales/formSalesReport')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/forms/formSalesReport"!</div>
}
