import type { TaskType } from "../types/Task";
import { API_URL } from "./config";

export const getTasks = async () => {
  const response = await fetch(`${API_URL}/tasks`);
  const data = response.json();
  return data;
};

export const completeTask = async (task: TaskType) => {
  const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...task, completed: !task.completed }),
  });
  const data = response.json();
  return data;
};

export const addTask = async (task: TaskType) => {
  const response = await fetch(`http://localhost:3000/tasks/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  const data = response.json();
  return data;
};
