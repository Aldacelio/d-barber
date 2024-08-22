import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Sheet, SheetTrigger } from "./ui/sheet"
import { Button } from "./ui/button"
import { MenuIcon } from "lucide-react"
import SidebarSheet from "./sidebar-sheet"
import Link from "next/link"
import BarDesktop from "./bar-desktop"

const Header = async () => {
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-5">
        <Link href="/" className="hidden md:ml-10 md:flex">
          <Image
            alt="logo"
            src="/logo.png"
            height={18}
            width={120}
            className="h-auto w-auto md:flex"
          />
        </Link>

        {/* Navegação Desktop */}
        <div className="hidden md:mr-10 md:flex md:items-center md:text-xs">
          <BarDesktop />
        </div>

        {/* Menu Mobile */}

        <Link href="/" className="md:hidden">
          <Image
            alt="logo"
            src="/logo.png"
            height={18}
            width={120}
            className="h-auto w-auto md:hidden"
          />
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="md:hidden">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SidebarSheet />
        </Sheet>
      </CardContent>
    </Card>
  )
}

export default Header
