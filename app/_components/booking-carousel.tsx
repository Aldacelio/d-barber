"use client"

import { useState, useEffect } from "react"
import BookingItem from "./booking-item"
import { Prisma } from "@prisma/client"
import { getConfirmedBookings } from "../_data/get-confirmed-bookings"

type Booking = Prisma.BookingGetPayload<{
  include: {
    service: {
      include: {
        barbershop: true
      }
    }
  }
}>

const BookingCarousel = () => {
  const [confirmedBookings, setConfirmedBookings] = useState<Booking[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const fetchBookings = async () => {
      const bookings = await getConfirmedBookings()
      setConfirmedBookings(bookings)
    }

    fetchBookings()
  }, [])

  const handleDotClick = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div className="relative max-w-screen-lg overflow-hidden">
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {confirmedBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>
        {/* Indicators */}
        <div className="absolute inset-x-0 bottom-0 flex justify-center gap-2 pb-2">
          {confirmedBookings.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-3 w-3 rounded-full ${index === currentIndex ? "bg-blue-500" : "bg-gray-300"}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BookingCarousel
