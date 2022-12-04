'use client'

import {useEffect, useState} from 'react'
import {LicensesService} from '../dbOps/LicensesService'
import CreateLicense, {StudentId} from './CreateLicense'
import LicenseComponent from './License'
import {Auth, ThemeSupa} from '@supabase/auth-ui-react'
import {useSession, useSupabaseClient} from '@supabase/auth-helpers-react'
import {License} from './page'
import AuthLayer from '../components/AuthLayer'

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

  const session = useSession()
  const supabase = useSupabaseClient()
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
