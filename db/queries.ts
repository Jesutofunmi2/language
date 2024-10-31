import { cache } from "react";
import db from "@/db/drizzle";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import {
  lessons,
  courses,
  userProgress,
  units,
  challenges,
  challengeProgress,
} from "./schema";

export const getUserProgress = cache(async () => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const data = await db?.query?.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
    with: {
      activeCourse: true,
    },
  });

  return data;
});

export const getUnits = cache(async () => {
  const { userId } = await auth();
  const userProgress = await getUserProgress();

  if (!userId || !userProgress?.activeCourseId) {
    return [];
  }

  const data = await db.query.units.findMany({
    where: eq(units.courseId, userProgress.activeCourseId),
    with: {
      lessons: {
        with: {
          challenges: {
            with: {
              challengeProgress: {
                where: eq(challengeProgress.userId, userId),
              }
            },
          },
        },
      },
    },
  });

  const normalizeData = data.map((unit) => {
    const lessonsWithcompletedStatus = unit.lessons.map(
      (lesson: { challenges: any[] }) => {
        const allCompletedChallenges = lesson.challenges.every(
          (challenge: { challengeProgress: any }) => {
            return (
            challenge.challengeProgress &&
              challenge.challengeProgress.length > 0 &&
              challenge.challengeProgress.every(
                (progress: { completed: any }) => progress.completed
              ));
          });

        return { ...lesson, completed: allCompletedChallenges };
      });

    return { ...unit, lessons: lessonsWithcompletedStatus };
  });
  return normalizeData;
});

export const getCourses = cache(async () => {
  const data = await db?.query?.courses?.findMany();

  return data;
});

export const getCourseById = cache(async (courseId: number) => {
  const data = await db.query.courses.findFirst({
    where: eq(courses.id, courseId),
  });

  return data;
});
