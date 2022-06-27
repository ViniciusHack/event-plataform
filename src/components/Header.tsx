import { List, X } from "phosphor-react";
import { Logo } from "./Logo";

interface HeaderProps {
  openSidebar: () => void;
  isSidebarOpen: boolean;
}

export function Header({ openSidebar, isSidebarOpen }: HeaderProps) {
  return (
    <header className="w-full py-5 px-6 flex items-center lg:justify-center justify-between bg-gray-700 border-b border-gray-600">
      <Logo />
      <button 
        className="flex lg:hidden gap-[7px] items-center"
        onClick={() => openSidebar()}
      >
        <span>Aulas</span>
        {!isSidebarOpen 
        ? <List size={32} className="text-blue-500" />
        : <X size={32} className="text-blue-500" />
        }
      </button>
    </header>
  )
}