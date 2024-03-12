
const express=require('express')
const { addEmployee, getEmployees, updateEmployee, deleteEmployee, getSingleEmp, } = require('../controllers/TeamEmployee')
const { addProject, getProjects,deleteProject, updateProject } = require('../controllers/Projects')
const { addTracker, getTrackers, deleteTracker, updateTracker,getSingleEmpEdit  } = require('../controllers/Tracker')
const { RegisterUser } = require('../controllers/authController')


//create an object for router class in object
const router=new express.Router()

//route for add employee
router.post('/api/add-employee',addEmployee)
// route for get employee
router.get('/api/get-employees',getEmployees)
// route for get single employee
router.get('/api/get-singleEmp/:category',getSingleEmp)
// route for get single employee
router.get('/api/get-singleEmpedit/:v',getSingleEmpEdit)
//route for update employee
router.put('/api/update-employee/:id',updateEmployee)
//route for delete employee
router.delete('/api/delete-employee/:id',deleteEmployee)

//route for add projects
router.post('/api/add-project',addProject)
//route for get projects
router.get('/api/get-projects',getProjects)
//route for delete projects
router.delete('/api/delete-project/:id',deleteProject)

// route for update projects
router.put("/api/update-project/:id", updateProject);


// routes for Tracker 

//route for add tracker
router.post('/api/add-tracker',addTracker);
//route for get tracker
router.get('/api/get-tracker',getTrackers);
//route for delete tracker
router.delete('/api/delete-tracker/:id',deleteTracker);
//route for update tracker
router.put("/api/update-tracker/:id",updateTracker);

//user Route
router.post("/api/register",RegisterUser)

module.exports=router
