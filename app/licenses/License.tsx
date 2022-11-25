export interface LicenseProps {
  id: string
  owner: string
  expedition: string
  identifier: number
  updateLicenses: () => void
}

async function deleteLicense(id: string) {
  const res = await fetch(`http://127.0.0.1:8090/api/collections/licenses/records/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return res
}

export default function LicenseComponent({id, owner, expedition, identifier, updateLicenses}: LicenseProps) {
  const callDelete = () => {
    deleteLicense(id)
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
