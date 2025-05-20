interface Props {
  categories: string[];
  selectedCategories: string[];
  toggleCategory: (category: string) => void;
}

export const CategoryFilter: React.FC<Props> = ({ categories, selectedCategories, toggleCategory }) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      {categories.map((cat) => (
        <label key={cat} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={selectedCategories.includes(cat)}
            onChange={() => toggleCategory(cat)}
          />
          {cat}
        </label>
      ))}
    </div>
  );
};
