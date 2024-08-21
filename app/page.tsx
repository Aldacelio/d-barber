import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import Image from "next/image"
import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/barbershop-item"
import { quickSearchOptions } from "./_constants/search"
import BookingItem from "./_components/booking-item"
import Search from "./_components/search"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "./_lib/auth"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { getConfirmedBookings } from "./_data/get-confirmed-bookings"
import BookingCarousel from "./_components/booking-carousel"
import BarbershopCarousel from "./_components/barbershop-carousel"

const Home = async () => {
  const session = await getServerSession(authOptions)
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })
  const confirmedBookings = await getConfirmedBookings()

  return (
    <div>
      {/* header */}
      <Header />
      <div className="hidden md:flex">
        <div className="relative h-[25rem] w-full bg-[url('/fundo1.png')] bg-no-repeat">
          <div className="absolute left-12 top-8 w-[37%]">
            <h2 className="text-2xl font-bold text-white">
              Olá, {session?.user ? session.user.name : "Bem-vindo"}
            </h2>
            <p className="text-white">
              <span className="text-xs capitalize">
                {format(new Date(), "EEEE, dd ", { locale: ptBR })}
              </span>
              <span className="text-xs">de</span>
              <span className="text-xs capitalize">
                {format(new Date(), " MMMM", { locale: ptBR })}
              </span>
            </p>

            {/* Busca */}
            <div className="mt-6 gap-2">
              <Search />
            </div>

            {/* Agendamento */}
            {confirmedBookings.length > 0 && (
              <>
                <h2 className="upercase text-xxs mb-3 mt-6 font-bold text-gray-400">
                  Agendamentos
                </h2>

                <BookingCarousel />
              </>
            )}
          </div>

          <div className="absolute left-2/4 top-3 w-[46%]">
            {/* Recomendados */}
            <h2 className="upercase text-xxs mb-3 mt-6 font-bold text-gray-400">
              Recomendados
            </h2>

            <BarbershopCarousel barbershops={barbershops} />
          </div>
        </div>
      </div>

      <div className="p-5 md:hidden">
        <h2 className="text-xl font-bold">
          Olá, {session?.user ? session.user.name : "Bem-vindo"}
        </h2>
        <p>
          <span className="capitalize">
            {format(new Date(), "EEEE, dd ", { locale: ptBR })}
          </span>
          <span>de</span>
          <span className="capitalize">
            {format(new Date(), " MMMM", { locale: ptBR })}
          </span>
        </p>

        {/* Busca */}
        <div className="mt-6 gap-2">
          <Search />
        </div>

        {/* Busca rapida */}
        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button
              key={option.title}
              className="gap-2"
              variant="secondary"
              asChild
            >
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  src={option.imageUrl}
                  width={16}
                  height={16}
                  alt={option.title}
                />
                {option.title}
              </Link>
            </Button>
          ))}
        </div>

        {/* Imagem */}
        <div className="relative mt-6 h-[18vh] w-full">
          <Image
            alt="Agende nos melhores com D Barber"
            src="/banner-01.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        {/* Agendamento */}
        {confirmedBookings.length > 0 && (
          <>
            <h2 className="upercase text-xxs mb-3 mt-6 font-bold text-gray-400">
              Agendamentos
            </h2>

            <div className="flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
              {confirmedBookings.map((booking) => (
                <BookingItem
                  key={booking.id}
                  booking={JSON.parse(JSON.stringify(booking))}
                />
              ))}
            </div>
          </>
        )}

        {/* Recomendados */}
        <h2 className="upercase text-xxs mb-3 mt-6 font-bold text-gray-400">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        {/* Populares */}
        <h2 className="upercase text-xxs mb-3 mt-6 font-bold text-gray-400">
          Populares
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
