'use client'

import {useEffect, useState} from 'react'
import AuthLayer from '../components/AuthLayer'
import {StudentQueryResponse, StudentsService} from '../dbOps/StudentsService'
import CreateStudent from './CreateStudent'
import StudentCompoent from './Student'

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
    <AuthLayer>
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
    </AuthLayer>
  )
}
