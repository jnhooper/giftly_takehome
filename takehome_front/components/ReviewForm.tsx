'use client'
import { useState } from 'react'
import { useMutation, useQueryClient, InvalidateQueryFilters } from '@tanstack/react-query'
import { RAILS_ENDPOINT } from '../app/env'
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogContent,
} from '@/components/ui/dialog';
import { Review } from '@/app/_fetchUtils/getPlaces';


interface ReviewFormProps extends Partial<Review> {
  place_id: string
  refetchQueries: InvalidateQueryFilters['queryKey']
}
export const ReviewForm = (props: ReviewFormProps) => {

  const [isOpen, setOpen] = useState<boolean>(false)
  const {
    id,
    place_id,
    refetchQueries,
    author_name,
    review_text,
    rating,
  } = props
  const editMode = !!id
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async (newReview: string) => {
      const resp = await fetch(`${RAILS_ENDPOINT}/${editMode ? 'edit_review' : 'add_review'}`, {
        method: editMode ? 'PUT' : 'POST',
        body: newReview,
        headers: {
          'Content-type': 'application/json'
        }
      })
      return resp.json
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: refetchQueries,
      })
      setOpen(false)
    }
  })
  const titleText = (id ? 'Edit' : 'Add') + ' review'
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setOpen(!isOpen)}
        >
          {titleText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>{titleText}</DialogTitle>
        <DialogDescription>
          {!id ? 'Add a new Review for this store' : 'Edit the review for this store'}
        </DialogDescription>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            const data = JSON.stringify({
              id,
              ...Object.fromEntries(formData),
              place_id: place_id
            });
            mutation.mutate(data)

          }}
          className='flex flex-col gap-4 text-l'
        >
          <label
            className='gap-4 flex'
          >
            star rating
            <input
              defaultValue={`${rating}`}
              name='rating'
              className='border-2 rounded-sm border-teal-700'
              type='number'
              max={5}
              min={0}
            />
          </label>
          <label className='gap-4 flex'>
            Please leave a review
            <input
              defaultValue={review_text}
              name='review_text'
              className='border-2 rounded-sm border-teal-700'
              type='area'
            />
          </label>

          <label className='gap-4 flex'>
            name
            <input
              defaultValue={author_name}
              name='author_name'
              className='border-2  rounded-sm border-teal-700'
              type='text'
            />
          </label>
          <Button>Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  )

}
