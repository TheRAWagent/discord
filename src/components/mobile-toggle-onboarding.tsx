import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import NavigationSidebar from "@/components/navigation/NavigationSidebar"

export const MobileToggleOnboarding = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant={"ghost"} size={"icon"} className=" md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side={"left"} className=" p-0 flex gap-0 w-auto">
                <div className="w-[72px]">
                    <NavigationSidebar />
                </div>
                <div className='w-[40px] bg-transparent' />
            </SheetContent>
        </Sheet>
    )
}