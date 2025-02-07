
import { RAILS_ENDPOINT } from '../env'
import { Place } from './getPlaces'

export const getPlace = async (id: string) => {
  try {
    const resp = await fetch(`${RAILS_ENDPOINT}/place/${id}`)
    let data
    if (resp.ok) {
      data = await resp.json()
      return data as Place
    }
  } catch (e) {
    console.error('fetch failed', e)
  }
}
