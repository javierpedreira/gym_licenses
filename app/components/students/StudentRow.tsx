import Link from 'next/link'

interface StudentProps {
  id: number
  name: string
  email: string
  birthday: string
  licenseSummaryId?: number
  licenseSummaryExpiration?: string
}

export default function StudentRow({
  name,
  email,
  birthday,
  id,
  licenseSummaryExpiration,
  licenseSummaryId
}: StudentProps) {
  return (
    <li className="bg-slate-300 mb-6 p-4 rounded-lg hover:bg-slate-400 active:bg-slate-500 focus:outline-none focus:ring focus:ring-slate-300">
      <Link className="flex" href={`/student/${id}`}>
        <span className="font-bold flex-auto">{name}</span>
        <span className="flex-auto">{email}</span>
        {!!licenseSummaryExpiration && licenseSummaryId && (
          <span className="flex-1 text-right">
            Licencia {licenseSummaryId} - {licenseSummaryExpiration}
          </span>
        )}
      </Link>
    </li>
  )
}
