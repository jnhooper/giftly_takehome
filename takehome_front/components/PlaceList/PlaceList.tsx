'use client'
import { useQuery } from '@tanstack/react-query'
import { PlaceCard } from '../PlaceCard'
import { getPlaces } from '@/app/_fetchUtils/getPlaces'

export const PlaceList = () => {
  const {
    data = [],
    isLoading,
  } = useQuery({
    queryKey: ['places'],
    queryFn: () => getPlaces()
  })
  return (
    <>
      {isLoading ? <h2>Loading...</h2> :
        <ul>
          {data.map(place => (
            <li key={place.id}>
              <PlaceCard {...place} refetchQuery={['places']} />
            </li>
          ))}
        </ul>
      }

    </>
  )


}
