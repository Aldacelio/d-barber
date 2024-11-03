import { format } from "date-fns"
import { Card, CardContent } from "./ui/card"
import { ptBR } from "date-fns/locale"
import { Barbershop, BarbershopService } from "@prisma/client"

interface BookingSummaryProps {
  service: Pick<BarbershopService, "name" | "price">
  barbershop: Pick<Barbershop, "name">
  selectedDate: Date
}

const BookingSummary = ({
  barbershop,
  service,
  selectedDate,
}: BookingSummaryProps) => {
  return (
    <Card>
      <CardContent className="space-y-3 p-3">
        <div className="flex items-center justify-between">
          <h2 className="font-bold md:text-sm">{service.name}</h2>
          <p className="text-sm font-bold md:text-xs">
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(Number(service.price))}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-sm text-gray-400 md:text-xs">Data</h2>
          <p className="text-sm md:text-xs">
            {format(selectedDate, "dd 'de' MMMM", {
              locale: ptBR,
            })}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-sm text-gray-400 md:text-xs">Horário</h2>
          <p className="text-sm md:text-xs">{format(selectedDate, "HH:mm")}</p>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-sm text-gray-400 md:text-xs">Barbearia</h2>
          <p className="text-sm md:text-xs">{barbershop.name}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default BookingSummary
