import {
  Box,
  Card,
  CardActions,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { set, push, ref, onValue, remove, update } from "firebase/database";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";
import CheckIcon from "@mui/icons-material/Check";

const Homepage = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<any[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempId, setTempId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const todoRef = ref(db, `/todos/${auth.currentUser?.uid}`);

        onValue(todoRef, (snapshot) => {
          setTodos([]);
          const data = snapshot.val();
          if (data !== null) {
            console.log(data);
            Object.values(data).map((todo) => {
              setTodos((oldArray) => [...oldArray, todo]);
            });
          }
        });
      } else if (!user) {
        navigate("/");
      }
    });
  }, [navigate]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((err) => alert(err.message));
  };

  const addTodo = () => {
    const todoRef = push(ref(db, `/todos/${auth.currentUser?.uid}`));
    const id = todoRef.key;
    const item = {
      todo,
      id,
    };
    set(todoRef, item);
    setTodo("");
  };

  const handleUpdate = (todo: any) => {
    setIsEdit(true);
    setTodo(todo.todo);
    setTempId(todo.id);
  };

  const handleEditConfirm = () => {
    update(ref(db, `/todos/${auth.currentUser?.uid}/${tempId}`), {
      todo: todo,
    });

    setTodo("");
    setIsEdit(false);
  };

  const handleDelete = (id: string) => {
    const todoRef = ref(db, `/todos/${auth.currentUser?.uid}/${id}`);
    remove(todoRef);
  };
  return (
    <Container>
      <Container sx={{mb:2}}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", minWidth:"50%"}}>
            <TextField
              placeholder="Add item"
              value={todo}
              fullWidth
              onChange={(e) => setTodo(e.target.value)}
            ></TextField>
            {isEdit ? (
              <CheckIcon sx={{ fontSize: 50 }} onClick={handleEditConfirm} />
            ) : (
              <AddIcon sx={{ fontSize: 50 }} onClick={addTodo} />
            )}
          </Box>
          <LogoutIcon sx={{ fontSize: 50 }} onClick={handleSignOut} />
        </Box>
      </Container>
      <Container>
        {todos.map((todo, index) => {
          return (
            <Card key={todo.id}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography component="div" variant="h4">
                  {todo.todo}
                </Typography>
              </CardContent>
              <CardActions sx={{ display: "flex", alignItems: "center" }}>
                <EditIcon fontSize="large" onClick={() => handleUpdate(todo)} />
                <DeleteIcon
                  fontSize="large"
                  onClick={() => handleDelete(todo.id)}
                />
              </CardActions>
            </Card>
          );
        })}
      </Container>
    </Container>
  );
};

export default Homepage;
