import PhoneItem from "@/app/_components/phone-item"
import ServiceItem from "@/app/_components/service-item"
import { Button } from "@/app/_components/ui/button"
import { db } from "@/app/_lib/prisma"
import { ChevronLeftIcon, MapPinIcon, MenuIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet"
import SidebarSheet from "@/app/_components/sidebar-sheet"
import { getBarbershopServices } from "@/app/_data/get-barbershop-services"
import Header from "@/app/_components/header"
import { Card, CardContent } from "@/app/_components/ui/card"
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar"

interface BarbershopPageProps {
  params: {
    id: string
  }
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  const barbershop = await getBarbershopServices(params)

  if (!barbershop) {
    return notFound()
  }

  return (
    <div>
      <Header />
      {/* Imagem */}
      <div className="relative h-[250px] w-full md:ml-10 md:mt-8 md:h-96 md:w-[58%]">
        <Image
          alt={barbershop.name}
          fill
          className="object-cover md:rounded-lg"
          src={barbershop?.imageUrl}
        />
        <Button
          size="icon"
          variant="secondary"
          className="absolute left-4 top-4 md:hidden"
          asChild
        >
          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>
      </div>

      {/* Informações */}
      <div className="border-b border-solid p-5 md:relative md:ml-5 md:border-none">
        <h1 className="mb-3 text-xl font-bold md:text-2xl">
          {barbershop?.name}
        </h1>
        <div className="mb-2 flex items-center gap-2 md:mb-0">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{barbershop?.address}</p>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <MapPinIcon className="fill-primary text-primary" size={18} />
          <p className="text-sm">5,0 (499 avaliações)</p>
        </div>
      </div>

      {/* Descrição */}
      <div className="border-b border-solid p-5 md:absolute md:right-3 md:top-28 md:mr-10 md:w-[32%] md:rounded-2xl md:bg-secondary">
        {/* Mapa */}
        <div className="relative">
          <Image
            alt={`Mapa da barbearia ${barbershop.name}`}
            src="/map.png"
            width={400}
            height={300}
            className="hidden md:flex md:w-full md:rounded-xl md:object-cover"
          />

          <Card className="hidden md:absolute md:bottom-4 md:z-50 md:ml-4 md:flex md:w-[90%] md:rounded-xl">
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

        <h2 className="text-lg font-bold uppercase md:pt-5 md:text-base">
          Sobre nós
        </h2>
        <p className="text-justify text-sm md:pt-3 md:text-xs md:text-gray-400">
          {barbershop?.description}
        </p>

        <div className="mt-3 hidden md:inline-grid md:w-full md:grid-rows-2 md:border-b md:border-t md:border-solid md:border-secondary-foreground/20 md:pb-4 md:pt-2">
          {barbershop.phones.map((phone, index) => (
            <div key={`${phone}-${index}`} className="md:mt-2">
              <PhoneItem phone={phone} />
            </div>
          ))}
        </div>
      </div>

      {/* Serviços */}
      <div className="space-y-3 border-b border-solid p-5 md:ml-6">
        <h2 className="text-xss mb-3 font-bold uppercase text-gray-400">
          Serviços
        </h2>
        <div className="space-y-3 md:grid md:w-[61%] md:grid-cols-2 md:gap-2 md:space-y-0">
          {barbershop.services.map((service) => (
            <ServiceItem
              key={service.id}
              barbershop={JSON.parse(JSON.stringify(barbershop))}
              service={JSON.parse(JSON.stringify(service))}
            />
          ))}
        </div>
      </div>

      {/* Contatos */}
      <div className="space-y-3 p-5 md:hidden">
        {barbershop.phones.map((phone, index) => (
          <PhoneItem key={`${phone}-${index}`} phone={phone} />
        ))}
      </div>
    </div>
  )
}

export default BarbershopPage
