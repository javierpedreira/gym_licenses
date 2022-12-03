'use client'

import {useState} from 'react'
import {StudentsService} from '../utils/StudentsService'

export interface Student {
  id: string
  name: string
  email: string
  birthday: string
}

interface StudentProps extends Student {
  updateStudents: () => void
}

const body = (name: string, email: string, birthday: string) => {
  return JSON.stringify({
    name,
    email,
    birthday
  })
}

export default function StudentCompoent({name, email, birthday, id, updateStudents}: StudentProps) {
  const [newBirthday, setBirthday] = useState(birthday)
  const [newName, setName] = useState(name)
  const [newEmail, setEmail] = useState(email)

  const callDelete = () => {
    StudentsService.deleteStudent(id)
      .then(() => {
        updateStudents()
      })
      .catch((error) => {
        console.log(`Something went wrong, ${error}`)
      })
  }

  const callUpdate = () => {
    StudentsService.editStudent(id, newName, newEmail, newBirthday)
      .then(() => {
        updateStudents()
      })
      .catch((error) => {
        console.log(`Something went wrong, ${error}`)
      })
  }

  return (
    <form onSubmit={callUpdate}>
      <label htmlFor="html">Name:</label>
      <input type="text" placeholder="Name" value={newName} onChange={(e) => setName(e.target.value)} />
      <label htmlFor="html">Email:</label>
      <input type="email" placeholder="Email" value={newEmail} onChange={(e) => setEmail(e.target.value)} />
      <label htmlFor="html">Birhday:</label>
      <input
        type="date"
        placeholder="Birthday"
        value={newBirthday.slice(0, 10)}
        onChange={(e) => setBirthday(e.target.value)}
      />
      <button onClick={callDelete}>Delete</button>
      <button type="submit" onClick={callUpdate}>
        UpdateStudent
      </button>
    </form>
  )
}
