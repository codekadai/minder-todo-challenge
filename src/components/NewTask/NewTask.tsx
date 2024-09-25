import { useState } from "react";
import {
  Button,
  MenuItem,
  TextField,
  Typography,
  Stack,
  Container,
} from "@mui/material";
import type { CategoryType } from "../../types/Category";
import type { TaskType } from "../../types/Task";
import { v4 as uuidv4 } from "uuid";

type NewTaskProps = {
  categories: CategoryType[];
  onSubmit: (newTask: TaskType) => void;
  onCancel: () => void;
};

const TaskForm = (props: NewTaskProps) => {
  const { categories, onSubmit, onCancel } = props;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newTask: TaskType = {
      id: uuidv4(),
      title,
      description,
      category_id: categoryId,
      completed: false,
    };

    onSubmit(newTask);

    setTitle("");
    setDescription("");
    setCategoryId("");
  };

  return (
    <Stack gap={4}>
      <Container component="form" onSubmit={handleSubmit}>
        <Typography variant="h3" component="h3" sx={{ mb: 2 }}>
          Nueva tarea
        </Typography>
        <Stack spacing={2} sx={{ px: 2 }}>
          <TextField
            label="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            variant="standard"
            fullWidth
          />

          <TextField
            label="Descripción"
            value={description}
            variant="standard"
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />

          <TextField
            label="Categoría"
            select
            variant="standard"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
            fullWidth
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </Container>
      <Stack direction="row" spacing={1} justifyContent="flex-end">
        <Button
          variant="outlined"
          color="secondary"
          onClick={onCancel}
          sx={{ textTransform: "uppercase", width: "128px" }}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ textTransform: "uppercase", width: "128px" }}
        >
          Crear
        </Button>
      </Stack>
    </Stack>
  );
};

export default TaskForm;
