const mongoose = require('mongoose');
require('dotenv').config();

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  skillsRequired: [String],
  applyLink: String
});

const Job = mongoose.model("Job", jobSchema);

const jobs = [
  { title: "Frontend Developer", company: "Google", skillsRequired: ["react", "javascript", "html", "css"], applyLink: "https://careers.google.com/" },
  { title: "Backend Engineer", company: "Amazon", skillsRequired: ["node", "express", "mongodb", "javascript"], applyLink: "https://amazon.jobs/" },
  { title: "Full Stack Developer", company: "Microsoft", skillsRequired: ["react", "node", "mongodb", "javascript", "git"], applyLink: "https://careers.microsoft.com/" },
  { title: "Data Scientist", company: "Meta", skillsRequired: ["python", "sql", "git"], applyLink: "https://metacareers.com/" },
  { title: "Software Engineer C++", company: "Tesla", skillsRequired: ["c++", "c", "git"], applyLink: "https://www.tesla.com/careers" },
  { title: "Java Backend Developer", company: "Oracle", skillsRequired: ["java", "sql", "git", "mysql"], applyLink: "https://careers.oracle.com/" },
  { title: "React Developer", company: "Adobe", skillsRequired: ["html", "css", "javascript", "react"], applyLink: "https://careers.adobe.com/" },
  { title: "Database Administrator", company: "IBM", skillsRequired: ["sql", "mysql", "mongodb"], applyLink: "https://www.ibm.com/careers" },
  { title: "Python Developer", company: "Spotify", skillsRequired: ["python", "sql", "git"], applyLink: "https://lifeatspotify.com/" },
  { title: "Software Engineer", company: "Netflix", skillsRequired: ["react", "javascript", "node", "html", "css", "git"], applyLink: "https://jobs.netflix.com/" }
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    // Clear old jobs just to be clean
    await Job.deleteMany({});
    // Insert new
    await Job.insertMany(jobs);
    console.log('10 jobs inserted successfully!');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
