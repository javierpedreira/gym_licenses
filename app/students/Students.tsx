'use client'

import {useEffect, useState} from 'react'
import {StudentsService} from '../utils/StudentsService'
import CreateStudent from './CreateStudent'
import StudentCompoent, {Student} from './Student'

interface StudentsProps {
  students: Student[]
}

export default function Students({students}: StudentsProps) {
  const [sts, setStudents] = useState<Student[]>(students)

  useEffect(() => {
    ;(async () => {
      const students = await StudentsService.fetchAllStudents()

      setStudents(students)
    })()
  }, [])

  const updateStudents = async () => {
    const students = await StudentsService.fetchAllStudents()

    setStudents(students)
  }

  return (
    <div>
      <h1>Students</h1>
      <div>
        {sts?.map((student) => {
          return (
            <StudentCompoent
              updateStudents={updateStudents}
              key={student.id}
              id={student.id}
              name={student.name}
              email={student.email}
              birthday={student.birthday}
            />
          )
        })}
      </div>
      <CreateStudent />
    </div>
  )
}
