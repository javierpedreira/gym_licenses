'use client'

import {useEffect, useState} from 'react'
import {LicenseQueryResponse, LicensesService} from '../../dbOps/LicensesService'
import CreateLicense from './CreateLicense'
import LicenseRow from './LicenseRow'

interface LicensesProps {
  licenses: LicenseQueryResponse[]
  owner: string
}

export default function Licenses({licenses, owner}: LicensesProps) {
  const [lcs, setLicenses] = useState<LicenseQueryResponse[]>(licenses)
  const [showCreateLicences, setShowCreateLicenses] = useState(false)

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

  const clicked = () => {
    setShowCreateLicenses(!showCreateLicences)
  }

  const CreateButton = (className: string) => {
    return <button className={className} onClick={clicked} />
  }

  return (
    <div>
      <div className="flex">
        <h1 className="text-xl font-bold py-6">Licencias</h1>
        {CreateButton('fa-solid fa-plus ml-4')}
      </div>
      {showCreateLicences && <CreateLicense owner={owner} />}
      {!lcs?.length && !showCreateLicences ? (
        <h1 className="text-center">
          Este alumno no tiene licencias. Clica en{' '}
          {CreateButton('fa-solid fa-plus p-1 px-2 bg-slate-300 font-bold rounded-lg hover:bg-slate-200')} para agregar
          una nueva licencia
        </h1>
      ) : (
        <ul>
          {lcs?.map((lic) => {
            return (
              <LicenseRow
                updateLicenses={updateLicenses}
                key={lic.id}
                id={lic.id}
                expedition={lic.expedition}
                expiration={lic.expiration}
                identifier={lic.identifier}
                isActive={isLicenseActive(lic.expiration)}
              />
            )
          })}
        </ul>
      )}
    </div>
  )
}
