async function getStudent(id: string) {
  const res = await fetch(`http://127.0.0.1:8090/api/collections/students/records/${id}`)
  const data = await res.json()

  return data
}

async function getLicenses () {
  const res = await fetch('http://127.0.0.1:8090/api/collections/licenses/records?page=1&perPage30')
  const data = await res.json()

  const rawLicenses = data?.items as any[] 

  // TODO: Add the owner email or username and fix async call by resolving the Promise
  // const licesesWithStudents = rawLicenses?.map(async (license) => {
  //   const res = await getStudent(license.owner)

  //   return Object.assign(license, {owner: res.email})
  // })

  return rawLicenses
}
export default async function LicensesPage() {
  const licenses = await getLicenses()

  return (
    <div>
      <h1>Licenses</h1>
      <div>
        {licenses?.map((lic) => {
            return <License key={lic.id} owner={lic.owner} expiration={lic.expiration}/>
        })}
      </div>
    </div>
  )
}

interface LicenseProps {
  owner: string
  expiration: string
}

function License({owner, expiration}: LicenseProps) {
  return (
    <>
      <div>Owner: {owner}</div>
      <div>Email: {expiration}</div>
    </>
  )
}


