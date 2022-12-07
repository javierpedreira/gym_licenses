import classNames from 'classnames'
import Link from 'next/link'

interface StudentProps {
  id: number
  name: string
  email: string
  birthday: string
  licenseSummaryId?: number
  licenseSummaryExpiration?: string
  daysToExpire?: number
}

export default function StudentRow({
  name,
  email,
  birthday,
  id,
  licenseSummaryExpiration,
  licenseSummaryId,
  daysToExpire
}: StudentProps) {
  const isAboutToExpire = () => {
    if (!daysToExpire && daysToExpire != 0) return false
    if (daysToExpire >= 0 && daysToExpire <= 30) return true
    else return false
  }

  const isExpired = () => {
    return !!daysToExpire && daysToExpire < 0
  }

  return (
    <li
      className={classNames(
        'bg-slate-300 hover:bg-slate-400 active:bg-slate-500 focus:ring-slate-300 mb-6 p-4 rounded-lg  focus:outline-none focus:ring',
        {'bg-orange-300': isAboutToExpire()}
      )}>
      <Link className="flex" href={`/student/${id}`}>
        <span className="font-bold flex-auto">{name}</span>
        <span className="flex-auto">{email}</span>
        {isExpired() && <span className="flex-1 text-right">Licencia caducada</span>}
        {isAboutToExpire() && (
          <i className="fa-solid fa-triangle-exclamation" title={`Esta licencia caducará en ${daysToExpire}`}></i>
        )}
        {!!licenseSummaryExpiration && licenseSummaryId && !isExpired() && (
          <span className="flex-1 text-right">
            Licencia {licenseSummaryId} - {licenseSummaryExpiration}
          </span>
        )}
      </Link>
    </li>
  )
}
