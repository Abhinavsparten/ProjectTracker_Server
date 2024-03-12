const { version } = require("mongoose")
const TeamSchema = require("../models/Teams")

exports.addEmployee=async(req,res)=>{
    const {name, role, slack, employeeCode}=req.body

    try{
            const newUser = new TeamSchema.employees({
                name, role,employeeCode,slack
            })
            
            await newUser.save()
          
            res.status(200).send({message:"Employee Added"})

    }
    catch (error) {
        res.status(401).json(error)

    }

}

exports.getEmployees = async(req,res)=>{

    try{
        const employees = await TeamSchema.employees.find().sort({createdAt:1})
        res.status(200).json(employees)

    }catch(error){
        res.status(500).json({message:"Server Error"});

    }
}

exports.getSingleEmp = async(req,res)=>{
  const {category} =req.params

  try{
      const employees = await TeamSchema.employees.findOne({ name:category })
      res.status(200).json(employees)

  }catch(error){
      res.status(500).json({message:"Server Error"});

  }
}

exports.updateEmployee = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, role, employeeCode, slack } = req.body;
  
      // Check if the employee with the given id exists
      const existingEmployee = await TeamSchema.employees.findById(id);
  
      if (!existingEmployee) {
        return res.status(404).json({ success: false, message: 'Employee not found' });
      }
  
      // Update the existing employee properties
      existingEmployee.name = name;
      existingEmployee.role = role;
      existingEmployee.employeeCode = employeeCode;
      existingEmployee.slack = slack;
  
      // Save the updated employee
      await existingEmployee.save();
  
      res.status(200).json({ success: true, message: 'Employee updated successfully', employee: existingEmployee });
    } catch (error) {
      console.error('Error updating employee:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };
   

exports.deleteEmployee = async (req, res) => {
    const { id } = req.params;
  
    try {
      const employee = await TeamSchema.employees.findByIdAndDelete(id);
  
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
  
      res.status(200).json({ message: "Employee deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  };
