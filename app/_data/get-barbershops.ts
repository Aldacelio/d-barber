"use server"

import { db } from "../_lib/prisma"

interface GetBarbershopsParams {
  title?: string
  service?: string
}

export const getBarbershops = async ({
  title,
  service,
}: GetBarbershopsParams) => {
  return db.barbershop.findMany({
    where: {
      OR: [
        title
          ? {
              name: {
                contains: title,
                mode: "insensitive",
              },
            }
          : {},
        service
          ? {
              services: {
                some: {
                  name: {
                    contains: service,
                    mode: "insensitive",
                  },
                },
              },
            }
          : {},
      ],
    },
  })
}
