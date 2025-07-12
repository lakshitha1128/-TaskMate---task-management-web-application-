const TaskList = ({ tasks, onDelete, onEdit, onView }) => {
  if (!tasks.length)
    return (
      <p className="text-center text-gray-500 mt-4 animate-fadeIn">
        No tasks found.
      </p>
    );

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-200 text-yellow-800";
      case "in-progress":
        return "bg-blue-200 text-blue-800";
      case "completed":
        return "bg-green-200 text-green-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <ul>
      {tasks.map((task) => (
        <li
          key={task._id}
          className="border-b py-4 px-4 flex justify-between items-center rounded hover:bg-indigo-50 transition-colors cursor-pointer animate-fadeIn"
        >
          <div>
            <p className="font-semibold text-indigo-700">{task.title}</p>
            <p className="text-sm text-gray-600">
              Due: {task.dueDate ? task.dueDate.slice(0, 10) : "No due date"}
            </p>
            <p className="text-sm text-gray-700 mt-1">{task.description}</p>

            <span
              className={`inline-block mt-2 px-2 py-1 rounded text-xs font-semibold ${getStatusColor(
                task.status
              )}`}
            >
              {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
            </span>
          </div>
          <div className="space-x-4 flex-shrink-0">
            <button
              onClick={() => onView(task)}
              className="text-blue-600 hover:text-blue-800 hover:scale-110 transition-transform duration-150"
            >
              View
            </button>
            <button
              onClick={() => onEdit(task)}
              className="text-green-600 hover:text-green-800 hover:scale-110 transition-transform duration-150"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task._id)}
              className="text-red-600 hover:text-red-800 hover:scale-110 transition-transform duration-150"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
