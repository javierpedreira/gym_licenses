'use client'

import {useEffect, useState} from 'react'
import {LicensesService} from '../utils/LicensesService'
import CreateLicense, {StudentId} from './CreateLicense'
import LicenseComponent from './License'
import {License} from './page'

interface LicensesProps {
  licenses: License[]
  students: StudentId[]
}

export default function Licenses({licenses, students}: LicensesProps) {
  const [lcs, setLicenses] = useState<License[]>(licenses)

  useEffect(() => {
    ;(async () => {
      updateLicenses()
    })()
  }, [])

  const updateLicenses = async () => {
    const newLicenses = await LicensesService.fetchAll()

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
