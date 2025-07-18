// EmblaServer.tsx (Server Component)
import EmblaCarousel from './EmblaCarousel'
import supabase from '../../utils/supabase/server'

export default async function EmblaServer() {
  const { data, error } = await supabase
    .from('trackingboard')
    .select('id, title, body, tags')
    .order('created_at', { ascending: false })
    .limit(5)

  if (error) {
    console.error('Failed to fetch slides:', error)
    return <div>Error loading carousel</div>
  }

  const slides = data ?? []

  return <EmblaCarousel slides={slides} options={{ loop: true }} />
}
