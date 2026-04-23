const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const r = mongoose.model('Resume', new mongoose.Schema({}, {strict:false}));
  const res = await r.deleteMany({ userName: { $exists: false } }); // I set the previous ones to User or didn't set userName, wait.
  // Actually, I can just delete ALL resumes where userEmail === "admin@resume.com"
  const res2 = await r.deleteMany({ userEmail: 'admin@resume.com' });
  console.log('Deleted old resumes: ', res2);
  process.exit(0);
}).catch(e => {
  console.log(e);
  process.exit(1);
});
