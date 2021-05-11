const fs = require("fs");

const root = `${__dirname}/..`;
const buildDir = `${root}/dist/`;
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir);
}

const translations = [];
for (const filename of fs.readdirSync(`${root}/translations`)) {
  const { translations } = require(`${root}/translations/${filename}`, "utf-8");
  translations.push(...translations);
}
fs.writeFileSync(`${buildDir}/translations.json`, JSON.stringify(translations));

const technologies = [];
for (const filename of fs.readdirSync(`${root}/technologies`)) {
  technologies.push(require(`${root}/technologies/${filename}`, "utf-8"));
}
fs.writeFileSync(`${buildDir}/technologies.json`, JSON.stringify(technologies));
