"use client"

import { Barbershop } from "@prisma/client"
import BarbershopItem from "./barbershop-item"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel"

interface BarbershopCarouselProps {
  barbershops: Barbershop[]
  basis: string
}

const BarbershopCarousel = ({
  barbershops,
  basis,
}: BarbershopCarouselProps) => {
  return (
    <Carousel>
      <CarouselContent>
        {barbershops.map((barbershop) => (
          <CarouselItem key={barbershop.id} className={basis}>
            <BarbershopItem barbershop={barbershop} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export default BarbershopCarousel
