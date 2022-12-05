import Link from 'next/link'

interface StudentProps {
  id: number
  name: string
  email: string
  birthday: string
}

export default function StudentRow({name, email, birthday, id}: StudentProps) {
  return (
    <li className="bg-slate-300 mb-6 p-4 rounded-lg hover:bg-slate-400 active:bg-slate-500 focus:outline-none focus:ring focus:ring-slate-300">
      <Link className="flex" href={`/student/${id}`}>
        <span className="font-bold flex-auto">{name}</span>
        <span className="flex-auto">{email}</span>
        <span className="flex-1 text-right">Licencia 1234 - {birthday}</span>
      </Link>
    </li>
  )
}
