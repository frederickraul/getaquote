'use client';

import { useRouter } from "next/navigation";
import Heading from "./Heading";
import Button from "./Button";

interface EmptySpaceProps{
  title?: string;
  subtitle?: string;
  showReset?: boolean;
  small?:boolean;
}
const EmptySpace: React.FC<EmptySpaceProps> = ({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters",
  showReset,
  small
}) => {
  const router = useRouter();
  return (
    <div className={`${small ? 'h-[20vh]':'h-[60vh]' } flex flex-col gap-2 justify-center  items-center`}>
      <Heading
        center
        title={title}
        subtitle={subtitle}
      />
      <div className="w-48 bt-4">
        {showReset && (
          <Button
            outline
            label="Remove all filters"
            onClick={()=> router.push('/')}
          />
        )}
      </div>
    </div>
  )
}

export default EmptySpace