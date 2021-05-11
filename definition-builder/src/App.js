import React, { useState } from "react";
import Form from "react-jsonschema-form";
import definition from "@weglot/definitions/schemas/definition.schema.json";

import Editor from "./Editor";
import { resolveRefs } from "./utils";

export default function App() {
  const [formData, setFormData] = useState({});

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <Editor formData={formData} onChange={setFormData} />
        </div>
        <div className="col-md-6 col-sm-12">
          <Form
            schema={resolveRefs(definition)}
            onChange={({ formData }) => setFormData(formData)}
            formData={formData}
          />
        </div>
      </div>
    </div>
  );
}
