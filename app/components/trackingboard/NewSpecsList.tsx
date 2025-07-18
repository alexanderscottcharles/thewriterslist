'use client'

import Image from 'next/image'
import Link from 'next/link'

type NewsItem = {
  id: number
  title: string
  body?: string | null
  tags?: string | null
}

type NewsListClientProps = {
  items: NewsItem[]
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

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '…';
};

const getSupabaseImageUrl = (title: string) => {
  const projectRef = 'sxxuwhcfhnmvdjejeyyl'
  const bucketName = 'trackingboard'
  const encodedTitle = encodeURIComponent(title.trim())

  return `https://${projectRef}.supabase.co/storage/v1/object/public/${bucketName}/${encodedTitle}.jpg`
}

const MyImage = ({ title }: { title: string }) => {
  const imageSrc = getSupabaseImageUrl(title)

  
  return (
    <Image
      src={imageSrc}
      alt={`Image for ${title}`}
      width={500}
      height={300}
      style={{
        borderRadius: 8,
        objectFit: 'cover',
        width: '100%',
        height: 'auto',
      }}
    />
  )
}

export default function NewsListClient({ items }: NewsListClientProps) {
  if (!items.length) {
    return <p style={{ fontStyle: 'italic' }}>No news to display.</p>
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 32,
        padding: '20px 10px',
      }}
    >
      {items.map(({ id, title, body, tags }) => (
        <div
          key={id}
          style={{
            maxWidth: 600,
            width: '100%',
            backgroundColor: '#f5f5f5',
            borderRadius: 12,
            padding: 20,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
          }}
        >
          <h3 style={{ marginBottom: 16 }}>{title}</h3>
          <Link href={`trackingboard/submissions/${id}`} style={{ display: 'block' }}>

          <MyImage title={title} />
          </Link>
        {body && <p>{truncateText(body, 120)}</p>
}
          
           <TagBoxes tags={tags} />
        </div>
      ))}
    </div>
  )
}