import Sidebar from '../../components/nav/Sidebar'
import AddForm from '../../components/forms/AdForm.jsx'

const SellLand = () => {
  return (
    <div>
      <h1 className="display-1 bg-primary text-light p-5">Sell Land</h1>
      <Sidebar />
      <div className="container mt-2">
        <AddForm action="Sell" type="Land" />
      </div>
    </div>
  )
}

export default SellLand
