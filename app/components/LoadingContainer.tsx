import Loading from "../Loading";

interface ContainerProps{
    children: React.ReactNode;
    isLoading?: boolean;
    full?:boolean;
}

const LoadingContainer:React.FC<ContainerProps> = ({
    children,
    isLoading,
    full
}) => {
  return (
    <>
      {isLoading && (
        <Loading/>
      )}
    <div className="md:h-auto">
      {children }
      </div>
      </>
  )
}

export default LoadingContainer