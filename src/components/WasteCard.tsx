import Image from 'next/image'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Dummy JSON data for waste materials
const wasteData = [
  {
    name: "plastic",
    price: 0.50,
    image: "/plastic.jpeg"
  },
  {
    name: "organic",
    price: 0.30,
    image: "/foodscarp.jpeg"
  },
  {
    name: "paper",
    price: 0.25,
    image: "/paper-waste.jpeg"
  },
  {
    name: "metal",
    price: 1.20,
    image: "/metal-waste.jpeg"
  },
  {
    name: "glass",
    price: 0.40,
    image: "/glass-waste.jpeg"
  },
  {
    name: "electronic",
    price: 2.50,
    image: "/e-waste.jpeg"
  }
] as const

// Update props interface to use the waste data structure
interface WasteCardProps {
  name: (typeof wasteData)[number]['name']
  price: number
  image: string
}

export default function WasteCard({ name, price, image }: WasteCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <Image
          src={image}
          alt={`${name} waste material`}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
          priority={false}
        />
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4">
        <div>
          <h3 className="font-semibold capitalize">{name} Waste</h3>
          <p className="text-sm text-gray-500">${price.toFixed(2)} / kg</p>
        </div>
        <Button>Buy</Button>
      </CardFooter>
    </Card>
  )
}