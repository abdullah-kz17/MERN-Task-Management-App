const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: false 
  },
  dueDate: { 
    type: Date, 
    required: false 
  },
  status: { 
    type: String, 
    enum: ['Pending', 'In Progress', 'Completed', 'On Hold'], 
    default: 'Pending' 
  },
  priority: { 
    type: String, 
    enum: ['High', 'Medium', 'Low'], 
    default: 'Medium' 
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}
    ,
    {
        timestamps:true
    }
);

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
