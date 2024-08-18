"use server"

import { db } from "../_lib/prisma"

interface GetBarbershopServicesParams {
  id?: string
}

export const getBarbershopServices = async ({
  id,
}: GetBarbershopServicesParams) => {
  return db.barbershop.findUnique({
    where: {
      id: id,
    },
    include: {
      services: true,
    },
  })
}
