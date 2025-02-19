import Sidebar from '../../components/nav/Sidebar'
import AddForm from '../../components/forms/AdForm.jsx'

const RentLand = () => {
  return (
    <div>
      <h1 className="display-1 bg-primary text-light p-5">Rent Land</h1>
      <Sidebar />
      <div className="container mt-2">
        <AddForm action="Rent" type="Land" />
      </div>
    </div>
  )
}

export default RentLand
