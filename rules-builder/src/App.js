import React, { useState } from "react";
import Form from "react-jsonschema-form";
import translations from "@weglot/technology-rules/schemas/translations.schema.json";

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
            schema={resolveRefs(translations)}
            onChange={({ formData }) => setFormData(formData)}
            formData={formData}
          />
        </div>
      </div>
    </div>
  );
}
