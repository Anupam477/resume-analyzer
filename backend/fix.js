const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const r = mongoose.model('Resume', new mongoose.Schema({}, {strict:false}));
  const res = await r.updateMany({ userEmail: { $exists: false } }, { $set: { userEmail: 'admin@resume.com' } });
  console.log('Fixed old resumes: ', res);
  process.exit(0);
}).catch(e => {
  console.log(e);
  process.exit(1);
});
