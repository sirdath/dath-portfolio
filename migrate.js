const fs = require('fs');
const path = require('path');

const projectsDir = path.join(__dirname, 'app', 'projects');
const caseStudyCssPath = path.join(projectsDir, 'case-study.css');
const aegisCssPath = path.join(projectsDir, 'aegis', 'aegis.css');

// 1. Move aegis.css to case-study.css
if (fs.existsSync(aegisCssPath)) {
  let cssContent = fs.readFileSync(aegisCssPath, 'utf8');
  // Combine neurovault.css into it if it exists
  const neurovaultCssPath = path.join(projectsDir, 'neurovault', 'neurovault.css');
  if (fs.existsSync(neurovaultCssPath)) {
    cssContent += '\n\n/* --- From neurovault.css --- */\n' + fs.readFileSync(neurovaultCssPath, 'utf8');
    fs.unlinkSync(neurovaultCssPath);
  }
  fs.writeFileSync(caseStudyCssPath, cssContent);
  fs.unlinkSync(aegisCssPath);
  console.log('Moved aegis.css to case-study.css');
}

// 2. Update imports in all page.tsx files
const folders = fs.readdirSync(projectsDir).filter(f => fs.statSync(path.join(projectsDir, f)).isDirectory());

for (const folder of folders) {
  const pagePath = path.join(projectsDir, folder, 'page.tsx');
  if (fs.existsSync(pagePath)) {
    let content = fs.readFileSync(pagePath, 'utf8');
    content = content.replace(/import "\.\.\/aegis\/aegis\.css";/g, 'import "../case-study.css";');
    content = content.replace(/import "\.\/aegis\.css";/g, 'import "../case-study.css";');
    content = content.replace(/import "\.\/neurovault\.css";\n/g, '');
    fs.writeFileSync(pagePath, content);
    console.log('Updated imports in', folder);
  }
}
