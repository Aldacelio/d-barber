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
      <div className="relative h-[250px] w-full md:ml-16 md:mt-8 md:h-96 md:w-[55%]">
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
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="absolute right-4 top-4 md:hidden"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SidebarSheet />
        </Sheet>
      </div>

      {/* Informações */}
      <div className="border-b border-solid p-5 md:ml-11 md:border-none">
        <h1 className="mb-3 text-xl font-bold md:text-2xl">
          {barbershop?.name}
        </h1>
        <div className="mb-2 flex items-center gap-2">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{barbershop?.address}</p>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <MapPinIcon className="fill-primary text-primary" size={18} />
          <p className="text-sm">5,0 (499 avaliações)</p>
        </div>
      </div>

      {/* Descrição */}
      <div className="border-b border-solid p-5">
        <h2 className="text-xss font-bold uppercase text-gray-400">
          Sobre nós
        </h2>
        <p className="text-justify text-sm">{barbershop?.description}</p>
      </div>

      {/* Serviços */}
      <div className="space-y-3 border-b border-solid p-5">
        <h2 className="text-xss mb-3 font-bold uppercase text-gray-400">
          Serviços
        </h2>
        <div className="space-y-3">
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
      <div className="space-y-3 p-5">
        {barbershop.phones.map((phone, index) => (
          <PhoneItem key={`${phone}-${index}`} phone={phone} />
        ))}
      </div>
    </div>
  )
}

export default BarbershopPage
