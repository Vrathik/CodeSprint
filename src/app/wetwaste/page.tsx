import Header from '../../components/Header'
import WasteGrid from '../../components/WasteGrid'

const wetWasteData = [
  { id: 1, name: "Food Scraps", price: 0.50, image: "/wet1.jpeg" },
  { id: 2, name: "Yard Trimmings", price: 0.30, image: "/wet2.jpeg" },
  { id: 3, name: "Fruit Peels", price: 0.25, image: "/wet3.jpg" },
  { id: 4, name: "Coffee Grounds", price: 0.20, image: "/wet4.jpeg" },
]

export default function WetWaste() {
  return (
    <div>
      <Header/>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Wet Waste</h1>
        <WasteGrid items={wetWasteData} />
      </div>
    </div>
  )
}

