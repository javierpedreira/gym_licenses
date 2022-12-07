'use client'

import {useEffect, useState} from 'react'
import {StudentQueryResponse, StudentsService} from '../../dbOps/StudentsService'
import CreateStudent from './CreateStudent'
import StudentRow from './StudentRow'

interface StudentsProps {
  students: StudentQueryResponse[]
}

export default function Students({students}: StudentsProps) {
  const [sts, setStudents] = useState<StudentQueryResponse[]>(students)
  const [showCreateStudents, setShowCreateStudents] = useState(false)

  useEffect(() => {
    ;(async () => {
      updateStudents()
    })()
  }, [])

  const updateStudents = async () => {
    const students = await StudentsService.fetchAll()

    setStudents(students)
  }

  const clicked = () => {
    setShowCreateStudents(!showCreateStudents)
  }

  const CreateButton = (className: string) => {
    return (
      <button className={className} onClick={clicked}>
        Crear
      </button>
    )
  }

  return (
    <div>
      <div className="flex">
        <h1 className="text-xl font-bold py-6">Alumnos</h1>
        {CreateButton('ml-4')}
      </div>
      {showCreateStudents && <CreateStudent />}
      {!sts?.length && !showCreateStudents ? (
        <h1 className="text-center">
          No hay Alumnos. Clica en {CreateButton('p-1 px-2 bg-slate-300 font-bold rounded-lg hover:bg-slate-200')} para
          empezar
        </h1>
      ) : (
        <ul>
          {sts?.map((student) => {
            return (
              <StudentRow
                key={student.id}
                id={student.id}
                name={student.name}
                email={student.email}
                birthday={student.birthday}
                licenseSummaryId={student.identifier}
                licenseSummaryExpiration={student.expiration}
              />
            )
          })}
        </ul>
      )}
    </div>
  )
}
