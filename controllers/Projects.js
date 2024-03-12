
const ProjectSchema = require("../models/Projects")


exports.addProject=async(req,res)=>{
    const {projectName,
            clientName,
            startDate,
            endDate,
            projectType,
            resources}=req.body

    try{
            const newUser = new ProjectSchema({
                projectName,
                clientName,
                startDate,
                endDate,
                projectType,
                resources
            })
            
            await newUser.save()
          
            res.status(200).send({message:"Project Added"})

    }
    catch (error) {
        res.status(401).json(error)

    }

}




//gt Projects
exports.getProjects= async(req,res)=> {
    try{
        const projects =await ProjectSchema.find().sort({createdAt: 1})
        res.status(200).json(projects);
    }catch(error){
        res.status(500).send("Server Error");

    }
    

    
};

exports.deleteProject =async(req,res)=>{
 
    const {id} = req.params;
    ProjectSchema.findByIdAndDelete(id)
    .then((project)=>{
        res.status(200).json({ message: "Project Deleted" });
    })
    .catch((err) => {
        res.status(500).json({ message: " Server Error" });
      });
}



// Update project
exports.updateProject = async (req, res) => {
    const { id } = req.params;
    const {
      projectName,
      clientName,
      startDate,
      endDate,
      projectType,
      resources,
    } = req.body;
  
    try {
      const existingProject = await ProjectSchema.findById(id);
      console.log('Existing Project:', existingProject);
  
      if (!existingProject) {
        console.log('Project not found in the database.');
        return res.status(404).json({ message: "Project not found" });
      }
      // Update the project properties
      existingProject.projectName = projectName;
      existingProject.clientName = clientName;
      existingProject.startDate = startDate;
      existingProject.endDate = endDate;
      existingProject.projectType = projectType;
      existingProject.resources = resources;
  
      // Save the updated project
      await existingProject.save();
  
      res.status(200).json({ message: "Project Updated", project: existingProject });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  };




   
