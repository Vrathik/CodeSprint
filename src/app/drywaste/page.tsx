import WasteGrid from '../../components/WasteGrid'
import Header from '../../components/Header'

const dryWasteData = [
  { id: 1, name: "Cardboard", price: 0.20, image: "/dry1.jpeg" },
  { id: 2, name: "Plastic Bottles", price: 0.40, image: "/dry2.jpeg" },
  { id: 3, name: "Newspapers", price: 0.15, image: "/dry3.jpeg" },
  { id: 4, name: "Aluminum Cans", price: 0.60, image: "/dry4.jpg" },
]

export default function DryWaste() {
  return (
    <div>
            <Header/>
      
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Dry Waste</h1>
        <WasteGrid items={dryWasteData} />
      </div>
    </div>
  )
}

