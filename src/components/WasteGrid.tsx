import WasteCard from './WasteCard'

interface WasteItem {
  id: number
  name: string
  price: number
  image: string
}

interface WasteGridProps {
  items: WasteItem[]
}

export default function WasteGrid({ items }: WasteGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((item) => (
        <WasteCard key={item.id} name={item.name} price={item.price} image={item.image} />
      ))}
    </div>
  )
}

