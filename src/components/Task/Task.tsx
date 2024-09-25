import {
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import type { TaskType } from "../../types/Task";
import type { CategoryType } from "../../types/Category";
import { completeTask } from "../../api/task";

type TaskProps = {
  task: TaskType;
  categories: CategoryType[];
  onTaskComplete: (updatedTask: TaskType) => void;
};

const Task = (props: TaskProps) => {
  const { task, categories, onTaskComplete } = props;

  const handleTaskCompletion = async (task: TaskType) => {
    const updatedTask = await completeTask(task);
    onTaskComplete(updatedTask);
  };

  return (
    <Box
      sx={{
        backgroundColor: categories.find(
          (category) => task.category_id === category.id
        )?.color,
        p: 2,
        borderRadius: "10px",
        boxShadow:
          "0px 3px 3px -2px #00000033, 0px 3px 4px 0px #00000024, 0px 1px 8px 0px #0000001F",
      }}
    >
      <FormControlLabel
        label={
          <Stack>
            <Typography variant="body1" component="p">
              {task.title}
            </Typography>
            <Typography variant="body2" component="p">
              {task.description}
            </Typography>
            <Box>
              <Typography variant="subtitle1" component="span" sx={{ pr: 0.5 }}>
                Categoría:
              </Typography>
              <Typography variant="subtitle1" component="span">
                {
                  categories.find(
                    (category) => task.category_id === category.id
                  )?.name
                }
              </Typography>
            </Box>
          </Stack>
        }
        control={
          <Checkbox
            sx={{ pr: 2 }}
            checked={task.completed}
            onChange={() => handleTaskCompletion(task)}
          />
        }
      />
    </Box>
  );
};

export default Task;
