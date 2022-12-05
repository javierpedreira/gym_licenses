'use client'

import {useEffect, useState} from 'react'
import {StudentsService} from '../../dbOps/StudentsService'

interface StudentProps {
  id: string
  name: string
  email: string
  birthday: string
}

export default function StudentCompoent({name, email, birthday, id}: StudentProps) {
  const [newBirthday, setBirthday] = useState(birthday)
  const [newName, setName] = useState(name)
  const [newEmail, setEmail] = useState(email)

  const callDelete = () => {
    StudentsService.delete(id)
      .then(() => {})
      .catch((error) => {
        console.log(`Something went wrong, ${error}`)
      })
  }

  const callUpdate = () => {
    try {
      StudentsService.edit(id, {name: newName, email: newEmail, birthday: newBirthday})
    } catch {
      console.log('Something went wrong')
    }
  }

  return (
    <form>
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
