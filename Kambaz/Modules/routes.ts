import ModulesDao from "./dao";
export default function ModuleRoutes(app, db) {
  const dao = ModulesDao(db);
  const findModulesForCourse = (req, res) => {
    const { courseId } = req.params;
    res.json(dao.findModulesForCourse(courseId));
  };
  app.get("/api/courses/:courseId/modules", findModulesForCourse);

  const createModuleForCourse = (req, res) => {
    const { courseId } = req.params;
    const courseModule = { ...req.body, course: courseId };
    const newModule = dao.createModule(courseModule);
    res.json(newModule);
  };
  app.post("/api/courses/:courseId/modules", createModuleForCourse);

  const deleteModule = (req, res) => {
    const { moduleId } = req.params;
    dao.deleteModule(moduleId);
    res.sendStatus(200);
  };
  app.delete("/api/modules/:moduleId", deleteModule);

  const updateModule = (req, res) => {
    const { moduleId } = req.params;
    const status = dao.updateModule(moduleId, req.body);
    res.json(status);
  };
  app.put("/api/modules/:moduleId", updateModule);
}
