import Licenses from './Licenses'

async function getStudents() {
  const res = await fetch('http://127.0.0.1:8090/api/collections/students/records?page=1&perPage30')
  const data = await res.json()

  return data?.items as any[]
}

async function getLicenses() {
  const res = await fetch('http://127.0.0.1:8090/api/collections/licenses/records?page=1&perPage30&expand=owner')
  const data = await res.json()

  const rawLicenses = data?.items as any[]

  return rawLicenses
}

export interface License {
  id: string
  identifier: number
  owner: string
  expedition: string
}

export default async function LicensesPage() {
  const licenses = (await getLicenses()).map((lic) => {
    return {id: lic.id, identifier: lic.identifier, owner: lic.expand.owner.name, expedition: lic.expedition}
  })

  const students = await getStudents()

  return <Licenses licenses={licenses} students={students} />
}
