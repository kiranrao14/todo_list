#! /usr/bin/env node
import inquirer from "inquirer";
let todos = [];
let condition = true;
while (condition) {
    let ans = await inquirer.prompt([
        {
            name: "select",
            type: "list",
            message: "select an operation",
            choices: ["Add", "update", "view", "Delete", "Exit"],
        },
    ]);
    if (ans.select === "Add") {
        let addTodo = await inquirer.prompt([
            {
                name: "todo",
                type: "input",
                message: "Add itmes in the list",
                validate: function (input) {
                    if (input.trim() == "") {
                        return "please enter a non-empty item.";
                    }
                    return true;
                }
            },
        ]);
        if (addTodo.todo.trim() !== '') {
            todos.push(addTodo.todo);
            todos.forEach(todo => console.log(todo));
        }
    }
    if (ans.select === "update") {
        let updateTodo = await inquirer.prompt([
            {
                name: "todo",
                type: "list",
                message: "update items in the list",
                choices: todos.map((item) => item),
            },
        ]);
        let addTodo = await inquirer.prompt([
            {
                name: "todo",
                type: "input",
                message: "Add itmes in the list",
            },
        ]);
        let newTodo = todos.filter((val) => val !== updateTodo.todo);
        todos = [...newTodo, addTodo.todo];
        todos.forEach(todo => console.log(todo));
    }
    if (ans.select === "view") {
        console.log("****** TO-DO List*****");
        todos.forEach(todo => console.log(todo));
    }
    if (ans.select === "Delete") {
        let DeleteTodo = await inquirer.prompt([
            {
                name: "todo",
                type: "list",
                message: "select item to delete",
                choices: todos.map((item) => item),
            },
        ]);
        let newTodo = todos.filter((val) => val !== DeleteTodo.todo);
        todos = [...newTodo];
        console.log(todos);
    }
    if (ans.select === "Exit") {
        console.log("Exiting program..");
        condition = false;
    }
}
