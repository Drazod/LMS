import { getInstructor } from '@/apis/OurCourse'
import { useEffect, useState } from 'react'

const InstructorSearch = ({ selectedInstructor , instructorSearchCallback }) => {
  const [instructors, setInstructors] = useState([])
  const [isToggel, setIsToggel] = useState(true) 
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCheckbox, setSelectedCheckbox] = useState(selectedInstructor)
  const [isSeeMore, setIsSeeMore] = useState(false)

  useEffect(() => {
    setSelectedCheckbox(selectedInstructor)
  }, [selectedInstructor])

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true)
      await getInstructor().then(res => {
        if(selectedInstructor) {
          const selectedInstructorElement = res.data.payload.filter(i => i.instructorId === parseInt(selectedCheckbox))
          const restInstructors = res.data.payload.filter(i => i.instructorId != parseInt(selectedCheckbox))
          setInstructors([...selectedInstructorElement, ...restInstructors])
        } else {
          setInstructors(res.data.payload)
        }

        if(res.data.payload.length > 5) {
          setIsSeeMore(true)
        }
      })

      setIsLoading(false)
    }

    getData()
  }, [])

  if(isLoading) {
    return <p>Loading...</p>
  }

  const handleCheckboxChange = (e) => {
    if(selectedCheckbox != e.target.value) {
      setSelectedCheckbox(e.target.value)
      instructorSearchCallback(e.target.value)
      const checkedInstructor = instructors.filter(i => i.instructorId === parseInt(e.target.value))
      const newOrderInstructor = instructors.filter(i => i.instructorId != parseInt(e.target.value))
      setInstructors([...checkedInstructor, ...newOrderInstructor])
      setIsToggel(true)
    } else {
      setSelectedCheckbox(null)
      instructorSearchCallback(null)
      setIsToggel(true)
    }
  }

  // useEffect(() => {
  //   console.log(selectedCheckbox)
  // }, [selectedCheckbox])

  return (
    <div className='w-full'>
      {instructors.slice(0, 5).map(i => <div key={i.instructorId} className='space-x-1'>
        <input type="checkbox" checked={selectedCheckbox === i.instructorId.toString()} name="category" id={`category-${i.instructorId}`} value={i.instructorId} onChange={handleCheckboxChange} />
        <label htmlFor={`instructor-${i.instructorId}`}>{i.name}</label>
      </div>)}
      { (isToggel && isSeeMore) ? <button className='ml-3 text-xs text-white bg-[#f7b204] p-1 rounded-xl hover:bg-[#4c1864]' onClick={() => setIsToggel(false)}>see more</button> :
        instructors.slice(5).map(i => <div key={i.instructorId} className='space-x-1'>
          <input type="checkbox" name="category" checked={selectedCheckbox === i.instructorId.toString()} id={`category-${i.instructorId}`} value={i.instructorId} onChange={handleCheckboxChange} />
          <label htmlFor={`instructor-${i.instructorId}`}>{i.name}</label>
        </div>)
      }
    </div>
  )
}

export default InstructorSearch