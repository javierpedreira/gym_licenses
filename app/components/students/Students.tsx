'use client'

import {useEffect, useState} from 'react'
import {StudentQueryResponse, StudentsService} from '../../dbOps/StudentsService'
import StudentRow from './StudentRow'

interface StudentsProps {
  students: StudentQueryResponse[]
}

export default function Students({students}: StudentsProps) {
  const [sts, setStudents] = useState<StudentQueryResponse[]>(students)

  useEffect(() => {
    ;(async () => {
      updateStudents()
    })()
  }, [])

  const updateStudents = async () => {
    const students = await StudentsService.fetchAll()

    setStudents(students)
  }

  return (
    <div>
      <h1>Students</h1>
      <ul>
        {sts?.map((student) => {
          return (
            <StudentRow
              key={student.id}
              id={student.id}
              name={student.name}
              email={student.email}
              birthday={student.birthday}
            />
          )
        })}
      </ul>
    </div>
  )
}
