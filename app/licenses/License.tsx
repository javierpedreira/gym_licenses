import {LicensesService} from '../utils/LicensesService'

export interface LicenseProps {
  id: string
  owner: string
  expedition: string
  identifier: number
  updateLicenses: () => void
}

export default function LicenseComponent({id, owner, expedition, identifier, updateLicenses}: LicenseProps) {
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
      <div>Owner: {owner}</div>
      <div>Expedition date: {expedition}</div>
      <div>ID: {identifier}</div>
      <button onClick={callDelete}>Delete</button>
    </>
  )
}
