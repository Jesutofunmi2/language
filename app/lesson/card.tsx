import { challengeOptions, challenges } from "@/db/schema";
import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
  key: number;
  id: number;
  text: string;
  shortcut: string;
  imageSrc: (typeof challengeOptions.$inferSelect)["imageSrc"];
  selected?: boolean;
  onClick: () => void;
  status?: "correct" | "wrong" | "none";
  audioSrc: (typeof challengeOptions.$inferSelect)["audioSrc"];
  disabled: boolean;
  type: (typeof challenges.$inferSelect)["type"];
};

export const Card = ({
  id,
  text,
  shortcut,
  imageSrc,
  selected,
  onClick,
  status,
  audioSrc,
  disabled,
  type,
}: Props) => {
  return (
    <div
      onClick={() => {}}
      className={cn(
        "h-full border-2 rounded-xl border-b-4 hover:bg-black/5 p-4 lg:p-6 cursor-pointer active:border-b-2",
        selected && "border-sky-300 bg-sky-100 hover:bg-sky-500",
        selected &&
          status === "correct" &&
          "border-green-300 bg-green-100 hover:bg-green-100",
        selected &&
          status === "wrong" &&
          "border-rose-300 bg-rose-100 hover:bg-rose-100",
        disabled && "pointer-events-none hover:bg-white",
        type === "ASSIST" && "lg:p-3 w-full"
      )}
    >
      {imageSrc && (
        <div className="relative aspect-square mb-4 max-h-[80px] lg:max-h-[150px] w-full">
          <Image src={imageSrc} fill alt={text} /> 
        </div>
      )}
    </div>
  );
};
