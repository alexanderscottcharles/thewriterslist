
'use client'
import React, { useRef, useMemo } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import { EmblaOptionsType } from 'embla-carousel'
import {
  NextButton,
  PrevButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import { useAutoplay } from './EmblaCarouselAutoplay'
import { useAutoplayProgress } from './EmblaCarouselAutoplayProgress'
import Link from 'next/link'


type Slide = {
  id: number
  title: string
  body?: string | null
  tags?: string | null
}

type PropType = {
  slides: Slide[]
  options?: EmblaOptionsType
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
      <div className="w-[500px] h-[300px] relative overflow-hidden rounded-md bg-gray-200 ">
      <Image
        src={imageSrc}
        alt={`Image for ${title}`}
        fill={true}
        className=""
      />
    </div>
  )
}

const EmblaCarousel: React.FC<PropType> = ( props) => {
  const {slides, options} = props
  const progressNode = useRef<HTMLDivElement>(null)
   const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: 3000 })
  ])
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

   const { autoplayIsPlaying, toggleAutoplay, onAutoplayButtonClick } =
    useAutoplay(emblaApi)

  const { showAutoplayProgress } = useAutoplayProgress(emblaApi, progressNode)


  return (
    <div className="embla">
      <p className="text-6xl text-playfair text-center m-6"> New Spec Script Listings </p>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container ">
          {slides.map(({ id, title, body, tags }) => (
            <div className="embla__slide" key={id}>
              <div><h3 className="text-2xl text-center m-4">{title}</h3></div>
              <div >    <Link href={`trackingboard/submissions/${id}`}><MyImage title={title} /> </Link></div>
             {body && <p>{truncateText(body, 120)}</p>}
                <TagBoxes tags={tags} />
            </div>
          ))}
        </div>  
      </div> 

      <div className="embla__controls">
        <div className="embla__buttons">
     
        </div>

        <div
          className={`embla__progress`.concat(
            showAutoplayProgress ? '' : ' embla__progress--hidden'
          )}
        >
          <div className="embla__progress__bar" ref={progressNode} />
        </div>

        
      </div>
    </div>

  ) 
}

export default EmblaCarousel
