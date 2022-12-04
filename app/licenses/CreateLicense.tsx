'use client'

import {ChangeEvent, useState} from 'react'
import {LicensesService} from '../dbOps/LicensesService'

const TODAY = new Date().toISOString().slice(0, 10)

export interface StudentId {
  id: string
  name: string
}

interface CreateLicenseProps {
  owners: StudentId[]
}

interface StudentsSelectorProps {
  students: StudentId[]
  selectStudent: (event: ChangeEvent<HTMLSelectElement>) => void
}

function StudentsSelector({students, selectStudent}: StudentsSelectorProps) {
  return (
    <>
      <label htmlFor="student-select">Select a student:</label>
      <select name="students" id="student-select" onChange={selectStudent}>
        <option value="">--Please choose an option--</option>
        {students?.map((student) => {
          return (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          )
        })}
      </select>
    </>
  )
}

export default function CreateLicense({owners}: CreateLicenseProps) {
  const [expedition, setExpeditionDate] = useState(TODAY)
  const [identifier, setIdentifier] = useState(0)
  const [owner, setOwner] = useState<StudentId>(owners[0])

  const setBody = () => {
    return JSON.stringify({
      expedition,
      identifier,
      owner
    })
  }

  const create = async () => {
    LicensesService.create(identifier, expedition, owner)

    setExpeditionDate(TODAY)
    setIdentifier(0)
    setOwner(owners[0])
  }

  const addSelectedStudentToState = (event: ChangeEvent<HTMLSelectElement>) => setOwner(event.target.value)

  return (
    <form onSubmit={create}>
      <h1>Add a new License</h1>
      <input
        type="number"
        placeholder="Identifier"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.valueAsNumber)}
      />
      <input
        type="date"
        placeholder="Expedition Date"
        value={expedition}
        onChange={(e) => setExpeditionDate(e.target.value)}
      />
      <StudentsSelector students={owners} selectStudent={addSelectedStudentToState} />
      <button type="submit">Add a new license</button>
    </form>
  )
}
