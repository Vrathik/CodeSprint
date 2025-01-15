import Header from '../../components/Header'
import WasteGrid from '../../components/WasteGrid'

const dummyData = [
  { id: 1, name: "Food Scraps", price: 0.50, image: "/foodscrap.jpeg?height=200&width=300" },
  { id: 2, name: "Yard Trimmings", price: 0.30, image: "/yard.jpeg?height=200&width=300" },
  { id: 3, name: "Cardboard", price: 0.20, image: "/card.jpeg?height=200&width=300" },
  { id: 4, name: "Plastic Bottles", price: 0.40, image: "/plastic.jpeg?height=200&width=300" },
]

export default function Home() {
  return (
    <div>
      <Header/>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Featured Waste Items</h1>
        <WasteGrid items={dummyData} />
      </div>
    </div>
  )
}

