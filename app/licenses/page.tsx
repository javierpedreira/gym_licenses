import CreateLicense from "./CreateLicense"

export interface Student {
  id: string
  name: string
}

async function getStudents () {
  const res = await fetch('http://127.0.0.1:8090/api/collections/students/records?page=1&perPage30')
  const data = await res.json()

  return data?.items as any[]
}
async function getLicenses () {
  const res = await fetch('http://127.0.0.1:8090/api/collections/licenses/records?page=1&perPage30&expand=owner')
  const data = await res.json()

  const rawLicenses = data?.items as any[] 

  return rawLicenses
}

export default async function LicensesPage() {
  const licenses = await getLicenses()
  const students = (await getStudents()).map((student) => {

    return {id: student.id as string, name: student.name as string}
  })

  return (
    <div>
      <h1>Licenses</h1>
      <div>
        {licenses?.map((lic) => {
          return <License key={lic.id} owner={lic.expand.owner.name} identifier={lic.identifier} expedition={lic.expedition}/>
        })}
      </div>

      <CreateLicense owners={students} />
    </div>
  )
}

interface LicenseProps {
  owner: string
  expedition: string
  identifier: number
}

function License({owner, expedition, identifier}: LicenseProps) {
  return (
    <>
      <div>Owner: {owner}</div>
      <div>Expedition date: {expedition}</div>
      <div>ID: {identifier}</div>
    </>
  )
}


