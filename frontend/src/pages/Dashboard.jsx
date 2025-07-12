import { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import Loader from "../components/Loader";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [error, setError] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [viewingTask, setViewingTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const formRef = useRef(null);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const res = await getTasks();
      setTasks(res.data);
      setFilteredTasks(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    filterTasks();
  }, [searchTitle, filterDate, tasks]);

  const filterTasks = () => {
    let filtered = [...tasks];
    if (searchTitle.trim()) {
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(searchTitle.toLowerCase())
      );
    }
    if (filterDate) {
      filtered = filtered.filter(
        (task) => task.dueDate && task.dueDate.slice(0, 10) === filterDate
      );
    }
    setFilteredTasks(filtered);
  };

  const handleCreate = async (taskData) => {
    setLoading(true);
    try {
      await createTask(taskData);
      setError("");
      await loadTasks();
    } catch (err) {
      console.error(err);
      setError("Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (taskData) => {
    setLoading(true);
    try {
      await updateTask(editingTask._id, taskData);
      setEditingTask(null);
      setError("");
      await loadTasks();
    } catch (err) {
      console.error(err);
      setError("Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteTask(id);
      setError("");
      await loadTasks();
    } catch (err) {
      console.error(err);
      setError("Failed to delete task");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setError("");
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleView = (task) => {
    setViewingTask(task);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-indigo-100">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 pt-24 pb-8">
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center shadow">
            {error}
          </div>
        )}

        <div ref={formRef}>
          <TaskForm
            key={editingTask ? editingTask._id : "new"}
            initialData={editingTask || {}}
            submitLabel={editingTask ? "Update" : "Add"}
            onSubmit={editingTask ? handleUpdate : handleCreate}
          />
        </div>

        {editingTask && (
          <div className="text-center mb-6">
            <button
              onClick={handleCancelEdit}
              className="text-gray-700 underline hover:text-indigo-600 transition-colors"
            >
              Cancel Edit
            </button>
          </div>
        )}

        <div className="bg-white p-4 rounded-xl shadow mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full md:w-1/2 focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full md:w-1/3 focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div
          className={`bg-white p-6 rounded-xl shadow transition-opacity duration-500 ${
            loading ? "opacity-50 pointer-events-none" : "opacity-100"
          }`}
        >
          <h2 className="text-2xl font-bold mb-4 text-indigo-700">Your Tasks</h2>

          {loading ? (
            <Loader />
          ) : (
            <TaskList
              tasks={filteredTasks}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onView={handleView}
            />
          )}
        </div>
      </div>

      {viewingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md relative shadow-xl animate-fadeIn">
            <button
              onClick={() => setViewingTask(null)}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-2xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-indigo-700">Task Details</h2>
            <p className="mb-2"><strong>Title:</strong> {viewingTask.title}</p>
            <p className="mb-2"><strong>Description:</strong> {viewingTask.description || "No description"}</p>
            <p className="mb-2"><strong>Status:</strong> {viewingTask.status}</p>
            <p className="mb-2"><strong>Due Date:</strong> {viewingTask.dueDate ? viewingTask.dueDate.slice(0, 10) : "Not set"}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
