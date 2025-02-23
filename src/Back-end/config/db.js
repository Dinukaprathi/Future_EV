const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://Dinuka:Dinukamash%401@cluster0.hr1n3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed. Details:');
    console.error(`Error Message: ${error.message}`);
    console.error(`Stack Trace: ${error.stack}`);
    process.exit(1); // Exit the application with a failure code
  }
};

module.exports = connectDB;
