import * as React from "react"
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";

import {
  HouseIcon,
  BooksIcon,
  SpeedometerIcon,
  UserCircleIcon,
  CreditCardIcon,
  GearSixIcon,
} from "@phosphor-icons/react/dist/ssr";

export function SearchHeader({color} : {color: boolean}) {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <Button onClick={() => setOpen(true)} variant={color ? "outline" : "secondary"} className="w-60 justify-between">
        Search courses...
        <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
          <span className="text-xs">⌘</span>J
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Quick links">
            <CommandItem>
              <HouseIcon />
              <span>Home</span>
            </CommandItem>
            <CommandItem>
              <BooksIcon />
              <span>Courses</span>
            </CommandItem>
            <CommandItem>
              <SpeedometerIcon />
              <span>Dashboard</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <UserCircleIcon />
              <span>Profile</span>
            </CommandItem>
            <CommandItem>
              <CreditCardIcon />
              <span>Billing</span>
            </CommandItem>
            <CommandItem>
              <GearSixIcon />
              <span>Settings</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}


// const SearchHeader = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleSearch = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div>
//       <button onClick={toggleSearch} className="mx-2">
//         <MagnifyingGlassIcon className="w-4 h-4 inline-block" />
//       </button>
//       {isOpen && (
//         <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
//           <div className="bg-white  rounded shadow-lg w-1/2 h-52 px-4">
//             <button
//               onClick={toggleSearch}
//               className="mt-4 mb-8 px-4 py-2 bg-red-500 text-white rounded float-right "
//             >
//               X
//             </button>
//             <input
//               type="text"
//               placeholder="Type to search..."
//               className="w-full px-4 py-2 border rounded focus:outline-none text-black "
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
