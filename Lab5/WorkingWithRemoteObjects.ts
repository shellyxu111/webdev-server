const assignment = {
  id: 1,
  title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-10-10",
  completed: false,
  score: 0,
};
const courseModule = {
  id: "M101",
  name: "Introduction to Node.js",
  description: "Learn Express HTTP routes",
  course: "RS101",
};

export default function WorkingWithRemoteObjects(app) {
  const getAssignment = (req, res) => {
    res.json(assignment);
  };
  const getAssignmentTitle = (req, res) => {
    res.json(assignment.title);
  };
  app.get("/lab5/assignment/title", getAssignmentTitle);
  app.get("/lab5/assignment", getAssignment);
  const setAssignmentTitle = (req, res) => {
    const { newTitle } = req.params;
    assignment.title = newTitle;
    res.json(assignment);
  };
  app.get("/lab5/assignment/title/:newTitle", setAssignmentTitle);
  app.get("/lab5/assignment/score/:score", (req, res) => {
    assignment.score = parseInt(req.params.score);
    res.json(assignment);
  });
  app.get("/lab5/assignment/completed/:completed", (req, res) => {
    assignment.completed = req.params.completed === "true";
    res.json(assignment);
  });
  app.get("/lab5/module", (req, res) => {
    res.json(courseModule);
  });
  app.get("/lab5/module/name", (req, res) => {
    res.json(courseModule.name);
  });
  app.get("/lab5/module/name/:name", (req, res) => {
    courseModule.name = req.params.name;
    res.json(courseModule);
  });
  app.get("/lab5/module/description/:description", (req, res) => {
    courseModule.description = req.params.description;
    res.json(courseModule);
  });
}
