// Capture references to the form and content elements
const form = document.getElementById("resume-form") as HTMLFormElement;
const resumeContent = document.getElementById("resume-content") as HTMLDivElement;

// Handle form submission to dynamically populate the resume
form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Capture user input from the form
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const phone = (document.getElementById("phone") as HTMLInputElement).value;
    const address = (document.getElementById("address") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const linkedin = (document.getElementById("linkedin") as HTMLInputElement).value;
    const education = (document.getElementById("education") as HTMLTextAreaElement).value;
    const workExperience = (document.getElementById("work-experience-input") as HTMLTextAreaElement).value;
    const skills = (document.getElementById("skills-input") as HTMLTextAreaElement).value;
    const languages = (document.getElementById("languages-input") as HTMLTextAreaElement).value;

    // Capture the left section data
    const profilePictureUrl = (document.getElementById("profile-picture-input") as HTMLInputElement).value;
    const careerObjective = (document.getElementById("career-objective-input") as HTMLTextAreaElement).value;
    const certifications = (document.getElementById("certifications-input") as HTMLTextAreaElement).value;

    // Split the skills string by newlines or commas
    const skillsList = skills.split(/\n|,/).map(skill => skill.trim()).filter(skill => skill.length > 0);

    // Create an unordered list of skills
    const skillsHtml = skillsList.map(skill => `<li contenteditable="true">${skill}</li>`).join("");

    // Split the languages string by newlines or commas
    const languagesList = languages.split(/\n|,/).map(language => language.trim()).filter(language => language.length > 0);
    // Create an unordered list of languages
    const languagesHtml = languagesList.length > 0 
    ? `<ul class="languages-list">${languagesList.map(language => `<li contenteditable="true">${language}</li>`).join('')}</ul>`
    : '<p>No languages entered</p>'; // If no languages, show a message instead

    // Update the resume content dynamically
    resumeContent.innerHTML = `
    <div class="left-section">
        <img id="profile-picture" src="${profilePictureUrl}" alt="Profile picture" class="profile-picture">
        <div class="objective">
            <section>
                <h3 contenteditable="true" style="color: white;">Professional Profile</h3>
                <p contenteditable="true" style="text-align: justify; hyphens: auto;">${careerObjective}</p>
            </section>
            <section>
                <h3 contenteditable="true" style="color: white;">Certifications</h3>
                <p contenteditable="true"><b>Certifications:</b> ${certifications}</p>
            </section>
            <section>
                <h3 contenteditable="true" style="color: white;">Languages</h3>
                <ul class="languages-list">
                    ${languagesHtml}
                </ul>
            </section>
            </div>
        </div>

        <div class="right-section">
            <h1 contenteditable="true">Dynamic Resume Builder</h1>
            <section id="personal-info">
                <h3 contenteditable="true">Personal Information</h3>
                <p contenteditable="true"><b>Name:</b> ${name}</p>
                <p contenteditable="true"><b>Phone:</b> ${phone}</p>
                <p contenteditable="true"><b>Address:</b> ${address}</p>
                <p contenteditable="true"><b>Email:</b> <a href="mailto:${email}" contenteditable="true">${email}</a></p>
                <p contenteditable="true"><b>LinkedIn:</b> <a href="${linkedin}" target="_blank" contenteditable="true">${linkedin}</a></p>
            </section>
            <section class="education">
                <h3 contenteditable="true">Education</h3>
                <p contenteditable="true">${education}</p>
            </section>
            <section id="work-experience">
                <h3 contenteditable="true">Work Experience</h3>
                <p contenteditable="true">${workExperience}</p>
            </section>
            <section id="skills">
                <h3 contenteditable="true">Skills</h3>
                <ul>
                    ${skillsHtml}
                </ul>
            </section>
        </div>
    `;
});

// Function to download the resume as a PDF using html2pdf.js
function downloadPDF() {
    const element = document.getElementById("resume-content");

    // Select the download button and cast it to HTMLElement
    const downloadButton = document.querySelector("button[onclick='downloadPDF()']") as HTMLElement;

    // Hide the download button temporarily
    downloadButton.style.display = "none";

    // Generate the PDF
    (window as any).html2pdf(element, {
        margin: 1,
        filename: 'Resume_Syed_Ali_Hussaini.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    }).then(() => {
        // Show the download button again after PDF generation
        downloadButton.style.display = "block";
    });
}
