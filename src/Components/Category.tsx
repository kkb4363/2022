import { useRecoilState } from 'recoil';
import { categories, categoryState } from '../atom';

function Category() {
  const [category, setcategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setcategory(event.currentTarget.value as any);
  };
  return (
    <>
      <select value={category} onInput={onInput}>
        <option value={categories.TODO}>TODO</option>
        <option value={categories.DOING}>DOING</option>
        <option value={categories.DONE}>DONE</option>
      </select>
    </>
  );
}

export default Category;
