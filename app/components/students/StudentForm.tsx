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
    <form className="flex my-10 p-5 bg-slate-300 rounded-lg">
      <div className="flex-auto">
        <label className="font-bold px-2 flex-1" htmlFor="html">
          Nombre:
        </label>
        <input
          className="px-4 py-2 mr-4 flex-2 rounded-lg"
          type="text"
          placeholder="Name"
          value={newName}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex-auto">
        <label className="font-bold px-2 flex-1" htmlFor="html">
          Email:
        </label>
        <input
          className="px-4 py-2 mr-4 flex-2 rounded-lg"
          type="email"
          placeholder="Email"
          value={newEmail}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex-auto">
        <label className="font-bold px-2 flex-1" htmlFor="html">
          Fecha de nacimiento:
        </label>
        <input
          className="align-right px-4 py-2 mr-4 flex-2 rounded-lg"
          type="date"
          placeholder="Birthday"
          value={newBirthday.slice(0, 10)}
          onChange={(e) => setBirthday(e.target.value)}
        />
      </div>
      <button
        className="bg-slate-800 hover:bg-slate-600 text-slate-100 px-4 py-2 mr-4 font-bold flex-auto rounded-lg"
        type="submit"
        onClick={callUpdate}>
        Actualizar
      </button>
      <button className="px-4 py-2 mr-4 font-bold hover:text-slate-600 flex-1 rounded-lg" onClick={callDelete}>
        Borrar
      </button>
    </form>
  )
}
