'use client'

import {useEffect, useState} from 'react'
import {LicenseQueryResponse, LicensesService} from '../../dbOps/LicensesService'
import LicenseRow from './LicenseRow'

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

  const isLicenseActive = (expiration: string): boolean => {
    const now = new Date()
    const exp = new Date(expiration)

    return exp >= now
  }

  return (
    <div>
      <h1 className="text-xl font-bold py-6">Licenses</h1>
      <ul>
        {lcs?.map((lic) => {
          return (
            <LicenseRow
              updateLicenses={updateLicenses}
              key={lic.id}
              {...lic}
              isActive={isLicenseActive(lic.expiration)}
            />
          )
        })}
      </ul>
    </div>
  )
}
