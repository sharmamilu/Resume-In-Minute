import React from "react";
import "../styles/resumeform.css";
import { useForm, useFieldArray } from "react-hook-form";

const ResumeForm = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      linkedin: "",
      github: "",
      profileDescription: "",
      education: [
        {
          degree: "",
          institution: "",
          year: "",
          specialization: "",
          thesisOrResearch: "",
          coursework: "",
          details: "",
        },
      ],
      workExperience: [
        { company: "", role: "", duration: "", responsibilities: "" },
      ],
      projects: [
        {
          title: "",
          description: "",
          technologies: "",
          role: "",
          highlights: "",
        },
      ],
      skills: [{ name: "", level: "" }],
      languages: [{ name: "", level: "" }],
      certifications: [{ title: "", year: "", issuer: "", description: "" }],
      achievements: [{ title: "", year: "", description: "" }],
      volunteering: [{ organization: "", role: "", year: "", description: "" }],
      interests: [""],
    },
  });

  const transformToArray = (value) =>
    typeof value === "string"
      ? value
          .split(",")
          .map((v) => v.trim())
          .filter((v) => v.length > 0)
      : [];

  const onSubmit = (data) => {
    const transformedData = {
      ...data,
      education: data.education.map((edu) => ({
        ...edu,
        coursework: transformToArray(edu.coursework),
        details: transformToArray(edu.details),
      })),
      workExperience: data.workExperience.map((job) => ({
        ...job,
        responsibilities: transformToArray(job.responsibilities),
      })),
      projects: data.projects.map((project) => ({
        ...project,
        technologies: transformToArray(project.technologies),
        highlights: transformToArray(project.highlights),
      })),
      interests: data.interests.filter((i) => i),
    };

    localStorage.setItem("resumeData", JSON.stringify(transformedData));
    alert("Resume saved successfully!");
    reset();
  };

  const educationFields = useFieldArray({ control, name: "education" });
  const workFields = useFieldArray({ control, name: "workExperience" });
  const projectFields = useFieldArray({ control, name: "projects" });
  const skillFields = useFieldArray({ control, name: "skills" });
  const languageFields = useFieldArray({ control, name: "languages" });
  const certificationFields = useFieldArray({ control, name: "certifications" });
  const achievementFields = useFieldArray({ control, name: "achievements" });
  const volunteeringFields = useFieldArray({ control, name: "volunteering" });
  const interestFields = useFieldArray({ control, name: "interests" });

  return (
    <form className="resume-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <h1 className="form-title">Build Your Resume</h1>

      {/* Personal Information */}
      <section className="form-section">
        <h2>Personal Information</h2>
        <div className="field-group grid-2">
          <div>
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className="error">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="example@email.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              type="tel"
              placeholder="10-digit number"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Phone number should be 10 digits",
                },
              })}
            />
            {errors.phone && <p className="error">{errors.phone.message}</p>}
          </div>

          <div>
            <label htmlFor="address">Address</label>
            <input
              id="address"
              type="text"
              placeholder="Your address"
              {...register("address")}
            />
          </div>

          <div>
            <label htmlFor="linkedin">LinkedIn Profile</label>
            <input
              id="linkedin"
              type="url"
              placeholder="https://linkedin.com/in/username"
              {...register("linkedin", {
                pattern: {
                  value: /^(https?:\/\/)?(www\.)?linkedin\.com\/\w+\/?$/,
                  message: "Invalid LinkedIn URL",
                },
              })}
            />
            {errors.linkedin && <p className="error">{errors.linkedin.message}</p>}
          </div>

          <div>
            <label htmlFor="github">GitHub Profile</label>
            <input
              id="github"
              type="url"
              placeholder="https://github.com/username"
              {...register("github", {
                pattern: {
                  value: /^(https?:\/\/)?(www\.)?github\.com\/\w+\/?$/,
                  message: "Invalid GitHub URL",
                },
              })}
            />
            {errors.github && <p className="error">{errors.github.message}</p>}
          </div>

          <div className="full-width">
            <label htmlFor="profileDescription">Profile Description</label>
            <textarea
              id="profileDescription"
              rows={4}
              placeholder="A brief about you..."
              {...register("profileDescription")}
            />
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="form-section">
        <h2>Education</h2>
        {educationFields.fields.map((field, index) => (
          <div className="field-group grid-3" key={field.id}>
            <div>
              <label htmlFor={`education.${index}.degree`}>Degree</label>
              <input
                id={`education.${index}.degree`}
                type="text"
                placeholder="B.Sc Computer Science"
                {...register(`education.${index}.degree`)}
              />
            </div>

            <div>
              <label htmlFor={`education.${index}.institution`}>Institution</label>
              <input
                id={`education.${index}.institution`}
                type="text"
                placeholder="University Name"
                {...register(`education.${index}.institution`)}
              />
            </div>

            <div>
              <label htmlFor={`education.${index}.year`}>Year</label>
              <input
                id={`education.${index}.year`}
                type="date"
                {...register(`education.${index}.year`)}
              />
            </div>

            <div>
              <label htmlFor={`education.${index}.specialization`}>
                Specialization
              </label>
              <input
                id={`education.${index}.specialization`}
                type="text"
                placeholder="AI & Machine Learning"
                {...register(`education.${index}.specialization`)}
              />
            </div>

            <div className="full-width">
              <label htmlFor={`education.${index}.thesisOrResearch`}>
                Thesis or Research
              </label>
              <textarea
                id={`education.${index}.thesisOrResearch`}
                rows={3}
                placeholder="Optional thesis or research work"
                {...register(`education.${index}.thesisOrResearch`)}
              />
            </div>

            <div className="full-width">
              <label htmlFor={`education.${index}.coursework`}>
                Coursework (comma separated)
              </label>
              <textarea
                id={`education.${index}.coursework`}
                rows={2}
                placeholder="Data Structures, Algorithms, etc."
                {...register(`education.${index}.coursework`)}
              />
            </div>

            <div className="full-width">
              <label htmlFor={`education.${index}.details`}>
                Details (comma separated)
              </label>
              <textarea
                id={`education.${index}.details`}
                rows={2}
                placeholder="Awards, GPA, etc."
                {...register(`education.${index}.details`)}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          className="add-btn"
          onClick={() =>
            educationFields.append({
              degree: "",
              institution: "",
              year: "",
              specialization: "",
              thesisOrResearch: "",
              coursework: "",
              details: "",
            })
          }
        >
          + Add Education
        </button>
      </section>

      {/* Work Experience */}
      <section className="form-section">
        <h2>Work Experience</h2>
        {workFields.fields.map((field, index) => (
          <div className="field-group grid-3" key={field.id}>
            <div>
              <label htmlFor={`workExperience.${index}.company`}>Company</label>
              <input
                id={`workExperience.${index}.company`}
                type="text"
                placeholder="Company Name"
                {...register(`workExperience.${index}.company`)}
              />
            </div>

            <div>
              <label htmlFor={`workExperience.${index}.role`}>Role</label>
              <input
                id={`workExperience.${index}.role`}
                type="text"
                placeholder="Your Role"
                {...register(`workExperience.${index}.role`)}
              />
            </div>

            <div>
              <label htmlFor={`workExperience.${index}.duration`}>Duration</label>
              <input
                id={`workExperience.${index}.duration`}
                type="text"
                placeholder="e.g., Jan 2020 - Dec 2022"
                {...register(`workExperience.${index}.duration`)}
              />
            </div>

            <div className="full-width">
              <label htmlFor={`workExperience.${index}.responsibilities`}>
                Responsibilities (comma separated)
              </label>
              <textarea
                id={`workExperience.${index}.responsibilities`}
                rows={3}
                placeholder="Responsibility 1, Responsibility 2"
                {...register(`workExperience.${index}.responsibilities`)}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          className="add-btn"
          onClick={() => workFields.append({ company: "", role: "", duration: "", responsibilities: "" })}
        >
          + Add Work
        </button>
      </section>

      {/* Projects */}
      <section className="form-section">
        <h2>Projects</h2>
        {projectFields.fields.map((field, index) => (
          <div className="field-group grid-3" key={field.id}>
            <div>
              <label htmlFor={`projects.${index}.title`}>Title</label>
              <input
                id={`projects.${index}.title`}
                type="text"
                placeholder="Project Title"
                {...register(`projects.${index}.title`)}
              />
            </div>

            <div>
              <label htmlFor={`projects.${index}.role`}>Role</label>
              <input
                id={`projects.${index}.role`}
                type="text"
                placeholder="Your Role"
                {...register(`projects.${index}.role`)}
              />
            </div>

            <div>
              <label htmlFor={`projects.${index}.technologies`}>
                Technologies (comma separated)
              </label>
              <input
                id={`projects.${index}.technologies`}
                type="text"
                placeholder="React, Node.js, etc."
                {...register(`projects.${index}.technologies`)}
              />
            </div>

            <div className="full-width">
              <label htmlFor={`projects.${index}.description`}>Description</label>
              <textarea
                id={`projects.${index}.description`}
                rows={3}
                placeholder="Project description"
                {...register(`projects.${index}.description`)}
              />
            </div>

            <div className="full-width">
              <label htmlFor={`projects.${index}.highlights`}>
                Highlights (comma separated)
              </label>
              <textarea
                id={`projects.${index}.highlights`}
                rows={2}
                placeholder="Highlight 1, Highlight 2"
                {...register(`projects.${index}.highlights`)}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          className="add-btn"
          onClick={() =>
            projectFields.append({
              title: "",
              description: "",
              technologies: "",
              role: "",
              highlights: "",
            })
          }
        >
          + Add Project
        </button>
      </section>

      {/* Skills */}
      <section className="form-section">
        <h2>Skills</h2>
        {skillFields.fields.map((field, index) => (
          <div className="field-group grid-2" key={field.id}>
            <div>
              <label htmlFor={`skills.${index}.name`}>Skill</label>
              <input
                id={`skills.${index}.name`}
                type="text"
                placeholder="Skill Name"
                {...register(`skills.${index}.name`)}
              />
            </div>

            <div>
              <label htmlFor={`skills.${index}.level`}>Level</label>
              <input
                id={`skills.${index}.level`}
                type="text"
                placeholder="e.g., Beginner, Expert"
                {...register(`skills.${index}.level`)}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          className="add-btn"
          onClick={() => skillFields.append({ name: "", level: "" })}
        >
          + Add Skill
        </button>
      </section>

      {/* Languages */}
      <section className="form-section">
        <h2>Languages</h2>
        {languageFields.fields.map((field, index) => (
          <div className="field-group grid-2" key={field.id}>
            <div>
              <label htmlFor={`languages.${index}.name`}>Language</label>
              <input
                id={`languages.${index}.name`}
                type="text"
                placeholder="Language Name"
                {...register(`languages.${index}.name`)}
              />
            </div>

            <div>
              <label htmlFor={`languages.${index}.level`}>Level</label>
              <input
                id={`languages.${index}.level`}
                type="text"
                placeholder="e.g., Fluent, Native"
                {...register(`languages.${index}.level`)}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          className="add-btn"
          onClick={() => languageFields.append({ name: "", level: "" })}
        >
          + Add Language
        </button>
      </section>

      {/* Certifications */}
      <section className="form-section">
        <h2>Certifications</h2>
        {certificationFields.fields.map((field, index) => (
          <div className="field-group grid-4" key={field.id}>
            <div>
              <label htmlFor={`certifications.${index}.title`}>Title</label>
              <input
                id={`certifications.${index}.title`}
                type="text"
                placeholder="Certification Title"
                {...register(`certifications.${index}.title`)}
              />
            </div>

            <div>
              <label htmlFor={`certifications.${index}.year`}>Year</label>
              <input
                id={`certifications.${index}.year`}
                type="text"
                placeholder="Year"
                {...register(`certifications.${index}.year`)}
              />
            </div>

            <div>
              <label htmlFor={`certifications.${index}.issuer`}>Issuer</label>
              <input
                id={`certifications.${index}.issuer`}
                type="text"
                placeholder="Issuer"
                {...register(`certifications.${index}.issuer`)}
              />
            </div>

            <div className="full-width">
              <label htmlFor={`certifications.${index}.description`}>
                Description
              </label>
              <textarea
                id={`certifications.${index}.description`}
                rows={2}
                placeholder="Details about certification"
                {...register(`certifications.${index}.description`)}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          className="add-btn"
          onClick={() =>
            certificationFields.append({ title: "", year: "", issuer: "", description: "" })
          }
        >
          + Add Certification
        </button>
      </section>

      {/* Achievements */}
      <section className="form-section">
        <h2>Achievements</h2>
        {achievementFields.fields.map((field, index) => (
          <div className="field-group grid-3" key={field.id}>
            <div>
              <label htmlFor={`achievements.${index}.title`}>Title</label>
              <input
                id={`achievements.${index}.title`}
                type="text"
                placeholder="Achievement Title"
                {...register(`achievements.${index}.title`)}
              />
            </div>

            <div>
              <label htmlFor={`achievements.${index}.year`}>Year</label>
              <input
                id={`achievements.${index}.year`}
                type="text"
                placeholder="Year"
                {...register(`achievements.${index}.year`)}
              />
            </div>

            <div className="full-width">
              <label htmlFor={`achievements.${index}.description`}>
                Description
              </label>
              <textarea
                id={`achievements.${index}.description`}
                rows={3}
                placeholder="Details about achievement"
                {...register(`achievements.${index}.description`)}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          className="add-btn"
          onClick={() => achievementFields.append({ title: "", year: "", description: "" })}
        >
          + Add Achievement
        </button>
      </section>

      {/* Volunteering */}
      <section className="form-section">
        <h2>Volunteering</h2>
        {volunteeringFields.fields.map((field, index) => (
          <div className="field-group grid-4" key={field.id}>
            <div>
              <label htmlFor={`volunteering.${index}.organization`}>
                Organization
              </label>
              <input
                id={`volunteering.${index}.organization`}
                type="text"
                placeholder="Organization Name"
                {...register(`volunteering.${index}.organization`)}
              />
            </div>

            <div>
              <label htmlFor={`volunteering.${index}.role`}>Role</label>
              <input
                id={`volunteering.${index}.role`}
                type="text"
                placeholder="Your Role"
                {...register(`volunteering.${index}.role`)}
              />
            </div>

            <div>
              <label htmlFor={`volunteering.${index}.year`}>Year</label>
              <input
                id={`volunteering.${index}.year`}
                type="text"
                placeholder="Year"
                {...register(`volunteering.${index}.year`)}
              />
            </div>

            <div className="full-width">
              <label htmlFor={`volunteering.${index}.description`}>
                Description
              </label>
              <textarea
                id={`volunteering.${index}.description`}
                rows={3}
                placeholder="Details about your volunteering"
                {...register(`volunteering.${index}.description`)}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          className="add-btn"
          onClick={() =>
            volunteeringFields.append({ organization: "", role: "", year: "", description: "" })
          }
        >
          + Add Volunteering
        </button>
      </section>

      {/* Interests */}
      <section className="form-section">
        <h2>Interests</h2>
        {interestFields.fields.map((field, index) => (
          <div className="field-group grid-1" key={field.id}>
            <div>
              <label htmlFor={`interests.${index}`}>Interest</label>
              <input
                id={`interests.${index}`}
                type="text"
                placeholder="Interest or Hobby"
                {...register(`interests.${index}`)}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          className="add-btn"
          onClick={() => interestFields.append("")}
        >
          + Add Interest
        </button>
      </section>

      <button type="submit" className="submit-btn">
        Save Resume
      </button>
    </form>
  );
};

export default ResumeForm;
