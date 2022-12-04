import {LicensesService} from '../utils/LicensesService'
import {StudentsService} from '../utils/StudentsService'
import Licenses from './Licenses'

export interface License {
  id: string
  identifier: number
  owner: string
  expedition: string
}

export default async function LicensesPage() {
  const licenses = await LicensesService.fetchAll()

  const students = await StudentsService.fetchAllStudents()

  return <Licenses licenses={licenses} students={students} />
}
