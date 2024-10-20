import { Menu } from "lucide-react";
import {Sheet, SheetContent, SheetTrigger} from "../components/ui/sheet";
import { Sidebar } from "./Sidebar";

export const MobileSideBar = () => {
  return (
    <Sheet>
        <SheetTrigger>
            <Menu className="text-white" />
        </SheetTrigger>
        <SheetContent>
            <Sidebar />
        </SheetContent>
    </Sheet>
  )
}
