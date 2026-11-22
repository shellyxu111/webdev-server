import EnrollmentsDao from "./dao";

export default function EnrollmentRoutes(app, db) {
  const dao = EnrollmentsDao(db);
  const enrollIntoCourse = (req, res) => {
    const { uid, cid } = req.params;
    if (req.session["currentUser"]?._id !== uid) {
      res.sendStatus(403);
      return;
    }
    if (!db.courses.some((course) => course._id === cid)) {
      res.sendStatus(404);
      return;
    }
    dao.enrollUserInCourse(uid, cid);
    res.sendStatus(200);
  };
  const unenrollFromCourse = (req, res) => {
    const { uid, cid } = req.params;
    if (req.session["currentUser"]?._id !== uid) {
      res.sendStatus(403);
      return;
    }
    dao.unenrollUserFromCourse(uid, cid);
    res.sendStatus(200);
  };
  app.post("/api/users/:uid/courses/:cid", enrollIntoCourse);
  app.delete("/api/users/:uid/courses/:cid", unenrollFromCourse);
}
