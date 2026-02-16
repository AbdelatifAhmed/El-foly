import Button from '../common/Button'
import AllImageSwiper from '../UI/AllImageSwiper'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const OurProductSec = () => {
  
  return (
    <div>
        <p className="title-line">Our Products</p>
        <div className="flex justify-between items-center ">
          <div className="flex gap-20">
            <p className="head-line">Explore Our Products</p>
          </div>
          <div className="flex gap-3">
            <button
              aria-label="Previous"
              className={`ourProduct-swiper-prev p-2 rounded-full bg-gray-200 hover:bg-gray-300`}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              aria-label="Next"
              className={`ourProduct-swiper-next p-2 rounded-full bg-gray-200 hover:bg-gray-300`}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
        <AllImageSwiper />
        <div className="flex justify-center items-center">
        <Button Title='View All Products'/>
      </div>
    </div>
  )
}

export default OurProductSec