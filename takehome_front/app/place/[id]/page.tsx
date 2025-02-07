import Link from 'next/link'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { getPlace } from '@/app/_fetchUtils/getPlace'
import { Place } from './Place'
import styles from './styles.module.css'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['place', id],
    queryFn: () => getPlace(id),
  })
  return (
    <div className="p-8">
      <Link className="underline" href='/'>home</Link>
      <div className={`${styles.container} grid  justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`} >
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Place id={id} />
        </HydrationBoundary>
      </div >
    </div>
  )
}
