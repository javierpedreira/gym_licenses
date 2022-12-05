// TODO: Rename as Students

import {Session} from '@supabase/supabase-js'
import {useEffect, useState} from 'react'
import {StudentQueryResponse, StudentsService} from '../../dbOps/StudentsService'
import Students from './Students'

export default function StudentSummary({session}: {session: Session}) {
  const [students, setStudents] = useState<StudentQueryResponse[]>([])

  useEffect(() => {
    getProfile()
  }, [session])

  async function getProfile() {
    try {
      const data = await StudentsService.fetchAll()

      setStudents(data)
    } catch (error) {
      alert('Error loading user data!')
      console.log(error)
    }
  }

  return <Students students={students} />
}
