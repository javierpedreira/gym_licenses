'use client'

import {useState} from 'react'

export interface Student {
  id: string
  name: string
  email: string
  birthday: string
}

interface StudentProps extends Student {
  updateStudents: () => void
}

async function deleteStudent(id: string) {
  const res = await fetch(`http://127.0.0.1:8090/api/collections/students/records/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return res
}

const body = (name: string, email: string, birthday: string) => {
  return JSON.stringify({
    name,
    email,
    birthday
  })
}

async function editStudent(id: string, name: string, email: string, birthday: string) {
  const res = await fetch(`http://127.0.0.1:8090/api/collections/students/records/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: body(name, email, birthday)
  })

  return res
}

export default function StudentCompoent({name, email, birthday, id, updateStudents}: StudentProps) {
  const [newBirthday, setBirthday] = useState(birthday)
  const [newName, setName] = useState(name)
  const [newEmail, setEmail] = useState(email)

  const callDelete = () => {
    deleteStudent(id)
      .then(() => {
        updateStudents()
      })
      .catch((error) => {
        console.log(`Something went wrong, ${error}`)
      })
  }

  const callUpdate = () => {
    editStudent(id, newName, newEmail, newBirthday)
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
