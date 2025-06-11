// pages/PostJob.js
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";

const JobPosting = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    const existingJobs = JSON.parse(localStorage.getItem("postedJobs")) || [];
    localStorage.setItem("postedJobs", JSON.stringify([...existingJobs, data]));
    alert("Job posted successfully!");
    reset();
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Post a New Job</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-light p-4 rounded shadow-sm">

        {/* Job Title */}
        <div className="mb-3">
          <label className="form-label">Job Title</label>
          <input className="form-control" {...register("title", { required: "Title is required" })} />
          {errors.title && <small className="text-danger">{errors.title.message}</small>}
        </div>

        {/* Company Name */}
        <div className="mb-3">
          <label className="form-label">Company Name</label>
          <input className="form-control" {...register("company", { required: "Company name is required" })} />
          {errors.company && <small className="text-danger">{errors.company.message}</small>}
        </div>

        {/* Location */}
        <div className="mb-3">
          <label className="form-label">Location</label>
          <input className="form-control" {...register("location", { required: "Location is required" })} />
          {errors.location && <small className="text-danger">{errors.location.message}</small>}
        </div>

        {/* Job Type */}
        <div className="mb-3">
          <label className="form-label">Job Type</label>
          <select className="form-select" {...register("type", { required: "Job type is required" })}>
            <option value="">Select</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Internship">Internship</option>
          </select>
          {errors.type && <small className="text-danger">{errors.type.message}</small>}
        </div>

        {/* Salary */}
        <div className="mb-3">
          <label className="form-label">Salary</label>
          <input
            type="number"
            className="form-control"
            {...register("salary", {
              required: "Salary is required",
              min: { value: 0, message: "Salary must be positive" }
            })}
          />
          {errors.salary && <small className="text-danger">{errors.salary.message}</small>}
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            rows="4"
            {...register("description", { required: "Description is required" })}
          />
          {errors.description && <small className="text-danger">{errors.description.message}</small>}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">Post Job</button>
      </form>
    </div>
  );
};

export default JobPosting;
    