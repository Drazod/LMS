import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { CheckIcon } from "@phosphor-icons/react/dist/ssr";

interface CategoryProps {
  categoryId: number;
  categoryName: string;
}

interface BadgeToggleProps {
  category: CategoryProps;
  isToggled: boolean;
  onToggle: (categoryId: number) => void;
}

const BadgeToggle = ({ category, isToggled, onToggle }: BadgeToggleProps) => {
  const variant = isToggled ? "default" : "outline";
  const icon = isToggled ? <CheckIcon weight="bold" size={16} className="mr-1" /> : null;
  const text = category.categoryName;

  return (
    <Link to={`/search?category=${category.categoryId}`}>
      <Badge
        variant={variant}
        className="cursor-pointer flex items-center gap-1 hover:scale-105 transform transition-transform"
        onClick={(e) => {
          e.preventDefault();
          onToggle(category.categoryId);
        }}
      >
        {icon}
        {text}
      </Badge>
    </Link>
  );
};

const Category = ({ category }: { category: CategoryProps[] }) => {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [isMore, setIsMore] = useState(false);
  const [isToggled, setIsToggled] = useState(false);

  useEffect(() => {
    if (category.length > 5) {
      setIsMore(true);
    } else {
      setIsMore(false);
    }
  }, [category]);

  const handleToggle = (categoryId: number) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(categoryId)) {
        return prevSelected.filter((id) => id !== categoryId);
      } else {
        return [...prevSelected, categoryId];
      }
    });
  };

  return (
    <div className="w-full has-[a]:text-sm space-y-3">
      <div className="flex flex-wrap gap-2">
        {category.slice(0, 5).map((c) => (
          <BadgeToggle
            key={c.categoryId}
            category={c}
            isToggled={selectedCategories.includes(c.categoryId)}
            onToggle={handleToggle}
          />
        ))}
        {isMore && (
          isToggled ? (
            <>
              {category.slice(5).map((c) => (
                <BadgeToggle
                  key={c.categoryId}
                  category={c}
                  isToggled={selectedCategories.includes(c.categoryId)}
                  onToggle={handleToggle}
                />
              ))}
            </>
          ) : (
            <Button
              className="ml-3 text-xs text-white bg-blue-500 p-1 rounded-xl hover:bg-blue-600"
              onClick={() => setIsToggled(true)}
            >
              See more
            </Button>
          )
        )}
      </div>
    </div>
  );
};

export default Category;
