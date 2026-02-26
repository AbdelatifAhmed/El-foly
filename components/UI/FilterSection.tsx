export const FilterSection = ({ title, children }: any) => {
  return (
    <div className="collapse collapse-arrow border-b border-base-200 rounded-none">
      <input type="checkbox" defaultChecked /> 
      <div className="collapse-title text-sm font-black uppercase tracking-widest px-0">
        {title}
      </div>
      <div className="collapse-content px-0">
        <div className="flex flex-col gap-3 py-2">
          {children}
        </div>
      </div>
    </div>
  );
};