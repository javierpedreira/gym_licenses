'use client'

import { useEffect, useState } from "react"
import CreateStudent from "./CreateStudent"
import Student from './Student'

interface Std {
  id: string
  name: string
  email: string
  birthday: string
}

async function getStudents () {
    const res = await fetch('http://127.0.0.1:8090/api/collections/students/records?page=1&perPage30')
    const data = await res.json()

    return data?.items
}

export default function StudentsPage() {
  const [sts, setStudents] = useState<Std[]>([])

  useEffect(() => {
    (async () => {
      const students = await getStudents()
      
      setStudents(students)
    })()
  }, [])

  const  updateStudents = async () => {
    const students = await getStudents()
      
    setStudents(students)
  }


    return (
      <div>
        <h1>Students</h1>
        <div>
            {sts?.map((student) => {
                return <Student updateStudents={updateStudents} key={student.id} id={student.id} name={student.name} email={student.email} birthday={student.birthday} />
            })}
        </div>
        <CreateStudent />
      </div>
    )
}