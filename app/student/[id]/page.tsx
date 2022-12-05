import StudentPage from '../../components/students/StudentPage'
import {LicensesService} from '../../dbOps/LicensesService'
import {StudentsService} from '../../dbOps/StudentsService'

interface StudentDetailProps {
  params: {
    id: string
  }
}
export default async function Page({params}: StudentDetailProps) {
  const {data} = await StudentsService.find(params.id)
  const licenses = await LicensesService.fetchByOwner(params.id)

  if (!data) {
    return <h1> Student not found</h1>
  }

  return <StudentPage id={params.id} name={data.name} email={data.email} birthday={data.birthday} licenses={licenses} />
}
