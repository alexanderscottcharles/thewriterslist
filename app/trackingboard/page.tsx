import React from 'react'
import SpecListServer from "../components/trackingboard/SpecListServer"
import TBFooter from "../components/trackingboard/TBFooter"
import EmblaServer from '../components/trackingboard/EmblaServer'




const page = () => {
  return (
    <div>
     
          <EmblaServer />
      <SpecListServer />
      <TBFooter />
     



    </div>
  )
}

export default page
