import Link from 'next/link'
import Image from 'next/image'
import supabase from '../../utils/supabase/server' 
type Submission = {
  id: number
  title: string
}

type RelatedSubmissionsProps = {
  currentId: number
}

const getSupabaseImageUrl = (title: string) => {
  const projectRef = 'sxxuwhcfhnmvdjejeyyl'  
  const bucketName = 'trackingboard'      
  const encodedTitle = encodeURIComponent(title.trim())
  return `https://${projectRef}.supabase.co/storage/v1/object/public/${bucketName}/${encodedTitle}.jpg`
}

export default async function RelatedSubmissions({ currentId }: RelatedSubmissionsProps) {
  const { data: prevData } = await supabase
    .from('trackingboard')
    .select('id, title')
    .lt('id', currentId)
    .order('id', { ascending: false })
    .limit(1)
    .single()

  const { data: nextData } = await supabase
    .from('trackingboard')
    .select('id, title')
    .gt('id', currentId)
    .order('id', { ascending: true })
    .limit(1)
    .single()

  if (!prevData && !nextData) {
    return null
  }

  return (
    <section className="mt-12 border-t pt-6">
      <h2 className="text-2xl mx-2 font-semibold mb-4 text-center">You may also be interested in</h2>
      <div className="flex gap-6">
        {prevData && (
          <Link
            href={`/trackingboard/submissions/${prevData.id}`}
            className="flex-1 flex items-center gap-4 p-4 border rounded hover:bg-gray-50"
          >
            <Image
              src={getSupabaseImageUrl(prevData.title)}
              alt={`Image for ${prevData.title}`}
              width={100}
              height={60}
              className="object-cover rounded"
              priority={false}
            />
            <span className="font-medium">&larr; {prevData.title}</span>
          </Link>
        )}

        {nextData && (
          <Link
            href={`/trackingboard/submissions/${nextData.id}`}
            className="flex-1 flex items-center gap-4 p-4 border rounded hover:bg-gray-50 justify-end text-right"
          >
            <span className="font-medium">{nextData.title} &rarr;</span>
            <Image
              src={getSupabaseImageUrl(nextData.title)}
              alt={`Image for ${nextData.title}`}
              width={100}
              height={60}
              className="object-cover rounded"
              priority={false}
            />
          </Link>
        )}
      </div>
    </section>
  )
}
