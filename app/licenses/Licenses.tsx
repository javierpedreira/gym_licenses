'use client'

import {useEffect, useState} from 'react'
import {LicenseQueryResponse, LicensesService} from '../dbOps/LicensesService'
import CreateLicense, {StudentId} from './CreateLicense'
import LicenseComponent from './License'
import AuthLayer from '../components/AuthLayer'

interface LicensesProps {
  licenses: LicenseQueryResponse[]
  students: StudentId[]
}

export default function Licenses({licenses, students}: LicensesProps) {
  const [lcs, setLicenses] = useState<LicenseQueryResponse[]>(licenses)

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
    <AuthLayer>
      <div>
        <h1>Licenses</h1>
        <div>
          {lcs?.map((lic) => {
            return (
              <LicenseComponent
                updateLicenses={updateLicenses}
                key={lic.id}
                id={lic.id}
                //TODO: This should be the name, not the ID 👇
                owner={lic.owner}
                identifier={lic.identifier}
                expedition={lic.expedition}
              />
            )
          })}
        </div>

        <CreateLicense owners={students} />
      </div>
    </AuthLayer>
  )
}
