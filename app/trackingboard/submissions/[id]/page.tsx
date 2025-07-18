import { notFound } from 'next/navigation'
import supabase from '../../../utils/supabase/server'  
import Image from 'next/image'

import { Metadata } from 'next'
import RelatedSubmissions from '@/app/components/trackingboard/RelatedSubmissions'


export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { data, error } = await supabase
    .from('trackingboard')
    .select('title, body')
    .eq('id', params.id)
    .single()

  if (error || !data) {
    return {
      title: 'Submission Not Found',
      description: 'No spec submission found for this ID.'
    }
  }

  return {
    title: data.title,
    description: data.body?.substring(0, 150) ?? 'Spec submission details',
    openGraph: {
      title: data.title,
      description: data.body?.substring(0, 150) ?? '',
   
    }
  }
}

type NewsItem = {
  id: number
  title: string
  body?: string | null
  tags?: string | null
}

const TagBoxes = ({ tags }: { tags?: string | null }) => {
  if (!tags) return null;

  const tagList = tags.split(',').map(tag => tag.trim()).filter(Boolean);
    return (
    <div className="flex flex-wrap gap-2 mt-4">
      {tagList.map((tag, idx) => (
        <span
          key={idx}
          className="bg-gray-100 text-black-800 text-xs font-semibold px-2.5 py-0.5 rounded"
        >
          {tag} 
        </span>
      ))}
    </div>
  );
};

const getSupabaseImageUrl = (title: string) => {
  const projectRef = 'sxxuwhcfhnmvdjejeyyl'
  const bucketName = 'trackingboard'
  const encodedTitle = encodeURIComponent(title.trim())

  return `https://${projectRef}.supabase.co/storage/v1/object/public/${bucketName}/${encodedTitle}.jpg`
}

export default async function NewsPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10)

  const { data, error } = await supabase
    .from('trackingboard')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error || !data) {
    notFound()
  }

  const news: NewsItem = data

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">{news.title}</h1>

      <div className="mb-6 rounded-lg overflow-hidden shadow">
        <Image
          src={getSupabaseImageUrl(news.title)}
          alt={`Image for ${news.title}`}
          width={800}
          height={400}
          className="w-full h-auto object-cover"
        />
      </div>

      {news.body && (
        <div className="mb-8 text-gray-700 text-lg leading-relaxed">
          {news.body}
        </div>
      )}

      {news.tags && (
        <div className="text-sm text-gray-500 italic">
            <TagBoxes tags={news.tags} />
        </div>
      )}
      <RelatedSubmissions currentId={id} />
    </main>
  )
}
