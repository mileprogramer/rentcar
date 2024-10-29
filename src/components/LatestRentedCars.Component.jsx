import useEmblaCarousel from 'embla-carousel-react'
import "../css/slider.css"
import SliderButtons from './SliderButtons';
import { formatPrice } from '../helpers/functions';

export default function LatestRentedCars({ latestRentedCars }){
    
    const [emblaRef, emblaApi] = useEmblaCarousel();
    
    return (
        <>
        <h6 className='display-6 mt-5'>Latest Rented cars</h6>
        <div className='embla'>
            <div className='embla__viewport' ref={emblaRef}>
                <div className='embla__container'>
                    {latestRentedCars?.length > 0 ? latestRentedCars.map((carData, index) => {
                        return <div key={index} className='embla__slide card' style={{flexBasis: "calc(33.5% - 15px)"}}>
                            <div className='card-header'>
                                License : {carData.car.license}
                                <hr/>
                                <div className='d-flex gap-3'>
                                    <p className='m-0'> Start date: {carData.start_date} </p>
                                    <p className='m-0'> Return date: {carData.return_date} </p>
                                    <p className='m-0'> Price per day: {formatPrice(carData.price_per_day)} </p>
                                </div>
                            </div>
                            <div className='card-body'>
                                <img src={carData.car.images[0]} alt='' className='img-fluid' />
                            </div>
                        </div>
                    }) : ""}
                    
                </div>
                <SliderButtons emblaApi = {emblaApi} />
            </div>
        </div>
        </>
    )


}