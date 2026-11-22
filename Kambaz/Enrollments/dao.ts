import { v4 as uuidv4 } from "uuid";

export default function EnrollmentsDao(db) {
  function enrollUserInCourse(userId, courseId) {
    const { enrollments } = db;
    if (!enrollments.some((item) => item.user === userId && item.course === courseId)) {
      enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
    }
  }

  function unenrollUserFromCourse(userId, courseId) {
    db.enrollments = db.enrollments.filter(
      (item) => item.user !== userId || item.course !== courseId,
    );
  }

  return { enrollUserInCourse, unenrollUserFromCourse };
}
