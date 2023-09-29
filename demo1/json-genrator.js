const fs = require("fs");
const path = require("path");

// Define the source directory containing your HTML templates
const sourceDir = "src/app";

// Function to extract static text from HTML files
function extractTextFromHTML(filePath) {
  const fileContent = fs.readFileSync(filePath, "utf8");
  const staticText = fileContent.match(/'([^']+)'/g);
  return staticText ? staticText.map((text) => text.replace(/'/g, "")) : [];
}

// Function to generate a translation JSON file
function generateTranslationJSON(staticTextArray) {
  const translationObject = {};
  staticTextArray.forEach((text) => {
    translationObject[text] = ""; // You can manually add translations here
  });
  const jsonContent = JSON.stringify(translationObject, null, 2);
  fs.writeFileSync("translation.json", jsonContent);
  console.log("Translation JSON file generated.");
}

// Function to modify the Angular component to use translations
function modifyAngularComponent(filePath) {
  const fileContent = fs.readFileSync(filePath, "utf8");
  const modifiedContent = fileContent.replace(
    /'([^']+)'/g,
    "this.translateText('$1')"
  );
  fs.writeFileSync(filePath, modifiedContent);
  console.log("Angular component modified to use translations.");
}

// Get a list of HTML files in the source directory
const htmlFiles = fs
  .readdirSync(sourceDir)
  .filter((file) => file.endsWith(".html"));

// Extract static text from HTML files
const staticTextArray = [];
htmlFiles.forEach((htmlFile) => {
  const filePath = path.join(sourceDir, htmlFile);
  const textArray = extractTextFromHTML(filePath);
  staticTextArray.push(...textArray);
});

// Generate the translation JSON file
generateTranslationJSON(staticTextArray);

// Modify the Angular component
const componentFilePath = path.join(
  sourceDir,
  "modules/apps/chat/group-chat/group-chat.component.html"
); // Replace with your component file path
modifyAngularComponent(componentFilePath);
