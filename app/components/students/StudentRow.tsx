import Link from 'next/link'

interface StudentProps {
  id: number
  name: string
  email: string
  birthday: string
}

export default function StudentRow({name, email, birthday, id}: StudentProps) {
  return (
    <li>
      <Link href={`/student/${id}`}>{name}</Link>,{email}, {birthday}
    </li>
  )
}
