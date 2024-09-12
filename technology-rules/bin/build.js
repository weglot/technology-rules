const fs = require("fs");

const root = `${__dirname}/..`;
const buildDir = `${root}/dist/`;
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir);
}

for (const type of ["translations", "urls", "origins", "proxy"]) {
  const acc = [];
  for (const filename of fs.readdirSync(`${root}/${type}`)) {
    const rules = require(`${root}/${type}/${filename}`, "utf-8");
    acc.push(...rules[type]);
  }
  fs.writeFileSync(`${buildDir}/${type}.json`, JSON.stringify(acc));
}

const technologies = [];
for (const filename of fs.readdirSync(`${root}/technologies`)) {
  technologies.push(require(`${root}/technologies/${filename}`, "utf-8"));
}
fs.writeFileSync(`${buildDir}/technologies.json`, JSON.stringify(technologies));
