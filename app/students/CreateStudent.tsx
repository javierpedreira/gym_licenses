'use client'

import {useState} from 'react'

const TODAY = new Date().toISOString().slice(0, 10)

export default function CreateLicense() {
  const [birthday, setBirthday] = useState(TODAY)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const setBody = () => {
    return JSON.stringify({
      email,
      name,
      birthday
    })
  }

  const create = async () => {
    const w = await fetch('http://127.0.0.1:8090/api/collections/students/records', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: setBody()
    })

    setBirthday(TODAY)
    setName('')
    setEmail('')
  }

  return (
    <form onSubmit={create}>
      <h1>Add a new student</h1>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="date" placeholder="Birthday" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
      <button type="submit">Create</button>
    </form>
  )
}
