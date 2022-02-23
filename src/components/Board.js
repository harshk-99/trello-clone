import { ReactSortable } from "react-sortablejs";
import { useState, useEffect } from "react";
import axios from "axios";

const Board = () => {
  const cms = "https://trello-cms.herokuapp.com/api/task";
  const [ideas, setIdeas] = useState([]);
  const [todo, setTodo] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [published, setPublished] = useState([]);

  const [newTask, setNewTask] = useState("");

  const addTask = async () => {
    const task = await axios.get(cms);
    const ideas = task.data.data.attributes.idea;

    await axios
      .put(cms, {
        data: { idea: [...ideas, newTask] },
      })
      .catch((err) => {
        console.log(err);
        alert("Error occured");
      });
    getTasks();
  };

  const getTasks = async () => {
    let tasks = await axios.get(cms);
    // For todos
    let todos = tasks.data.data.attributes.todo;
    setTodo(todos);
    // For ideas
    let ideas = tasks.data.data.attributes.idea;
    setIdeas(ideas);
    //For in progress
    let inProgress = tasks.data.data.attributes.progress;
    setInProgress(inProgress);
    //published
    let published = tasks.data.data.attributes.published;
    setPublished(published);
  };

  const updateTasks = async () => {
    const todosNew = todo.map((el) => String(el));
    const ideasNew = ideas.map((el) => String(el));
    const inProgressNew = inProgress.map((el) => String(el));
    const publishedNew = published.map((el) => String(el));

    await axios
      .put(cms, {
        data: {
          idea: [...ideasNew].flat(),
          todo: [...todosNew].flat(),
          progress: [inProgressNew].flat(),
          published: [publishedNew].flat(),
        },
      })
      .catch((err) => {
        console.log(err);
        alert("Error occured");
      });
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="container mt-5 mb-5">
      <div
        className="row"
        style={{
          height: "80vh",
        }}
      >
        <div className="col mx-2 px-2 py-3 bg-light border rounded">
          <h6>Idea</h6>
          <div
            style={{
              minHeight: "500px",
            }}
          >
            <ReactSortable
              list={ideas}
              setList={setIdeas}
              group={{ name: "group-1", pull: true, put: true }}
              onEnd={updateTasks}
            >
              {ideas.map((idea, index) => (
                <div className="card p-3 border rounded mt-2" key={index + 1}>
                  {idea}
                </div>
              ))}
            </ReactSortable>
          </div>
          <div>
            <textarea
              rows={"1"}
              cols={30}
              style={{ float: "left", borderBlockColor: "#007bff" }}
              value={newTask}
              onChange={(event) => setNewTask(event.target.value)}
            ></textarea>
            <button
              type="button"
              style={{ float: "right", marginTop: "2px" }}
              className="btn btn-primary btn-sm"
              onClick={addTask}
            >
              Add Task
            </button>
          </div>
        </div>
        <div className="col mx-2 px-2 py-3 bg-light border rounded">
          <h6>Todo</h6>

          <ReactSortable
            list={todo}
            setList={setTodo}
            group={{ name: "group-1", put: true, pull: true }}
            onEnd={updateTasks}
          >
            {todo.map((todo, index) => (
              <div className="card p-3 border rounded mt-2" key={index + 1}>
                {todo}
              </div>
            ))}
          </ReactSortable>
        </div>
        <div className="col mx-2 px-2 py-3 bg-light border rounded">
          <h6>In Progress</h6>
          <ReactSortable
            list={inProgress}
            setList={setInProgress}
            group={{ name: "group-1", put: true, pull: true }}
            onEnd={updateTasks}
          >
            {inProgress.map((inProgress, index) => (
              <div className="card p-3 border rounded mt-2" key={index + 1}>
                {inProgress}
              </div>
            ))}
          </ReactSortable>
        </div>
        <div className="col mx-2 px-2 py-3 bg-light border rounded">
          <h6>Published</h6>
          <ReactSortable
            list={published}
            setList={setPublished}
            group={{ name: "group-1", put: true, pull: true }}
            onEnd={updateTasks}
          >
            {published.map((published, index) => (
              <div className="card p-3 border rounded mt-2" key={index + 1}>
                {published}
              </div>
            ))}
          </ReactSortable>
        </div>
      </div>
    </div>
  );
};

export default Board;
