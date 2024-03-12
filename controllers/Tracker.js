const Tracker = require("../models/Tracker");

// Add Tracker
exports.addTracker = async (req, res) => {
    const { name, employeeCode, techStack, project, percentage, priority } = req.body;

    try {
        const newTracker = new Tracker({
            name,
            employeeCode,
            techStack,
            project,
            percentage,
            priority
        });

        await newTracker.save();

        res.status(201).json({ message: "Tracker Added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
};

// Get Trackers
exports.getTrackers = async (req, res) => {
    try {
        const trackers = await Tracker.find().sort({ createdAt: 1 });
        res.status(200).json(trackers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
};

exports.getSingleEmpEdit = async(req,res)=>{
    const {v} =req.params
  
    try{
        const employees = await Tracker.findOne({ _id:v })
        res.status(200).json(employees)
  
    }catch(error){
        res.status(500).json({message:"Server Error"});
  
    }
  }

// Delete Tracker
exports.deleteTracker = async (req, res) => {
    const { id } = req.params;
    console.log(id);

    try {
        const deletedTracker = await Tracker.findByIdAndDelete(id);
        if (!deletedTracker) {
            return res.status(404).json({ error: "Tracker not found" });
        }

        res.status(200).json({ message: "Tracker deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
};

// Update Tracker
exports.updateTracker = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, employeeCode, techStack, project, percentage, priority } = req.body;

        // Check if the required fields are present
        if (!name || !employeeCode) {
            return res.status(400).json({ success: false, message: 'Name and Employee Code are required fields' });
        }

        // Find and update the tracker
        const updatedTracker = await Tracker.findByIdAndUpdate(
            id,
            { name, employeeCode, techStack, project, percentage, priority },
            { new: true, runValidators: true }
        );

        if (!updatedTracker) {
            return res.status(404).json({ success: false, message: 'Tracker not found' });
        }

        res.status(200).json({ success: true, message: 'Tracker updated successfully', tracker: updatedTracker });
    } catch (error) {
        console.error('Error updating tracker:', error);

        // Handle validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({ success: false, message: 'Validation error', errors: error.errors });
        }

        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
