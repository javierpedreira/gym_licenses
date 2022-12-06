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

  return (
    <div>
      <div className="flex">
        <h1 className="text-xl font-bold py-6">Alumnos</h1>
        <button className="ml-4" onClick={clicked}>
          Crear
        </button>
      </div>
      {showCreateStudents && <CreateStudent />}
      {!sts?.length ? (
        //TODO Hacer que el Crear sea el mismo boton para crear
        <h1 className="text-center">No hay Alumnos. Clica en Crear para empezar</h1>
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
              />
            )
          })}
        </ul>
      )}
    </div>
  )
}
