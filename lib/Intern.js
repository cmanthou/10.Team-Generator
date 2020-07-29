// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
var Employee = require("./Employee");
class Intern extends Employee {
    constructor(name, id, email, school){
    this.school = school 
    }
    getSchool(){
        return this.school
    }
    getRole(){
        return "INTERN"
    }
}
module.exports = Intern
