import { Button } from "@/components/ui/button";
import { courses } from "@/db/schema";
import { InfinityIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  activeCourse: typeof courses.$inferSelect;
  hearts: number;
  points: number;
  hasActiveSubcription: boolean;
};
export const UserProgress = ({
  activeCourse,
  hearts,
  points,
  hasActiveSubcription,
}: Props) => {
  return (
    <div className="flex items-center justify-between gap-x-2 w-full">
      <Link href="/courses">
        <Button>
          <Image
            src={activeCourse.imageSrc}
            alt={activeCourse.title}
            className="rounded-md border"
            width={32}
            height={32}
          />
        </Button>
      </Link>
      <Link href="/shop">
        <Button variant="ghost" className="text-orange-500">
          <Image
            src="/points.svg"
            alt="points"
            className="mr-2"
            width={28}
            height={28}
          /> {points}
        </Button> 
      </Link>
      <Link href="/heart">
        <Button variant="ghost" className="text-rose-500">
          <Image
            src="/heart.svg"
            alt="heart"
            className="mr-2"
            width={22}
            height={22}
          />
          {hasActiveSubcription ? <InfinityIcon  className="w-4 h-4 stroke-[3]"/> : hearts}
        </Button>
      </Link>
    </div>
  );
};
