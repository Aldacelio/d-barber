import { getServerSession } from "next-auth"
import Header from "../_components/header"
import { authOptions } from "../_lib/auth"
import BookingItem from "../_components/booking-item"
import { Dialog, DialogContent } from "../_components/ui/dialog"
import SignInDialog from "../_components/sign-in-dialog"
import { getConfirmedBookings } from "../_data/get-confirmed-bookings"
import { getConcludedBookings } from "../_data/get-concluded-bookings"
import BookingSummary from "../_components/booking-summary"

const Bookings = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return (
      <Dialog open>
        <DialogContent className="w-[90%]">
          <SignInDialog />
        </DialogContent>
      </Dialog>
    )
  }

  const confirmedBookings = await getConfirmedBookings()
  const concludedBookings = await getConcludedBookings()
  return (
    <>
      <Header />

      <div className="space-y-3 p-5 md:ml-40">
        <h1 className="text-xl font-bold">Agendamentos</h1>
        {confirmedBookings.length === 0 && concludedBookings.length === 0 && (
          <p className="text-gray-400">Você não tem agendamentos.</p>
        )}
        {confirmedBookings.length > 0 && (
          <>
            <h2 className="upercase text-xxs mb-3 mt-6 font-bold text-gray-400">
              Confirmados
            </h2>
            {confirmedBookings.map((booking) => (
              <>
                <BookingItem
                  key={booking.id}
                  booking={JSON.parse(JSON.stringify(booking))}
                />
              </>
            ))}
          </>
        )}

        {concludedBookings.length > 0 && (
          <>
            <h2 className="upercase text-xxs mb-3 mt-6 font-bold text-gray-400">
              Finalizados
            </h2>
            {concludedBookings.map((booking) => (
              <BookingItem
                key={booking.id}
                booking={JSON.parse(JSON.stringify(booking))}
              />
            ))}
          </>
        )}
      </div>
    </>
  )
}

export default Bookings
