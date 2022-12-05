'use client'

import {MouseEventHandler, useState} from 'react'
import {StudentsService} from '../../dbOps/StudentsService'
import {useRouter} from 'next/navigation'

interface StudentProps {
  id: string
  name: string
  email: string
  birthday: string
}

export default function StudentForm({name, email, birthday, id}: StudentProps) {
  const [newBirthday, setBirthday] = useState(birthday)
  const [newName, setName] = useState(name)
  const [newEmail, setEmail] = useState(email)
  const router = useRouter()

  const callDelete = (e) => {
    try {
      StudentsService.delete(id)
    } catch (error) {
      alert('Failed to delete student')

      console.log(error)
    } finally {
      e.preventDefault()
      router.push('/')
    }
  }

  const callUpdate = () => {
    try {
      StudentsService.edit(id, {name: newName, email: newEmail, birthday: newBirthday})
    } catch (error) {
      alert('Failed to update student')

      console.log(error)
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
