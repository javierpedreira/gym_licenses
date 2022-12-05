'use client'

import {useState} from 'react'
import {LicensesService} from '../../dbOps/LicensesService'

const TODAY = new Date().toISOString().slice(0, 10)

interface CreateLicenseProps {
  owner: string
}

export default function CreateLicense({owner}: CreateLicenseProps) {
  const [expedition, setExpeditionDate] = useState(TODAY)
  const [identifier, setIdentifier] = useState(0)

  const create = async () => {
    LicensesService.create({identifier, expedition, owner: owner})

    setExpeditionDate(TODAY)
    setIdentifier(0)
  }

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
      <button type="submit" disabled={!identifier}>
        Add a new license
      </button>
    </form>
  )
}
