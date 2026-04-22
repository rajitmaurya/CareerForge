const mongoose = require('mongoose');
const uri = 'mongodb+srv://rajitmaurya:careerforge%40123@careerforge.si37nws.mongodb.net/careerforge?retryWrites=true&w=majority';

mongoose.connect(uri)
  .then(() => {
    console.log('Connected!');
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
