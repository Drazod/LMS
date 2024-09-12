import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Category = ({ category }) => {
  const [isToggel, setIsToggel] = useState(false)
  const [isMore, setIsMore] = useState(false)

  useEffect(() => {
    if(category.length > 5) {
      setIsMore(true)
    }else {
      setIsMore(false)
    }
  }, [category])

  return (
    <div className="w-full has-[a]:text-sm space-y-3">
      {category.slice(0, 5).map(c => <p key={c.categoryId} className="hover:text-[#f7b204]"><Link to={`search?category=${c.categoryId}`}>{c.categoryName}</Link></p>)}
      {isMore ? (isToggel ? <>{category.slice(5).map(c => <p key={c.categoryId} className="hover:text-[#f7b204]"><Link to={`search?category=${c.categoryId}`}>{c.categoryName}</Link></p>)}</>
      : <button className="ml-3 text-xs text-white bg-[#f7b204] p-1 rounded-xl hover:bg-[#4c1864]" onClick={() => setIsToggel(true)}>See more</button>): <></>}
    </div>
  )
}

export default Category
