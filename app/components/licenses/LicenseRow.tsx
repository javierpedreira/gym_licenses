import classNames from 'classnames'
import {LicensesService} from '../../dbOps/LicensesService'

export interface LicenseProps {
  id: string
  expedition: string
  expiration: string
  identifier: number
  isActive: boolean
  updateLicenses: () => void
}

export default function LicenseRow({id, expedition, expiration, identifier, isActive, updateLicenses}: LicenseProps) {
  const callDelete = () => {
    LicensesService.delete(id)
      .then(() => {
        updateLicenses()
      })
      .catch((error) => {
        console.log(`Something went wrong, ${error}`)
      })
  }

  return (
    <li className={classNames('flex bg-slate-200 mb-6 p-4 rounded-lg', {'bg-sky-200': isActive})}>
      <div className="flex-auto">ID: {identifier}</div>
      <div className="flex-auto align-middle">Expedition date: {expedition}</div>
      <div className="flex-auto align-middle">Expiration date: {expiration}</div>
      <div className="flex-auto">
        <button className="font-bold rounded-lg  hover:text-slate-400 active:bg-slate-500" onClick={callDelete}>
          Delete
        </button>
      </div>
    </li>
  )
}
