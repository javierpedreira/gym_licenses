'use client'

import {useState} from 'react'
import {StudentsService} from '../../dbOps/StudentsService'

const TODAY = new Date().toISOString().slice(0, 10)

export default function CreateStudent() {
  const [birthday, setBirthday] = useState(TODAY)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const create = async () => {
    StudentsService.create({name, email, birthday})
    setBirthday(TODAY)
    setName('')
    setEmail('')
  }

  return (
    <form className="p-5 mb-6 bg-neutral-200 rounded-xl" onSubmit={create}>
      <div className='flex shadow sm:overflow-hidden sm:rounded-md"'>
        <input
          className="px-4 py-2 mr-4 flex-auto rounded-lg"
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="px-4 py-2 mr-4 flex-auto rounded-lg"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="px-4 py-2 mr-4 flex-auto rounded-lg"
          type="date"
          placeholder="Fecha de nacimiento"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
        <button className="px-6 bg-neutral-500 rounded-lg font-bold text-zinc-200 hover:bg-neutral-400" type="submit">
          Create
        </button>
      </div>
    </form>
  )
}
