import { useEffect, useState } from "react";
import "../styles/jobsearch.css";

const jobSearch = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    const storedJobs = localStorage.getItem("postedJobs");
    const parsedJobs = storedJobs ? JSON.parse(storedJobs) : [];
    setJobs(parsedJobs);
    setFilteredJobs(parsedJobs);
  }, []);

  useEffect(() => {
    const lowersearchTerm = searchTerm.toLowerCase();
    const filtered = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(lowersearchTerm) ||
        job.company.toLowerCase().includes(lowersearchTerm) ||
        job.location.toLowerCase().includes(lowersearchTerm)
    );
    setFilteredJobs(filtered);
  }, [searchTerm, jobs]);

  return (
    <div className="job-listings-container container py-5">
      <h2 className="section-title mb-4 text-center">✨ Job Listings</h2>
      <div className="search-box mb-5">
        <input
          type="text"
          placeholder="Search by title, company, or location"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input form-control"
        />
      </div>

      {filteredJobs.length == 0 ? (
        <div className="alert alert-danger text-center">
          No jobs found. Try a different keyword.
        </div>
      ) : (
        <div className="row">
          {filteredJobs.map((job, index) => (
            <div key={index} className="col-md-6 col-lg-4 mb-4">
              <div className="job-card shadow-sm p-4 h-100">
                <h5 className="job-title">{job.title}</h5>
                <h6 className="company-name">{job.company}</h6>
                <p className="location">
                  <i className="bi bi-geo-alt"></i> {job.location}
                </p>
                <p className="type">
                  <strong>Type:</strong> {job.type}
                </p>
                <p className="salary">
                  <strong>Salary:</strong> ${job.salary}
                </p>
                <p className="description">{job.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default jobSearch;
