'use client'

import {useEffect, useState} from 'react'
import {StudentQueryResponse, StudentsService} from '../../dbOps/StudentsService'
import CreateStudent from './CreateStudent'
import StudentRow from './StudentRow'

interface StudentsProps {
  students: StudentQueryResponse[]
  user_id: string
}

export default function Students({students, user_id}: StudentsProps) {
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
    return <button className={className} onClick={clicked} />
  }

  const daysToExpore = (expiration: string | undefined): number | undefined => {
    if (!expiration) return undefined
    const now = new Date()
    if (now.toISOString().slice(0, 10) == expiration) return 0
    const exp = new Date(expiration).getTime()

    const daysToExpire = (exp - now.getTime()) / (1000 * 3600 * 24)

    return Math.floor(daysToExpire)
  }

  return (
    <div>
      <div className="flex">
        <h1 className="text-xl font-bold py-6">Alumnos</h1>
        {CreateButton('fa-solid fa-plus ml-4')}
      </div>
      {showCreateStudents && <CreateStudent user_id={user_id} />}
      {!sts?.length && !showCreateStudents ? (
        <h1 className="text-center">
          No hay Alumnos. Clica en{' '}
          {CreateButton('fa-solid fa-plus p-1 px-2 border-solid font-bold rounded-lg hover:bg-slate-200')} para agregar
          alumnos
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
                daysToExpire={daysToExpore(student.expiration)}
              />
            )
          })}
        </ul>
      )}
    </div>
  )
}
