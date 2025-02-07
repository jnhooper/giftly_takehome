'use client'
import { useQuery } from '@tanstack/react-query'
import { getPlace } from '@/app/_fetchUtils/getPlace'
import { Review } from '@/components/Review'
import { ReviewForm } from '@/components/ReviewForm'
import styles from './styles.module.css'


export const Place = (props: { id: string }) => {
  const { id } = props
  const {
    data,
    isLoading,
  } = useQuery({
    queryKey: ['place', id],
    queryFn: () => getPlace(`${id}`)
  })

  return (
    <>
      {isLoading ? <h2>Loading...</h2> :
        <div className={styles.scrollContainer}>
          <div className={`${styles.title} grid grid-cols-[1fr_auto]`}>
            <h1 className='text-3xl'>{data?.name}</h1>
            <ReviewForm
              place_id={id}
              refetchQueries={['place', id]}
            />
          </div>
          <div className="border-2 border-color-teal-800 rounded-sm">
            <ul className={styles.ul}>
              {data?.place_reviews.map(review => (
                <li key={review.id}>
                  <Review
                    {...review}
                    refetchQuery={['place', id]}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      }

    </>
  )


}
