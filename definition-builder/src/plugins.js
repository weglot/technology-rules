import React from "react";
import jp from "jsonpath";
import _merge from "lodash/merge";

import Editor from "./Editor";

import commonSchema from "../schemas/common.schema.json";

const generateSchema = (rawSchema) => {
  const newSchema = Object.assign({}, rawSchema);
  jp.apply(newSchema, "$..['$ref']", (valueMatched) =>
    valueMatched.replace("common.schema.json", "")
  );
  return _merge(newSchema, {
    definitions: commonSchema.definitions,
  });
};

const fromJson = (json) => JSON.parse(json);
const toJson = (val) => JSON.stringify(val, null, 2);

const ObjectJSONWidget = (props) => {
  console.log("HI THERE");
  return (
    <Editor
      title="Plugin JSON definition"
      code={toJson(props.value)}
      onChange={(event) => props.onChange(fromJson(event.target.value))}
    />
  );
};

const defaultValues = {
  uiSchema: {
    $schema: { "ui:widget": "hidden" },
    htmlPaths: {
      "ui:options": {
        orderable: false,
      },
    },
    condition: {
      "ui:options": {
        orderable: false,
      },
    },
    proxyHosts: {
      "ui:options": {
        orderable: false,
      },
    },
    textPaths: {
      "ui:options": {
        orderable: false,
      },
      items: {
        value: {
          "ui:options": {
            orderable: false,
          },
        },
      },
    },
    htmlActions: {
      "ui:options": {
        orderable: false,
      },
      items: {
        conditions: {
          "ui:options": {
            orderable: false,
          },
        },
        actions: {
          "ui:options": {
            orderable: false,
          },
          items: {
            arg: {
              "ui:widget": ObjectJSONWidget,
            },
          },
        },
      },
    },
  },
};

const settings = {};

export default settings;
