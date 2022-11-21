async function getStudents () {
    const res = await fetch('http://127.0.0.1:8090/api/collections/students/records?page=1&perPage30')
    const data = await res.json()

    return data?.items as any[]
}
export default async function StudentsPage() {
    const students = await getStudents()

    return (
        <div>
            <h1>Students</h1>
            <div>
                {students?.map((student) => {
                    return <Student key={student.id} name={student.name} email={student.email} birthday={student.birthday}/>
                })}
            </div>
        </div>
    )
}

interface StudentProps {
    name: string
    email: string
    birthday: string
}

function Student({name, email, birthday}: StudentProps) {
    return (
        <>
            <div>Name: {name}</div>
            <div>Email: {email}</div>
            <div>Birthday: {birthday}</div>
        </>
    )
}