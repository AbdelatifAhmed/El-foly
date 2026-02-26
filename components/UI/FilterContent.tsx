import { useGetBrands } from "@/hooks/useGetBrands";
import { useGetCategories } from "@/hooks/useGetCategories";
import { FilterSection } from "./FilterSection";
import { DualRangeSlider } from "./DualRangeSlider";

export const FilterContent = ({ filters, setFilters }: any) => {
  const { categories } = useGetCategories();
  const { brands } = useGetBrands();

  const handleCheckbox = (name: string) => {
    setFilters((prev: any) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="space-y-2 ">
      <FilterSection title="Categories">
        {categories?.map((cat: any) => (
          <div key={cat.id} className="form-control">
            <label className="label cursor-pointer justify-start gap-3 p-0 hover:bg-base-100 rounded-lg transition-all">
              <input
                type="checkbox"
                className={`checkbox   checkbox-sm rounded`}
                checked={filters.category_id === cat.id}
                onChange={() => setFilters({ ...filters, category_id: filters.category_id === cat.id ? "" : cat.id })}
              />
              <span className="label-text font-medium hover:font-bold">{cat.name}</span>
            </label>
          </div>
        ))}
      </FilterSection>

      <FilterSection title="Brands">
        {brands?.map((brand: any) => (
          <div key={brand.id} className="form-control">
            <label className="label cursor-pointer justify-start gap-3 p-0">
              <input
                type="checkbox"
                className="checkbox checkbox-primary checkbox-sm rounded"
                checked={filters.brand_id === brand.id}
                onChange={() => setFilters({ ...filters, brand_id: filters.brand_id === brand.id ? "" : brand.id })}
              />
              <span className="label-text font-medium">{brand.name}</span>
            </label>
          </div>
        ))}
      </FilterSection>

      <FilterSection title="Price Range">
        <DualRangeSlider min={0} max={100000} filters={filters} setFilters={setFilters} />
      </FilterSection>

      <div className="flex flex-col gap-4 pt-2">
        {[
          { label: "In Stock", key: "in_stock" },
          { label: "New Arrival", key: "is_new" },
          { label: "Has Discount", key: "has_discount" }
        ].map((item) => {
          const isChecked = Boolean(filters[item.key as keyof typeof filters]);

          return (
            <label key={item.key} className="flex items-center justify-between cursor-pointer group">
              <span className="text-sm font-medium text-base-content/70 group-hover:text-base-content">
                {item.label}
              </span>
              <input
                type="checkbox"
                className="accent-primary checkbox checkbox-sm rounded "
                checked={isChecked}
                onChange={() => {
                  setFilters((prev: any) => ({
                    ...prev,
                    [item.key]: !prev[item.key] 
                  }));
                }}
              />
            </label>
          );
        })}
      </div>
    </div>
  );
};