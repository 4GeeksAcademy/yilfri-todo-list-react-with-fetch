import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	const [tasks, setTasks] = useState(["Make the bed", "Wash my hands", "Eat", "Walk the dog"])

	function addTask(e) {
		if (e.key == "Enter") {
			setTasks([...tasks, e.target.value])
			e.target.value = ''
		}
	}

	function deleteTask(taskToDelete) {
		setTasks(tasks.filter((_, index) => index !== taskToDelete));
	}

	return (
		<div className="text-center">
			<h1>TODOS</h1>
			<div className="container list-group">
				<input type="text" name="taskInput" placeholder="What needs to be done?" onKeyDown={(e) => addTask(e)} className="list-group-item" />
				<ol style={{ listStyleType: "none", cursor: "default", padding: "0" }}>
					{tasks.map((task, index) => (
						<li key={index} className="list-group-item d-flex justify-content-between hidden-x">{task} <span onClick={() => deleteTask(index)}>X</span></li>
					))}
					<p className="list-group-item d-flex justify-content-start" style={{ fontSize: "10px", color: "gray" }}>{tasks.length} item{tasks.length > 1 ? "s" : ""} left</p>
				</ol>
			</div>
		</div>
	);
};

export default Home;