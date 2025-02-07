import Link from 'next/link'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"
import { ReviewForm } from '@/components/ReviewForm'
import { type Place } from '../../app/_fetchUtils/getPlaces'

interface PlaceCardProps extends Place {
  refetchQuery: string[]
}

export const PlaceCard = (props: PlaceCardProps) => {
  const { name, logo_url, place_reviews, id, refetchQuery } = props
  const reviewText = place_reviews.length !== 1 ? 'reviews' : 'review'
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex flex-row gap-4 justify-between'>
          {name}
          <img
            className='w-4'
            src={logo_url}
            alt={`${name} logo`}
          />
        </CardTitle>
      </CardHeader>
      <CardDescription className='flex justify-between items-center flex-row gap-4'>
        <Link
          className="underline"
          href={`/place/${id}`}
        >
          view {place_reviews.length} {reviewText}
        </Link>
        <ReviewForm place_id={id} refetchQueries={refetchQuery} />
      </CardDescription>
    </Card>
  )
}
