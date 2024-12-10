'use client'
import { useParams } from 'next/navigation'
import React from 'react'

const CourseStudents = () => {
    const {coursesid} = useParams();
    console.log(coursesid);
    // const {data: getAllCoursesStudent} = useGetAllCou
  return (
    <div>CourseStudents</div>
  )
}

export default CourseStudents