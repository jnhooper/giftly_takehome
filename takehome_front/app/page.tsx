import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { getPlaces } from './_fetchUtils/getPlaces'
import { PlaceList } from '@/components/PlaceList'
export default async function Home() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['places'],
    queryFn: getPlaces,
  })
  return (
    <div className="grid  justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main
        className="flex flex-col gap-8  items-center sm:items-start"
      >
        <HydrationBoundary state={dehydrate(queryClient)}>
          <PlaceList />
        </HydrationBoundary>

      </main>

    </div>
  );
}
