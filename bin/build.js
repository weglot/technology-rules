const fs = require("fs");

const root = `${__dirname}/..`;
const buildDir = `${root}/dist/`;
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir);
}

for (const type of ["translations", "urls", "origins", "proxy"]) {
  const acc = [];
  for (const filename of fs.readdirSync(`${root}/rules/${type}`)) {
    const rules = require(`${root}/rules/${type}/${filename}`, "utf-8");
    acc.push(rules);
  }
  fs.writeFileSync(`${buildDir}/${type}.json`, JSON.stringify(acc));
}

const serverTechnologies = [];
const clientTechnologies = [];
for (const filename of fs.readdirSync(`${root}/rules/technologies`)) {
  if (filename.includes(".server.json")) {
    serverTechnologies.push(
      require(`${root}/rules/technologies/${filename}`, "utf-8")
    );
    continue;
  }
  clientTechnologies.push(
    require(`${root}/rules/technologies/${filename}`, "utf-8")
  );
}
fs.writeFileSync(
  `${buildDir}/technologies.server.json`,
  JSON.stringify(serverTechnologies)
);
fs.writeFileSync(
  `${buildDir}/technologies.client.json`,
  JSON.stringify(clientTechnologies)
);
