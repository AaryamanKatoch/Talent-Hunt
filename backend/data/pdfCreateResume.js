// const { spawn } = require('child_process');

// const texCode = `\\documentclass{article}
// \\begin{document}
// Hello, world!
// \\end{document}`;

// const pdflatex = spawn('pdflatex', ['-interaction=nonstopmode'], { stdio: 'pipe' });

// pdflatex.stdin.write(texCode);
// pdflatex.stdin.end();

// pdflatex.on('exit', (code) => {
//   if (code === 0) {
//     console.log('PDF created successfully');
//   } else {
//     console.error(`PDF creation failed with code ${code}`);
//   }
// });

// import pdflatex from 'node-pdflatex';
const latex = require('node-latex');
const fs = require('fs');
// const path = require('path');

 
async function createResumePdf(resumeData){
  // console.log(resumeData);
  let personalDetails = JSON.parse(resumeData.personalDetails);
  let education = JSON.parse(resumeData.education);
  let experience = JSON.parse(resumeData.experience);
  let projects = JSON.parse(resumeData.projects);
  let skills = JSON.parse(resumeData.skills);

  let educationString = '';

  for(let i = 0; i < education.length; i++){
    educationString = educationString +
    `\\resumeSubheading
    {${education[i].school}}{${education[i].address}}
    {${education[i].degree};  GPA: ${education[i].gpa}}{${education[i].startYear} -- ${education[i].startYear}}`
  }

  let experienceString = '';

  for(let i = 0; i < experience.length; i++){
    let bulletString = '';
    for(let j = 0; j < experience[i].bulletPoints.length; j++){
      bulletString = bulletString +
      `\\resumeItem{}
    {${experience[i].bulletPoints[j]}}\n`
    }

    experienceString = experienceString +
    `\\resumeSubheading
    {${experience[i].company}}{${experience[i].address}}
    {${experience[i].position}}{${experience[i].startMonth} ${experience[i].startYear} - ${experience[i].endMonth} ${experience[i].endYear}}
    \\resumeItemListStart
      ${bulletString}
    \\resumeItemListEnd`
  }

  let projectString = '';

  for(let i = 0; i < projects.length; i++){
    projectString = projectString + 
    `\\resumeSubItem{${projects[i].name}}
    {${projects[i].description}}`
  }

  let skillsString = '';

  for(let i = 0; i < skills.length; i++){
    if(i == 0){
      skillsString = skillsString + `${skills[0]}`;
    }
    else{
      skillsString = skillsString +', ' +`${skills[i]}`
    }
  }

  const source = `


\\documentclass[letterpaper,11pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[pdftex]{hyperref}
\\usepackage{fancyhdr}


\\pagestyle{fancy}
\\fancyhf{} % clear all header and footer fields
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

% Adjust margins
\\addtolength{\\oddsidemargin}{-0.375in}
\\addtolength{\\evensidemargin}{-0.375in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Sections formatting
\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

%-------------------------
% Custom commands
\\newcommand{\\resumeItem}[2]{
  \\item\\small{
    \\textbf{#1}{ #2 \\vspace{-2pt}}
  }
}

\\newcommand{\\resumeProjectItem}[2]{
  \\item\\small{
    \\textbf{#1}{: #2 \\vspace{-2pt}}
  }
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-1pt}\\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-5pt}
}

\\newcommand{\\resumeSubItem}[2]{\\resumeProjectItem{#1}{#2}\\vspace{-4pt}}

\\renewcommand{\\labelitemii}{$\\circ$}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=*]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

%-------------------------------------------
%%%%%%  CV STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%


\\begin{document}

%----------HEADING-----------------
\\begin{tabular*}{\\textwidth}{l@{\\extracolsep{\\fill}}r}
  \\textbf{\\href{${personalDetails.linkedin}}{\\Large ${personalDetails.name}}} & Email : \\href{mailto:${personalDetails.email}}{${personalDetails.email}}\\\\
  \\href{${personalDetails.linkedin}}{${personalDetails.linkedin}} & Mobile : ${personalDetails.contact} \\\\
\\end{tabular*}


%-----------EDUCATION-----------------
\\section{Education}
  \\resumeSubHeadingListStart
    ${educationString}
  \\resumeSubHeadingListEnd


%-----------EXPERIENCE-----------------
\\section{Experience}
  \\resumeSubHeadingListStart
    ${experienceString}
  \\resumeSubHeadingListEnd


%-----------PROJECTS-----------------
\\section{Projects}
  \\resumeSubHeadingListStart
    ${projectString}
  \\resumeSubHeadingListEnd

%
%--------PROGRAMMING SKILLS------------
\\section{Programming Skills}
 \\resumeSubHeadingListStart
   \\item{
     \\textbf{Languages and Technologies}{: ${skillsString}}    
   }
 \\resumeSubHeadingListEnd


%-------------------------------------------
\\end{document}

`

// const pdfPath = path.join('../routes', 'resume.pdf');
const output = fs.createWriteStream('resume.pdf');


const pdf = latex(source);
pdf.pipe(output);
// pdf.on('data',dataCallback);
// pdf.on('end',endCallback); 
pdf.on('error', err => console.error(err))
pdf.on('finish', () => console.log('PDF generated!'));

return pdf;

// pdf.end();
}

module.exports = {
    createResumePdf
}