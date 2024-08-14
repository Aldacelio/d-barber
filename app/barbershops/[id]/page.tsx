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

interface BarbershopPageProps {
  params: {
    id: string
  }
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  })

  if (!barbershop) {
    return notFound()
  }

  return (
    <div>
      {/* Imagem */}
      <div className="relative h-[250px] w-full">
        <Image
          alt={barbershop.name}
          fill
          className="object-cover"
          src={barbershop?.imageUrl}
        />
        <Button
          size="icon"
          variant="secondary"
          className="absolute left-4 top-4"
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
              className="absolute right-4 top-4"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SidebarSheet />
        </Sheet>
      </div>

      {/* Informações */}
      <div className="border-b border-solid p-5">
        <h1 className="mb-3 text-xl font-bold">{barbershop?.name}</h1>
        <div className="mb-2 flex items-center gap-2">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{barbershop?.address}</p>
        </div>

        <div className="flex items-center gap-2">
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
              barbershop={barbershop}
              service={service}
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
