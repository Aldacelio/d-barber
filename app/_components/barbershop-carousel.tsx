"use client"

import { useRef, useState, useEffect } from "react"
import { Barbershop } from "@prisma/client"
import BarbershopItem from "./barbershop-item"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface BarbershopCarouselProps {
  barbershops: Barbershop[]
}

const BarbershopCarousel = ({ barbershops }: BarbershopCarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [showLeftButton, setShowLeftButton] = useState(false)
  const [showRightButton, setShowRightButton] = useState(true)

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
      setShowLeftButton(scrollLeft > 0)
      setShowRightButton(scrollLeft < scrollWidth - clientWidth)
    }
  }

  // Verifica a rolagem inicial ao carregar o componente
  useEffect(() => {
    checkScroll()
    const handleResize = () => checkScroll()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="relative">
      {showLeftButton && (
        <button
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-primary/90 p-2"
          onClick={() => {
            scrollLeft()
            checkScroll()
          }}
        >
          <ChevronLeft className="text-white" />
        </button>
      )}

      <div
        ref={carouselRef}
        onScroll={checkScroll}
        className="flex gap-4 overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden"
      >
        {barbershops.map((barbershop) => (
          <BarbershopItem key={barbershop.id} barbershop={barbershop} />
        ))}
      </div>

      {showRightButton && (
        <button
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-primary/90 p-2"
          onClick={() => {
            scrollRight()
            checkScroll()
          }}
        >
          <ChevronRight className="text-white" />
        </button>
      )}
    </div>
  )
}

export default BarbershopCarousel
