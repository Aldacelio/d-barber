import Image from "next/image"
import { Button } from "./ui/button"

// Função para remover acentos de uma string
const removerAcentos = (texto: string) => {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

const QuickSearch = () => {
  const servicos: Array<string> = [
    "acabamento",
    "barba",
    "cabelo",
    "hidratação",
    "massagem",
    "sobrancelha",
  ]

  return (
    <>
      {servicos.map((servico, index) => {
        const servicoSemAcento = removerAcentos(servico)
        return (
          <Button key={index} className="gap-2" variant="secondary">
            <Image
              src={`/${servicoSemAcento}.svg`}
              width={16}
              height={16}
              alt={servico}
            />
            {servico}
          </Button>
        )
      })}
    </>
  )
}

export default QuickSearch
