import {LicensesService} from '../dbOps/LicensesService'
import {StudentsService} from '../dbOps/StudentsService'
import Licenses from './Licenses'

export interface License {
  id: string
  identifier: number
  owner: string
  expedition: string
}

export default async function LicensesPage() {
  const licenses = await LicensesService.fetchAll()

  const students = await (
    await StudentsService.fetchAll()
  ).map((student) => {
    return {id: student.id, name: student.name}
  })

  return <Licenses licenses={licenses} students={students} />
}
