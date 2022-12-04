import {StudentsService} from '../../dbOps/StudentsService'

interface StudentDetailProps {
  params: {
    id: string
  }
}
export default async function Page({params}: StudentDetailProps) {
  const {data} = await StudentsService.find(params.id)
  if (!data) {
    return <h1> Student not found</h1>
  }

  return (
    <>
      {data.name}, {data.email}, {data.birthday}
    </>
  )
}
