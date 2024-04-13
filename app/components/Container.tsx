import Loading from "../Loading";

interface ContainerProps{
    children: React.ReactNode;
    isLoading?: boolean;
    full?:boolean;
}

const Container:React.FC<ContainerProps> = ({
    children,
    isLoading,
    full
}) => {
  return (
    <>
      {isLoading && (
        <Loading/>
      )}
    <div 
      className={`
        ${full ? 'w-full': 'max-w-[1200px] 2xl:max-w-[1200px]'}
        mx-auto

      `}>
      {children }
      </div>
      </>
  )
}

export default Container