const Ajv = require("ajv/dist/2020");
const fs = require("fs");

const ajv = new Ajv({ allError: true });

ajv.addKeyword("translations");
ajv.addKeyword("slugs");
ajv.addKeyword("condition");
ajv.addKeyword("technology_id");
ajv.addKeyword("hostnameReplacements");
ajv.addKeyword("proxyHosts");
ajv.addKeyword("settings");

const root = `${__dirname}/..`;
fs.readdirSync(`${root}/schemas/`)
  .map((file) => [file, require(`${root}/schemas/${file}`)])
  .map(([file, schema]) => ajv.addSchema(schema, `../schemas/${file}`));

for (const schema of ["translations", "technologies", "slugs"]) {
  for (const filename of fs.readdirSync(`${root}/${schema}`)) {
    const definition = require(`${root}/${schema}/${filename}`, "utf-8");
    const valid = ajv.validate(definition);
    if (!valid) {
      console.log(`invalid schema: ${filename}`);
      throw valid;
    }
  }
}
