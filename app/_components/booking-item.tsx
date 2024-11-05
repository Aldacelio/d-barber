"use client"

import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Prisma } from "@prisma/client"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import Image from "next/image"
import PhoneItem from "./phone-item"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { deleteBooking } from "../_actions/delete-booking"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import BookingSummary from "./booking-summary"

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    }
  }>
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const {
    service: { barbershop },
  } = booking
  const isConfirmed = isFuture(booking.date)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)")
    const handleResize = () => setIsDesktop(mediaQuery.matches)
    mediaQuery.addEventListener("change", handleResize)
    handleResize()
    return () => mediaQuery.removeEventListener("change", handleResize)
  }, [])

  const handleCancelBooking = async () => {
    try {
      await deleteBooking(booking.id)
      toast.success("Reserva cancelada com sucesso!")
      setIsSheetOpen(false)
    } catch (error) {
      console.error(error)
      toast.error("Erro ao cancelar reserva.Tente novamente.")
    }
  }

  const handleSheetOpenChange = (isOpen: boolean) => {
    setIsSheetOpen(isOpen)
  }

  return (
    <>
      {isDesktop ? (
        <div>
          <Card className="w-[80%] rounded-lg">
            <CardContent className="flex justify-between p-0">
              {/* Esquerda */}
              <div className="flex flex-col gap-2 py-5 pl-5">
                <Badge
                  className="w-fit"
                  variant={isConfirmed ? "default" : "secondary"}
                >
                  {isConfirmed ? "Confirmado" : "Finalizado"}
                </Badge>
                <h3 className="font-semibold">{booking.service.name}</h3>

                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={barbershop.imageUrl} />
                  </Avatar>
                  <p className="text-sm">{barbershop.name}</p>
                </div>
              </div>

              {/* Direita */}
              <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
                <p className="text-sm capitalize">
                  {format(booking.date, "MMMM", { locale: ptBR })}
                </p>
                <p className="text-2xl">
                  {format(booking.date, "dd", { locale: ptBR })}
                </p>
                <p className="text-sm">
                  {format(booking.date, "HH:mm", { locale: ptBR })}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
          <SheetTrigger className="w-full" asChild>
            <Card className="min-w-[90%] rounded-lg md:min-w-[100%]">
              <CardContent className="flex justify-between p-0">
                {/* Esquerda */}
                <div className="flex flex-col gap-2 py-5 pl-5">
                  <Badge
                    className="w-fit"
                    variant={isConfirmed ? "default" : "secondary"}
                  >
                    {isConfirmed ? "Confirmado" : "Finalizado"}
                  </Badge>
                  <h3 className="font-semibold">{booking.service.name}</h3>

                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={barbershop.imageUrl} />
                    </Avatar>
                    <p className="text-sm">{barbershop.name}</p>
                  </div>
                </div>

                {/* Direita */}
                <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
                  <p className="text-sm capitalize">
                    {format(booking.date, "MMMM", { locale: ptBR })}
                  </p>
                  <p className="text-2xl">
                    {format(booking.date, "dd", { locale: ptBR })}
                  </p>
                  <p className="text-sm">
                    {format(booking.date, "HH:mm", { locale: ptBR })}
                  </p>
                </div>
              </CardContent>
            </Card>
          </SheetTrigger>
          <SheetContent className="w-[85%]">
            <SheetHeader>
              <SheetTitle className="text-left">
                Informações da Reserva
              </SheetTitle>
            </SheetHeader>

            <div className="relative mt-6 flex h-[180px] w-full items-end">
              <Image
                alt={`Mapa da barbearia ${barbershop.name} `}
                src="/map.png"
                fill
                className="rounded-xl object-cover"
              />

              <Card className="z-50 mx-5 mb-3 w-full rounded-xl">
                <CardContent className="flex items-center gap-3 px-5 py-3">
                  <Avatar>
                    <AvatarImage src={barbershop.imageUrl} />
                  </Avatar>
                  <div>
                    <h3 className="font-bold">{barbershop.name}</h3>
                    <p className="text-xs">{barbershop.address}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6">
              <Badge
                className="w-fit"
                variant={isConfirmed ? "default" : "secondary"}
              >
                {isConfirmed ? "Confirmado" : "Finalizado"}
              </Badge>

              <div className="mb-6 mt-3">
                <BookingSummary
                  barbershop={barbershop}
                  service={booking.service}
                  selectedDate={booking.date}
                />
              </div>

              <div className="space-y-3">
                {barbershop.phones.map((phone, index) => (
                  <PhoneItem key={`${phone}-${index}`} phone={phone} />
                ))}
              </div>
            </div>

            <SheetFooter className="mt-6">
              <div className="flex items-center gap-3">
                <SheetClose asChild>
                  <Button variant="outline" className="w-full">
                    Voltar
                  </Button>
                </SheetClose>
                {isConfirmed && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="destructive" className="w-full">
                        Cancelar reserva
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[90%]">
                      <DialogHeader>
                        <DialogTitle>Cancelar Reserva</DialogTitle>
                        <DialogDescription>
                          Ao cancelar, você perderá sua reserva e não poderá
                          recuperá-la. Tem certeza que deseja cancelar esta
                          reserva?
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="flex flex-row gap-3">
                        <DialogClose asChild>
                          <Button variant="secondary" className="w-full">
                            Cancelar
                          </Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button
                            variant="destructive"
                            className="w-full"
                            onClick={handleCancelBooking}
                          >
                            Confirmar
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}
    </>
  )
}

export default BookingItem
