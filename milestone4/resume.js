// Capture references to the form and content elements
var form = document.getElementById("resume-form");
var resumeContent = document.getElementById("resume-content");
// Handle form submission to dynamically populate the resume
form.addEventListener("submit", function (event) {
    event.preventDefault();
    // Capture user input from the form
    var name = document.getElementById("name").value;
    var phone = document.getElementById("phone").value;
    var address = document.getElementById("address").value;
    var email = document.getElementById("email").value;
    var linkedin = document.getElementById("linkedin").value;
    var education = document.getElementById("education").value;
    var workExperience = document.getElementById("work-experience-input").value;
    var skills = document.getElementById("skills-input").value;
    var languages = document.getElementById("languages-input").value;
    // Capture the left section data
    var profilePictureUrl = document.getElementById("profile-picture-input").value;
    var careerObjective = document.getElementById("career-objective-input").value;
    var certifications = document.getElementById("certifications-input").value;
    // Split the skills string by newlines or commas
    var skillsList = skills.split(/\n|,/).map(function (skill) { return skill.trim(); }).filter(function (skill) { return skill.length > 0; });
    // Create an unordered list of skills
    var skillsHtml = skillsList.map(function (skill) { return "<li contenteditable=\"true\">".concat(skill, "</li>"); }).join("");
    // Split the languages string by newlines or commas
    var languagesList = languages.split(/\n|,/).map(function (language) { return language.trim(); }).filter(function (language) { return language.length > 0; });
    // Create an unordered list of languages
    var languagesHtml = languagesList.length > 0
        ? "<ul class=\"languages-list\">".concat(languagesList.map(function (language) { return "<li contenteditable=\"true\">".concat(language, "</li>"); }).join(''), "</ul>")
        : '<p>No languages entered</p>'; // If no languages, show a message instead
    // Update the resume content dynamically
    resumeContent.innerHTML = "\n    <div class=\"left-section\">\n        <img id=\"profile-picture\" src=\"".concat(profilePictureUrl, "\" alt=\"Profile picture\" class=\"profile-picture\">\n        <div class=\"objective\">\n            <section>\n                <h3 contenteditable=\"true\" style=\"color: white;\">Professional Profile</h3>\n                <p contenteditable=\"true\" style=\"text-align: justify; hyphens: auto;\">").concat(careerObjective, "</p>\n            </section>\n            <section>\n                <h3 contenteditable=\"true\" style=\"color: white;\">Certifications</h3>\n                <p contenteditable=\"true\"><b>Certifications:</b> ").concat(certifications, "</p>\n            </section>\n            <section>\n                <h3 contenteditable=\"true\" style=\"color: white;\">Languages</h3>\n                <ul class=\"languages-list\">\n                    ").concat(languagesHtml, "\n                </ul>\n            </section>\n            </div>\n        </div>\n\n        <div class=\"right-section\">\n            <h1 contenteditable=\"true\">Dynamic Resume Builder</h1>\n            <section id=\"personal-info\">\n                <h3 contenteditable=\"true\">Personal Information</h3>\n                <p contenteditable=\"true\"><b>Name:</b> ").concat(name, "</p>\n                <p contenteditable=\"true\"><b>Phone:</b> ").concat(phone, "</p>\n                <p contenteditable=\"true\"><b>Address:</b> ").concat(address, "</p>\n                <p contenteditable=\"true\"><b>Email:</b> <a href=\"mailto:").concat(email, "\" contenteditable=\"true\">").concat(email, "</a></p>\n                <p contenteditable=\"true\"><b>LinkedIn:</b> <a href=\"").concat(linkedin, "\" target=\"_blank\" contenteditable=\"true\">").concat(linkedin, "</a></p>\n            </section>\n            <section class=\"education\">\n                <h3 contenteditable=\"true\">Education</h3>\n                <p contenteditable=\"true\">").concat(education, "</p>\n            </section>\n            <section id=\"work-experience\">\n                <h3 contenteditable=\"true\">Work Experience</h3>\n                <p contenteditable=\"true\">").concat(workExperience, "</p>\n            </section>\n            <section id=\"skills\">\n                <h3 contenteditable=\"true\">Skills</h3>\n                <ul>\n                    ").concat(skillsHtml, "\n                </ul>\n            </section>\n        </div>\n    ");
});
// Function to download the resume as a PDF using html2pdf.js
function downloadPDF() {
    var element = document.getElementById("resume-content");
    // Select the download button and cast it to HTMLElement
    var downloadButton = document.querySelector("button[onclick='downloadPDF()']");
    // Hide the download button temporarily
    downloadButton.style.display = "none";
    // Generate the PDF
    window.html2pdf(element, {
        margin: 1,
        filename: 'Resume_Syed_Ali_Hussaini.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    }).then(function () {
        // Show the download button again after PDF generation
        downloadButton.style.display = "block";
    });
}
