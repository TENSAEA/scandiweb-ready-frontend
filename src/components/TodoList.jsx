import { motion, AnimatePresence } from "framer-motion";
import { useMutation, useQuery } from "@apollo/client";
// import { LOGOUT } from "../graphql/mutations/user.mutation";
import toast from "react-hot-toast";
import PropTypes from 'prop-types';
import {
  CREATE_TODO,
  DELETE_TODO,
  UPDATE_TODO,
} from "../graphql/mutations/todo.mutation";
import { GET_TODOS } from "../graphql/queries/todo.query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GET_AUTH_USER } from "../graphql/queries/user.query";
import { CheckCircleIcon,  PencilIcon, TrashIcon, PlusIcon, ArrowLeftCircleIcon } from "@heroicons/react/24/solid";

const TodoList = ({ userID }) => {
  const [title, setTitle] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);
  // Use the userID prop in the query
  const { data } = useQuery(GET_TODOS, {
    variables: { userID },
  });

  // const [logout, { loading,client }] = useMutation(LOGOUT);
  const [createTodo] = useMutation(
    CREATE_TODO,
    {
      refetchQueries: [{ query: GET_TODOS, variables: { userID } }],
    }
  );
  const [updateTodo] =
    useMutation(UPDATE_TODO, {
      refetchQueries: [{ query: GET_TODOS, variables: { userID } }],
    });
  const [deleteTodo] =
    useMutation(DELETE_TODO, {
      refetchQueries: [{ query: GET_TODOS, variables: { userID } }],
    });

    const { data: authUserData }= useQuery(GET_AUTH_USER, {
      refetchQueries: [{ query: GET_TODOS, variables: { userID } }],
    })

    // function Loader() {
    //   return (
    //     <RotatingLines
    //       strokeColor="grey"
    //       strokeWidth="5"
    //       animationDuration="0.75"
    //       width="96"
    //       visible={true}

    //     />
    //   )
    // }

  const handleCreateTodo = async () => {
    if (!title.trim()) {
      toast.error("Title cannot be empty!");
      return;
    }
    try {
      await createTodo({ variables: { title, userID } }); // Include userID when creating a todo
      setTitle("");
      toast.success("Todo created successfully!");
    } catch (errorCaught) {
      console.error("Create todo error:", errorCaught);
      toast.error("Failed to create todo. Please try again.");
    }
  };

  const handleEdit = (todo) => {
    setTitle(todo.title);
    setEditingTodoId(todo.id);
  };

  const handleSaveTodo = async (todoId) => {
    if (!editingTodoId || !title.trim()) {
      toast.error("Title cannot be empty!");
      return;
    }

    const todo = data?.todos.find((todo) => todo.id === todoId);
    const completed = todo.completed;

    try {
      await updateTodo({
        variables: {
          id: editingTodoId,
          title,
          completed,
        },
      });

      setTitle("");

      setEditingTodoId(null);
      toast.success("Todo updated successfully!");
    } catch (errorCaught) {
      console.error("Update todo error:", errorCaught);
      toast.error("Failed to update todo. Please try again.");
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      await deleteTodo({ variables: { id: todoId } });
      toast.success("Todo deleted successfully!");
    } catch (errorCaught) {
      console.error("Delete todo error:", errorCaught);
      toast.error("Failed to delete todo. Please try again.");
    }
  };

  const handleToggleTodo = async (todoId) => {
    try {
      const todo = data?.todos.find((todo) => todo.id === todoId);
      if (!todo) {
        toast.error("Todo not found!");
        return;
      }
      await updateTodo({
        variables: {
          id: todoId,
          title: todo.title,
          completed: !todo.completed,
        },
      });
      toast.success("Todo updated successfully!");
    } catch (errorCaught) {
      console.error("Update todo error:", errorCaught);
      toast.error("Failed to update todo. Please try again.");
    }
  };

  // const handleLogout = async () => {
  //   try {
  //      await logout();
  //     client.resetStore();
  //     toast.success("Logged out successfully!");
  //   } catch (errorCaught) {
  //     console.error("Logout error:", errorCaught);
  //     toast.error("Failed to logout. Please try again.");
  //   }
  // };

  const navigate = useNavigate();

  

  // if (todosError) return <p>Error: {todosError.message}</p>;
//   if (todosLoading) return (
//   <div className="flex justify-center items-center h-screen">
//     <Loader />
//   </div>
// );



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-sky-50 to-indigo-50 p-4 md:p-8">
      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto bg-white/30 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 overflow-hidden"
      >
        {/* Decorative Elements */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-blue-200/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-indigo-200/20 rounded-full blur-3xl" />

        {/* Header */}
        <motion.header
          className="p-6 bg-white/40 border-b border-white/30"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
        >
          <div className="flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 cursor-pointer"
              onClick={
                () => {
                  navigate("/");
                }
              }
            >
              <ArrowLeftCircleIcon onClick={()=>{navigate("/")}} className="w-8 h-8 text-blue-600" />
              <h1 onClick={()=>{navigate("/")}} className="text-2xl font-bold text-blue-900">Todo Graphql + MERN App</h1>
            </motion.div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-blue-700 font-medium">
                Welcome, {authUserData?.authUser?.username}
              </span>
              {/* <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                disabled={loading}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
              >
                {loading ? "Logging Out..." : "Logout"}
              </motion.button> */}
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <div className="p-6">
          {/* Input Section */}
          <motion.div
            className="flex gap-3 mb-8"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
          >
            <input
              type="text"
              placeholder="Add a new mission..."
              className="w-full px-6 py-3 bg-white/80 border-2 border-blue-100 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 placeholder-blue-600/80 transition-all"
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCreateTodo()}
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => editingTodoId ? handleSaveTodo(editingTodoId) : handleCreateTodo()}
              className="p-3 bg-gradient-to-r from-blue-500 to-indigo-400 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              {editingTodoId ? (
                <PencilIcon className="cursor-pointer w-6 h-6" />
              ) : (
                <PlusIcon className="cursor-pointer w-6 h-6" />
              )}
            </motion.button>
          </motion.div>

          {/* Todo List */}
          <AnimatePresence>
            <ul className="space-y-3">
              {data?.todos.map((todo) => (
                <motion.li
                  key={todo.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="group bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-blue-100 hover:border-blue-200 transition-all"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="relative cursor-pointer"
                        onClick={() => handleToggleTodo(todo.id)}
                      >
                        <div className={`w-6 h-6 rounded-lg border-2 ${
                          todo.completed 
                            ? 'border-green-500 bg-green-500/20' 
                            : 'border-blue-400'
                        }`}>
                          {todo.completed && (
                            <CheckCircleIcon className="w-5 h-5 text-green-600 absolute -top-1 -left-1" />
                          )}
                        </div>
                      </motion.div>
                      <span className={`text-lg ${
                        todo.completed 
                          ? 'text-gray-400 line-through' 
                          : 'text-blue-900'
                      }`}>
                        {todo.title}
                      </span>
                    </div>

                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEdit(todo)}
                        className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg"
                      >
                        <PencilIcon className="cursor-pointer w-5 h-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDeleteTodo(todo.id)}
                        className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg"
                      >
                        <TrashIcon className="cursor-pointer w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

TodoList.propTypes = {
  userID: PropTypes.string.isRequired,
};

export default TodoList;