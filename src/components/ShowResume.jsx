import React, { useRef } from "react";
import html2pdf from "html2pdf.js";
import '../styles/resumeform.css'

const ShowResume = (props) => {
  const {
    name,
    email,
    phone,
    address,
    linkedin,
    github,
    profileDescription,
    education,
    workExperience,
    projects,
    skills,
    languages,
    certifications,
    achievements,
    volunteering,
    interests,
  } = props;

  const resumeRef = useRef();

  const handleDownload = () => {
    const element = resumeRef.current;
    const opt = {
      margin: 0,
      filename: `${name?.replace(/\s+/g, "_") || "resume"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        scrollY: 0,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <>
      <div style={styles.downloadBtnContainer}>
        <button onClick={handleDownload} style={styles.downloadBtn}>
          Download Resume as PDF
        </button>
      </div>

    <div style={styles.resumeContainer}>
      <div style={styles.wrapper} ref={resumeRef}>
        <div style={styles.body}>
          <div style={styles.header}>{name}</div>
          <div style={styles.contactInfo}>
            {email} | {phone} | {address}
            <br />
            <a href={linkedin} target="_blank" rel="noopener noreferrer">
              {linkedin}
            </a>{" "}
            |{" "}
            <a href={github} target="_blank" rel="noopener noreferrer">
              {github}
            </a>
          </div>

          {profileDescription && (
            <div style={styles.profileDescription}>
              <strong>Summary:</strong> {profileDescription}
            </div>
          )}

          <Section title="Education">
            {education.map((edu, i) => (
              <div key={i}>
                <div style={styles.itemTitle}>
                  {edu.degree} - {edu.institution} ({edu.year})
                </div>
                {edu.specialization && (
                  <div>
                    <strong>Specialization:</strong> {edu.specialization}
                  </div>
                )}
                {edu.coursework && (
                  <div>
                    <strong>Coursework:</strong> {edu.coursework.join(", ")}
                  </div>
                )}
                {edu.thesisOrResearch && (
                  <div>
                    <strong>Thesis:</strong> {edu.thesisOrResearch}
                  </div>
                )}
                <ul>
                  {edu.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </Section>

          {workExperience && workExperience.length > 0 && (
            <Section title="Work Experience">
              {workExperience.map((job, i) => (
                <div key={i}>
                  <div style={styles.itemTitle}>
                    {job.role} - {job.company} ({job.duration})
                  </div>
                  <ul>
                    {job.responsibilities.map((res, idx) => (
                      <li key={idx}>{res}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </Section>
          )}

          <Section title="Projects">
            {projects.map((proj, i) => (
              <div key={i}>
                <div style={styles.itemTitle}>{proj.title}</div>
                <div>{proj.description}</div>
                {proj.link && (
                  <div>
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {proj.link}
                    </a>
                  </div>
                )}
                {proj.technologies && (
                  <div>
                    <strong>Tech Used:</strong> {proj.technologies.join(", ")}
                  </div>
                )}
                {proj.role && (
                  <div>
                    <strong>Role:</strong> {proj.role}
                  </div>
                )}
                {proj.highlights && (
                  <ul>
                    {proj.highlights.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </Section>

          <Section title="Skills">
            <ul>
              {skills.map((skill, i) => (
                <li key={i}>
                  {skill.name}{" "}
                  {skill.level && <span>- {skill.level}</span>}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Languages">
            <ul>
              {languages.map((lang, i) => (
                <li key={i}>
                  {lang.name}{" "}
                  {lang.level && <span>- {lang.level}</span>}
                </li>
              ))}
            </ul>
          </Section>

          {certifications && certifications.length > 0 && (
            <Section title="Certifications">
              <ul>
                {certifications.map((cert, i) => (
                  <li key={i}>
                    {cert.title} ({cert.year}) - {cert.issuer}
                    {cert.description && <div>{cert.description}</div>}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {achievements && achievements.length > 0 && (
            <Section title="Achievements">
              <ul>
                {achievements.map((ach, i) => (
                  <li key={i}>
                    <strong>{ach.title}</strong> ({ach.year}):{" "}
                    {ach.description}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {volunteering && volunteering.length > 0 && (
            <Section title="Volunteering">
              {volunteering.map((v, i) => (
                <div key={i}>
                  <div style={styles.itemTitle}>
                    {v.role} - {v.organization} ({v.year})
                  </div>
                  <div>{v.description}</div>
                </div>
              ))}
            </Section>
          )}

          {interests && interests.length > 0 && (
            <Section title="Interests">
              <ul>
                {interests.map((interest, i) => (
                  <li key={i}>{interest}</li>
                ))}
              </ul>
            </Section>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

const Section = ({ title, children }) => (
  <div style={styles.section}>
    <div style={styles.sectionTitle}>{title}</div>
    {children}
  </div>
);

const styles = {
    resumeContainer: {
       border: "2px solid black",
    marginLeft: "20%",
    },
  wrapper: {
    width: "210mm",
    minHeight: "297mm",
    padding: "10mm 15mm",
    boxSizing: "border-box",
    backgroundColor: "#fff",
  },
  body: {
    fontFamily: '"Times New Roman", Times, serif',
    lineHeight: 1.4,
    fontSize: "11.5px",
    color: "#000",
  },
  header: {
    fontWeight: "bold",
    fontSize: "20px",
    textAlign: "center",
    marginBottom: "10px",
  },
  contactInfo: {
    textAlign: "center",
    fontSize: "11px",
    marginBottom: "15px",
  },
  profileDescription: {
    fontStyle: "italic",
    marginBottom: "12px",
    fontSize: "12px",
  },
  section: {
    marginBottom: "12px",
  },
  sectionTitle: {
    fontWeight: "bold",
    borderBottom: "1px solid #000",
    marginBottom: "5px",
    fontSize: "13px",
  },
  itemTitle: {
    fontWeight: "bold",
  },
  downloadBtnContainer: {
    textAlign: "center",
    margin: "20px 0",
  },
  downloadBtn: {
    padding: "8px 16px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    borderRadius: "4px",
  },
};

export default ShowResume;
