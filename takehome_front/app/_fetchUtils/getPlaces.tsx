import { RAILS_ENDPOINT } from '../env'

export interface Review {
  id: string
  author_name: string
  review_text: string
  rating: number
  place_id: string
  created_at: string
  updated_at: string
}

export interface Place {
  id: string
  name: string
  logo_name: string
  logo_url: string
  place_reviews: Review[]
}
export const getPlaces = async () => {
  try {
    const resp = await fetch(`${RAILS_ENDPOINT}/places`)
    let data
    if (resp.ok) {
      data = await resp.json()
      return data as Place[]
    }
  } catch (e) {
    console.error('fetch failed', e)
  }
}
