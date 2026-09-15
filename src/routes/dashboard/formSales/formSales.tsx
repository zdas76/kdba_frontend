import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/formSales/formSales')({
  component: FormSalesComponent,
})

function FormSalesComponent() {
  return <div>Hello "/forms/formSales"!</div>
}
