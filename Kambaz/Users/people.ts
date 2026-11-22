import UsersDao from "./dao";
import EnrollmentsDao from "../Enrollments/dao";

export default function PeopleRoutes(app, db) {
  const users = UsersDao(db);
  const enrollments = EnrollmentsDao(db);
  const canManage = (req) => {
    const role = req.session["currentUser"]?.role;
    return role === "FACULTY" || role === "ADMIN";
  };
  const list = (req, res) => {
    const { courseId } = req.params;
    const enrolled = db.users.filter((user) =>
      db.enrollments.some((item) => item.user === user._id && item.course === courseId),
    );
    res.json(enrolled.map(({ password, ...user }) => user));
  };
  const create = (req, res) => {
    if (!canManage(req)) {
      res.sendStatus(403);
      return;
    }
    const { password, ...user } = users.createUser(req.body);
    enrollments.enrollUserInCourse(user._id, req.params.courseId);
    res.json(user);
  };
  const update = (req, res) => {
    if (!canManage(req)) {
      res.sendStatus(403);
      return;
    }
    const { userId } = req.params;
    if (!users.findUserById(userId)) {
      res.sendStatus(404);
      return;
    }
    users.updateUser(userId, req.body);
    const { password, ...user } = users.findUserById(userId);
    res.json(user);
  };
  const remove = (req, res) => {
    if (!canManage(req)) {
      res.sendStatus(403);
      return;
    }
    const { userId } = req.params;
    db.users = db.users.filter((user) => user._id !== userId);
    db.enrollments = db.enrollments.filter((item) => item.user !== userId);
    res.sendStatus(200);
  };
  app.get("/api/courses/:courseId/people", list);
  app.post("/api/courses/:courseId/people", create);
  app.put("/api/courses/:courseId/people/:userId", update);
  app.delete("/api/courses/:courseId/people/:userId", remove);
}
