"use client";

import { challenges } from "@/db/schema";
import { challengeOptions } from "../../db/schema";

type Props = {
  initialLessonId: number;
  initialLessonChallenge: (typeof challenges.$inferSelect & {
    completed: boolean;
    challengeOptions: (typeof challengeOptions.$inferSelect)[];
  })[];
  initialHearts: number;
  initialPercentage: number;
  userSubcription: any;
};

import React, { useState } from "react";
import { Header } from "./header";

export const Quiz = ({
  initialLessonId,
  initialHearts,
  initialPercentage,
  initialLessonChallenge,
  userSubcription,
}: Props) => {
  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(initialPercentage);
  const [challenges] = useState(initialLessonChallenge);
  const [activeIndex, setActiveIndex] = useState(() => {
    const unCompletedIndex = challenges.findIndex(
      (challenge) => !challenge.completed
    );

    return unCompletedIndex === -1 ? 0 : unCompletedIndex;
  });

  const challenge = challenges[activeIndex];

  const title =
    challenge.type === "ASSIST"
      ? "Select the correct meaning"
      : challenge.question;
  return (
    <>
      <Header
        hearts={hearts}
        percentage={percentage}
        hasctiveSubscription={!!userSubcription?.isActive}
      />
      <div className="flex-1">
        <div className="h-full flex items-center justify-center">
          <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
            <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
              {title}
            </h1>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
};
