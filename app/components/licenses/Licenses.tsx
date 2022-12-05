'use client'

import {useEffect, useState} from 'react'
import {LicenseQueryResponse, LicensesService} from '../../dbOps/LicensesService'
import LicenseComponent from './License'

interface LicensesProps {
  licenses: LicenseQueryResponse[]
  owner: string
}

export default function Licenses({licenses, owner}: LicensesProps) {
  const [lcs, setLicenses] = useState<LicenseQueryResponse[]>(licenses)

  useEffect(() => {
    ;(async () => {
      updateLicenses()
    })()
  }, [])

  const updateLicenses = async () => {
    const newLicenses = await LicensesService.fetchByOwner(owner)

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
              identifier={lic.identifier}
              expedition={lic.expedition}
            />
          )
        })}
      </div>
    </div>
  )
}
