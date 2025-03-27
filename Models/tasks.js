const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: [true, 'Task name is required'],
    trim: true,
    maxlength: [100, 'Task name cannot exceed 100 characters']
  },
  completed: {
    type: Boolean,
    default: false
  }
});

const userTasksSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users', 
    required: [true, 'User ID is required']
  },
  tasks: [taskSchema]
}, {
  timestamps: true 
});


const UserTasks = mongoose.model('UserTasks', userTasksSchema);

module.exports = UserTasks;