#! /user/bin/env node
import inquirer from "inquirer";
class Student {
    name;
    constructor(name) {
        this.name = name;
    }
}
class Person {
    students = [];
    addStudent(obj) {
        this.students.push(obj);
        console.log(`New student added: ${obj.name}`);
        console.log("Current student list:", this.students.map(s => s.name).join(", "));
    }
}
const persons = new Person();
const programStart = async () => {
    let exitProgram = false;
    while (!exitProgram) {
        console.log("Welcome!");
        const ans = await inquirer.prompt({
            name: "select",
            type: "list",
            message: "Whom would you like to interact with?",
            choices: ["staff", "student", "exit"]
        });
        if (ans.select === "staff") {
            console.log("You approach the staff room. Feel free to ask any questions:");
        }
        else if (ans.select === "student") {
            const studentAns = await inquirer.prompt({
                name: "student",
                type: "input",
                message: "Enter the student's name you wish to engage with",
            });
            const student = persons.students.find(val => val.name === studentAns.student);
            if (!student) {
                const newStudent = new Student(studentAns.student);
                persons.addStudent(newStudent);
                console.log(`Hello, I am ${newStudent.name}. Nice to meet you!`);
            }
            else {
                console.log(`Hello, I am ${student.name}. Nice to see you again!`);
            }
        }
        else if (ans.select === "exit") {
            console.log("Exiting the program...");
            exitProgram = true;
        }
    }
};
programStart();
