"use client"

import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { Button } from "./ui/button"
import { CalendarIcon, CircleUser, LogOutIcon } from "lucide-react"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import SignInDialog from "./sign-in-dialog"

const BarDesktop = () => {
  const { data } = useSession()
  const handleLogoutClick = () => signOut()

  return (
    <div className="flex items-center gap-4">
      {data?.user ? (
        <>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={data?.user?.image ?? ""} />
            </Avatar>
            <p className="text-xs">{data.user.name}</p>
          </div>
          <Link href="/bookings">
            <Button variant="outline" className="gap-2 text-xs">
              <CalendarIcon size={18} />
              <span>Agendamentos</span>
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={handleLogoutClick}
            className="gap-2 text-xs"
          >
            <LogOutIcon size={18} />
            <span>Sair da conta</span>
          </Button>
        </>
      ) : (
        <Dialog>
          <DialogTrigger className="flex items-center gap-2 rounded-lg bg-primary p-2 hover:bg-primary/80">
            <CircleUser />
            <span>Logar</span>
          </DialogTrigger>
          <DialogContent className="w-[90%]">
            <SignInDialog />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

export default BarDesktop
