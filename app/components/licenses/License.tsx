import {LicensesService} from '../../dbOps/LicensesService'

export interface LicenseProps {
  id: string
  expedition: string
  identifier: number
  updateLicenses: () => void
}

export default function LicenseComponent({id, expedition, identifier, updateLicenses}: LicenseProps) {
  const callDelete = () => {
    LicensesService.delete(id)
      .then(() => {
        updateLicenses()
      })
      .catch((error) => {
        console.log(`Something went wrong, ${error}`)
      })
  }
  return (
    <>
      <div>Expedition date: {expedition}</div>
      <div>ID: {identifier}</div>
      <button onClick={callDelete}>Delete</button>
    </>
  )
}
