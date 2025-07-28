import React, { useEffect, useState } from "react";

//create your first component
const Home = () => {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		createUser()
		getTodos()
	}, [])

	function createUser() {
		fetch("https://playground.4geeks.com/todo/users/yilfri", { method: "POST", headers: { "Content-Type": "application/json" } })
			.then(response => response.json())
	}

	function getTodos() {
		fetch("https://playground.4geeks.com/todo/users/yilfri")
			.then(response => response.json())
			.then(data => { setTodos(data.todos) })
	}

	function addTodo(e) {
		if (e.key == "Enter" && e.target.value !== '') {
			fetch("https://playground.4geeks.com/todo/todos/yilfri", {
				method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ label: e.target.value, is_done: false })
			})
				.then(responde => getTodos())
			e.target.value = ''
		}
	}

	function deleteTodo(taskToDelete) {
		fetch(`https://playground.4geeks.com/todo/todos/${taskToDelete}`, {
			method: "DELETE", headers: { "Content-Type": "application/json" }
		})
			.then(response => { getTodos() })
	}

	function deleteAllTodos() {
		setTodos([])
		fetch("https://playground.4geeks.com/todo/users/yilfri", { method: "DELETE" })
			.then(response => createUser())
	}

	return (
		<div className="text-center">
			<h1>TODOS</h1>
			<div className="container list-group">
				<input type="text" name="taskInput" placeholder="What needs to be done?" onKeyDown={(e) => addTodo(e)} className="list-group-item" />
				<ol style={{ listStyleType: "none", cursor: "default", padding: "0" }}>
					{todos.map((todo) => (
						<li key={todo.id} className="list-group-item d-flex justify-content-between hidden-x">{todo.label} <span onClick={() => deleteTodo(todo.id)}>X</span></li>
					))}
					<p className="list-group-item d-flex justify-content-start" style={{ fontSize: "10px", color: "gray" }}>{todos.length} item{todos.length > 1 ? "s" : ""} left</p>
				</ol>
				<button onClick={deleteAllTodos}>Delete tasks</button>
			</div>
		</div>
	);
};

export default Home;