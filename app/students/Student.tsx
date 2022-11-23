'use client'

interface StudentProps {
    id: string
    name: string
    email: string
    birthday: string
}

async function deleteStudent (id: string) {
  const res = await fetch(`http://127.0.0.1:8090/api/collections/students/records/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }      
  })

  return res
}

export default function Student({name, email, birthday, id}: StudentProps) {
  
  const callDelete = () => {
    deleteStudent(id)

  }
  
  return (
        <>
            <div>Name: {name}</div>
            <div>Email: {email}</div>
            <div>Birthday: {birthday}</div>
            <button onClick={callDelete} >Delete</button>
        </>
    )
}