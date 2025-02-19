import Sidebar from '../../components/nav/Sidebar'
import AddForm from '../../components/forms/AdForm.jsx'

const SellHouse = () => {
  return (
    <div>
      <h1 className="display-1 bg-primary text-light p-5">Sell House</h1>
      <Sidebar />
      <div className="container mt-2">
        <AddForm action="Sell" type="House" />
      </div>
    </div>
  )
}

export default SellHouse
