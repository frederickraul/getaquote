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
    <div>
      {children }
      </div>
      </>
  )
}

export default LoadingContainer