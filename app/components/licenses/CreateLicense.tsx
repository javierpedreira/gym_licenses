'use client'

import {useState} from 'react'
import {LicensesService} from '../../dbOps/LicensesService'

const TODAY = new Date().toISOString().slice(0, 10)

interface CreateLicenseProps {
  owner: string
}

export default function CreateLicense({owner}: CreateLicenseProps) {
  const [expedition, setExpeditionDate] = useState(TODAY)
  const [expiration, setExpirationDate] = useState(TODAY)
  const [identifier, setIdentifier] = useState(0)

  const create = async () => {
    LicensesService.create({identifier, expedition, owner: owner, expiration})

    setExpeditionDate(TODAY)
    setIdentifier(0)
  }

  return (
    <form className="p-5 mb-6 bg-neutral-200 rounded-xl" onSubmit={create}>
      <div className="flex shadow sm:overflow-hidden sm:rounded-md">
        <input
          className="px-4 py-2 mr-4 flex-auto rounded-lg"
          type="number"
          placeholder="Identifier"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.valueAsNumber)}
        />
        <input
          className="px-4 py-2 mr-4 flex-auto rounded-lg"
          type="date"
          placeholder="Expedition Date"
          value={expedition}
          onChange={(e) => setExpeditionDate(e.target.value)}
        />
        <input
          className="px-4 py-2 mr-4 flex-auto rounded-lg"
          type="date"
          placeholder="Expedition Date"
          value={expiration}
          onChange={(e) => setExpirationDate(e.target.value)}
        />
        <button
          className="px-6 bg-neutral-500 rounded-lg font-bold text-zinc-200 hover:bg-neutral-400"
          type="submit"
          disabled={!identifier}>
          Agregar
        </button>
      </div>
    </form>
  )
}
