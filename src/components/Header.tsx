import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Leaf } from "lucide-react"

export default function Header() {
  return (
    <header className=" text-black mt-28">
      <nav className="container mx-auto px-4 py-3 flex flex-col sm:flex-row justify-between items-center">
        <Link 
          href="/" 
          className="flex items-center space-x-2 text-2xl font-bold hover:text-white transition-colors duration-200"
        >
          <Leaf className="w-6 h-6" />
          <span>Recycle Market</span>
        </Link>
        
        <ul className="flex space-x-4 mt-4 sm:mt-0">
          <li>
            <Link href="/wetwaste">
              <Button 
                variant="ghost" 
                className="text-black hover:text-white hover:bg-black transition-all duration-200"
              >
                Wet Waste
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/drywaste">
              <Button 
                variant="ghost"
                className="text-black hover:text-green-900 hover:bg-black transition-all duration-200"
              >
                Dry Waste
              </Button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}