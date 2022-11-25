'use client'

export interface Student {
  id: string
  name: string
  email: string
  birthday: string
}

interface StudentProps extends Student {
    updateStudents: () => void
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

export default function StudentCompoent({name, email, birthday, id, updateStudents}: StudentProps) {
  
  const callDelete = () => {
    deleteStudent(id)
    .then (() => {
      updateStudents()
      })
    .catch((error) => {
      console.log(`Something went wrong, ${error}`)
    })
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