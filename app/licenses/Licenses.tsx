'use client'

import {useEffect, useState} from 'react'
import CreateLicense, {StudentId} from './CreateLicense'
import LicenseComponent from './License'
import {License} from './page'

interface LicensesProps {
  licenses: License[]
  students: StudentId[]
}

async function getLicenses() {
  const res = await fetch('http://127.0.0.1:8090/api/collections/licenses/records?page=1&perPage30&expand=owner')
  const data = await res.json()

  const rawLicenses = data?.items as any[]

  return rawLicenses
}

export default function Licenses({licenses, students}: LicensesProps) {
  const [lcs, setLicenses] = useState<License[]>(licenses)

  useEffect(() => {
    ;(async () => {
      const newLicenses = (await getLicenses()).map((lic) => {
        return {id: lic.id, identifier: lic.identifier, owner: lic.expand.owner.name, expedition: lic.expedition}
      })

      setLicenses(newLicenses)
    })()
  }, [])

  const updateLicenses = async () => {
    const newLicenses = (await getLicenses()).map((lic) => {
      return {id: lic.id, identifier: lic.identifier, owner: lic.expand.owner.name, expedition: lic.expedition}
    })

    setLicenses(newLicenses)
  }

  return (
    <div>
      <h1>Licenses</h1>
      <div>
        {lcs?.map((lic) => {
          return (
            <LicenseComponent
              updateLicenses={updateLicenses}
              key={lic.id}
              id={lic.id}
              owner={lic.owner}
              identifier={lic.identifier}
              expedition={lic.expedition}
            />
          )
        })}
      </div>

      <CreateLicense owners={students} />
    </div>
  )
}
