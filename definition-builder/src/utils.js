import jp from "jsonpath";

import common from "@weglot/definitions/schemas/common.schema.json";
import condition from "@weglot/definitions/schemas/condition.schema.json";

export function resolveRefs(schema) {
  const refs = { common, condition };
  jp.apply(schema, "$..['$ref']", (matched) => {
    const schemas = Object.keys(refs);
    const regex = new RegExp(`(${schemas.join("|")}).schema.json`, "g");
    return matched.replace(regex, "");
  });
  Object.assign(schema.definitions, common.definitions, condition.definitions);
  return schema;
}
