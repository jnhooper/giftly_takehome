import {
  useMutation,
  useQueryClient,
  InvalidateQueryFilters,
} from '@tanstack/react-query'
import { Review as ReviewType } from "@/app/_fetchUtils/getPlaces";
import { RAILS_ENDPOINT } from '../app/env'
import { ReviewForm } from '@/components/ReviewForm'
import { Button } from '@/components/ui/button'

interface ReviewProps extends ReviewType {

  refetchQuery: InvalidateQueryFilters['queryKey']
}

export const Review = (props: ReviewProps) => {
  const { rating, review_text, author_name, id, refetchQuery } = props
  const queryClient = useQueryClient()
  const deleteMutation = useMutation({
    mutationFn: async () => {
      const resp = await fetch(`${RAILS_ENDPOINT}/delete`, {
        method: "POST",
        body: JSON.stringify({ id: id }),
        headers: {
          'Content-type': 'application/json'
        }
      })
      return resp.json
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: refetchQuery,
      })
    }
  })
  const ratingText = rating == 1 ? 'star' : 'stars'
  return (
    <div className='p-8 flex flex-col gap-4 drop-shadow-md'>
      <p className="text-xl">
        {review_text}
        <br />
        - {author_name}
      </p>
      <div className='text-xl'>
        {rating} {ratingText}
      </div>
      <div className='flex justify-between'>
        <Button
          onClick={() => {
            deleteMutation.mutate()

          }}
          variant='destructive'
        >
          Remove
        </Button>
        <ReviewForm {...props} refetchQueries={refetchQuery} />
      </div>
    </div>
  )

}
