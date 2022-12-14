'use client'
import {LicenseQueryResponse} from '../../dbOps/LicensesService'
import Licenses from '../licenses/Licenses'
import StudentForm from './StudentForm'

interface StudentPageProps {
  id: string
  name: string
  email: string
  birthday: string
  licenses: LicenseQueryResponse[]
}
export default function StudentPage({id, name, email, birthday, licenses}: StudentPageProps) {
  return (
    <div>
      <StudentForm id={id} name={name} email={email} birthday={birthday} />
      <Licenses licenses={licenses} owner={id} />
    </div>
  )
}
