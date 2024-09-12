import { getCategory } from '@/apis/OurCourse'
import { useEffect, useState } from 'react'

const CategorySearch = ({ selectedCategory , categorySearchCallback }) => {
  const [categories, setCategories] = useState([])
  const [isToggel, setIsToggel] = useState(true) 
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCheckbox, setSelectedCheckbox] = useState(selectedCategory)
  const [isSeeMore, setIsSeeMore] = useState(false)
  
  useEffect(() => {
    setSelectedCheckbox(selectedCategory)
  }, [selectedCategory])
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true)
      await getCategory().then(res => {
        if(selectedCategory) {
          const selectedCategoryElement = res.data.payload.filter(c => c.categoryId === parseInt(selectedCheckbox))
          const restCategories = res.data.payload.filter(c => c.categoryId != parseInt(selectedCategory))
          setCategories([...selectedCategoryElement, ...restCategories])
        } else {
          setCategories(res.data.payload)
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
      categorySearchCallback(e.target.value)
      const checkedCategory = categories.filter(c => c.categoryId === parseInt(e.target.value))
      const newOrderCategory = categories.filter(c => c.categoryId != parseInt(e.target.value))
      setCategories([...checkedCategory, ...newOrderCategory])
      setIsToggel(true)
    } else {
      setSelectedCheckbox(null)
      categorySearchCallback(null)
      console.log('false false false')
      setIsToggel(true)
    }
  }

  // useEffect(() => {
  //   console.log(selectedCheckbox)
  // }, [selectedCheckbox])

  return (
    <div className='w-full'>
      {categories.slice(0, 5).map(c => <div key={c.categoryId} className='space-x-1'>
        <input type="checkbox" checked={selectedCheckbox === c.categoryId.toString()} name="category" id={`category-${c.categoryId}`} value={c.categoryId} onChange={handleCheckboxChange} />
        <label htmlFor={`category-${c.categoryId}`}>{c.categoryName}</label>
      </div>)}
      { (isToggel && isSeeMore) ? <button className='ml-3 text-xs text-white bg-[#f7b204] p-1 rounded-xl hover:bg-[#4c1864]' onClick={() => setIsToggel(false)}>see more</button> :
        categories.slice(5).map(c => <div key={c.categoryId} className='space-x-1'>
          <input type="checkbox" name="category" checked={selectedCheckbox === c.categoryId.toString()} id={`category-${c.categoryId}`} value={c.categoryId} onChange={handleCheckboxChange} />
          <label htmlFor={`category-${c.categoryId}`}>{c.categoryName}</label>
        </div>)
      }
    </div>
  )
}

export default CategorySearch
