import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { supabase } from "./services/supabase";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");

  // Buscar todos
  const fetchTodos = async () => {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .order("inserted_at", { ascending: false });

    if (!error) setTodos(data);
  };

  // Adicionar novo TODO
  const addTodo = async () => {
    if (newTitle.trim() === "") return;

    const { error } = await supabase
      .from("todos")
      .insert([{ title: newTitle, is_complete: false }]);

    if (!error) {
      setNewTitle("");
      fetchTodos();
    }
  };

  // Alternar tarefa (completo/incompleto)
  const toggleTodo = async (id, current) => {
    await supabase.from("todos").update({ is_complete: !current }).eq("id", id);

    fetchTodos();
  };

  // Excluir tarefa
  const deleteTodo = async (id) => {
    await supabase.from("todos").delete().eq("id", id);

    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Minha Todo List</Text>
      <View style={styles.form}>
        <TextInput
          placeholder="Nova tarefa"
          value={newTitle}
          onChangeText={setNewTitle}
          style={styles.input}
        />
        <Button title="Adicionar" onPress={addTodo} />
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoContainer}>
            <TouchableOpacity
              onPress={() => toggleTodo(item.id, item.is_complete)}
              style={styles.todoTextContainer}
            >
              <Text style={[styles.todo, item.is_complete && styles.completed]}>
                {item.title}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTodo(item.id)}>
              <Text style={styles.delete}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
  form: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
  },
  todoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  todoTextContainer: {
    flex: 1,
  },
  todo: {
    fontSize: 18,
  },
  completed: {
    textDecorationLine: "line-through",
    color: "green",
  },
  delete: {
    fontSize: 18, 
  },
});
