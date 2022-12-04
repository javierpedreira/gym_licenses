interface StudentProps {
  id: number
  name: string
  email: string
  birthday: string
}

export default function StudentRow({name, email, birthday, id}: StudentProps) {
  return (
    <li>
      {name}, {email}, {birthday}
    </li>
  )
}
