import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  Typography,
  Stack,
  Fab,
  Dialog,
  DialogContent,
  Container,
} from "@mui/material";
import { useEffect, useState } from "react";
import type { CategoryType } from "./types/Category";
import type { TaskType } from "./types/Task";
import Task from "./components/Task";
import { addTask, getTasks } from "./api/task";
import { getCategories } from "./api/category";
import { Add as AddIcon } from "@mui/icons-material";
import TaskForm from "./components/NewTask/NewTask";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196F3",
    },
    secondary: {
      main: "#2196F3",
    },
  },
  typography: {
    fontFamily: ["Roboto"].join(","),
    htmlFontSize: 16,
    h1: {
      fontSize: 48,
      fontWeight: 400,
    },
    h3: {
      fontSize: 20,
      fontWeight: 500,
    },
    body1: {
      fontSize: 16,
      fontWeight: 400,
    },
    body2: {
      fontSize: 14,
      fontWeight: 400,
    },
    subtitle1: {
      fontSize: 12,
      fontWeight: 300,
    },
  },
});

function App() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [openForm, setOpenForm] = useState(false);

  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => setOpenForm(false);

  const handleTaskCompletion = (updatedTask: TaskType) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
      )
    );
  };

  const handleTaskAddition = (newTask: TaskType) => {
    addTask(newTask).then(() => {
      setTasks((prevTasks) => [...prevTasks, newTask]);
    });
  };

  useEffect(() => {
    getTasks().then((tasks) => setTasks(tasks));
    getCategories().then((categories) => setCategories(categories));
  }, []);

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Container maxWidth={"md"} sx={{ py: 2 }}>
          <Stack gap={2}>
            <Typography variant="h1" component="h1" sx={{ pb: 2 }}>
              Lista de tareas
            </Typography>
            <Stack gap={6}>
              <Stack component="section" gap={1}>
                <Typography variant="h3" component="h3">
                  Pendientes
                </Typography>
                <Stack gap={2}>
                  {tasks
                    .filter((task) => !task.completed)
                    .map((task, index) => (
                      <Task
                        key={index}
                        task={task}
                        categories={categories}
                        onTaskComplete={handleTaskCompletion}
                      />
                    ))}
                </Stack>
              </Stack>
              <Stack component="section" gap={1}>
                <Typography variant="h3" component="h3">
                  Terminadas
                </Typography>
                <Stack gap={2}>
                  {tasks
                    .filter((task) => task.completed)
                    .map((task, index) => (
                      <Task
                        key={index}
                        task={task}
                        categories={categories}
                        onTaskComplete={handleTaskCompletion}
                      />
                    ))}
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <Fab
            color="primary"
            aria-label="add"
            onClick={handleOpenForm}
            sx={{
              position: "fixed",
              bottom: 16,
              right: 16,
            }}
          >
            <AddIcon />
          </Fab>

          <Dialog
            open={openForm}
            onClose={handleCloseForm}
            fullWidth
            maxWidth={"xs"}
          >
            <DialogContent sx={{ px: 0, py: 3, pb: 0.5, pr: 0.5 }}>
              <TaskForm
                categories={categories}
                onSubmit={handleTaskAddition}
                onCancel={handleCloseForm}
              />
            </DialogContent>
          </Dialog>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
