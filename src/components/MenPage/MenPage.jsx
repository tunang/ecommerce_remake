import ProductsPage from "../Products/ProductsPage";
import { useState } from "react";

const categories = ["shirts", "shoes", "watches"];
const MenPage = () => {
  const [sortOption, setSortOption] = useState("none"); // Default sort option

  const handleSort = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div>
      <div className="flex items-center">
        <h2 className="">Men's clothing</h2>
        <div>
          <select onChange={handleSort} className="select select-bordered h-full w-full max-w-xs ml-8">
            <option value="none">
              No Sort
            </option>
            <option value="lowToHigh">
              Price: Low to High
            </option>
            <option value="highToLow">
              Price: High to Low
            </option>
          </select>
        </div>
      </div>

      <ProductsPage
        url={"/category/mens-"}
        categories={categories}
        sortOption={sortOption}
      />
    </div>
  );
};

export default MenPage;
