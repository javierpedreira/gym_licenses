import CreateLicense, {StudentId} from './CreateLicense'
import LicenseComponent from './License'
import {License} from './page'

interface LicensesProps {
  licenses: License[]
  students: StudentId[]
}

export default function Licenses({licenses, students}: LicensesProps) {
  return (
    <div>
      <h1>Licenses</h1>
      <div>
        {licenses?.map((lic) => {
          return (
            <LicenseComponent key={lic.id} owner={lic.owner} identifier={lic.identifier} expedition={lic.expedition} />
          )
        })}
      </div>

      <CreateLicense owners={students} />
    </div>
  )
}
