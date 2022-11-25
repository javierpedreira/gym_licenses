import Students from './Students'

async function getStudents() {
  const res = await fetch('http://127.0.0.1:8090/api/collections/students/records?page=1&perPage30')
  const data = await res.json()

  return data?.items
}

export default async function StudentsPage() {
  const students = await getStudents()

  return <Students students={students} />
}
