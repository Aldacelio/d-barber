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
}

const BarbershopCarousel = ({ barbershops }: BarbershopCarouselProps) => {
  return (
    <Carousel>
      <CarouselContent>
        {barbershops.map((barbershop) => (
          <CarouselItem key={barbershop.id}>
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
