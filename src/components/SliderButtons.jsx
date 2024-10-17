import { useCallback, useEffect, useState } from "react";
import NextSliderButton from "./NextSliderButton.Component";
import PrevSliderButton from "./PrevSliderButton.Component";

export default function SliderButtons({ emblaApi }){
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const onSelect = useCallback((emblaApi) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onSelect])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])
  
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className="slider-buttons d-flex gap-3 mt-3">
        <PrevSliderButton action={scrollPrev} isDisabled = {prevBtnDisabled} />
        <NextSliderButton action={scrollNext} isDisabled = {nextBtnDisabled} />
    </div>
  )

}