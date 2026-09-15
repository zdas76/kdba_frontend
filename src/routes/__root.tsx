import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { QueryClient } from '@tanstack/react-query';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import '../styles.css'

export interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>

      <main className="flex-1 min-h-screen">
        <Outlet />
      </main>


      {/* ✅ Standard Router Devtools positioned at the bottom-right */}
      <TanStackRouterDevtools position="bottom-right" />

      {/* ✅ Standard Query Devtools positioned at the bottom-left to prevent overlap */}
      {/* <ReactQueryDevtools buttonPosition="bottom-left" /> */}
    </>
  )
}
