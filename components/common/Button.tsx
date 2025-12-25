
type ButtonProps = {
  Title: string;
}   
const Button = ({ Title } : ButtonProps) => {
  return (
    <button className=" py-3 px-4 lg:text-lg text-sm bg-[var(--primary-color)] border 
    hover:border-[var(--primary-color)] rounded-lg hover:bg-transparent 
    transition cursor-pointer text-white hover:text-[var(--primary-color)]">
          {Title}
    </button>
  )
}

export default Button