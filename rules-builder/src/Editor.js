import React, { useEffect, useState } from "react";
import { UnControlled as CodeMirror } from "react-codemirror2";
import "codemirror/mode/javascript/javascript";
import "codemirror/lib/codemirror.css";

const cmOptions = {
  theme: "default",
  height: "auto",
  viewportMargin: Infinity,
  mode: {
    name: "javascript",
    json: true,
    statementIndent: 2,
  },
  lineNumbers: true,
  lineWrapping: true,
  indentWithTabs: false,
  tabSize: 2,
};

export default function Editor({ formData, onChange }) {
  const [schema, setSchema] = useState("");
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const data = JSON.stringify(formData, null, 2);
    if (schema !== data) {
      setSchema(data);
      setValid(true);
    }
  }, [formData]);

  const onEdit = (code) => {
    try {
      const parsed = JSON.parse(code);
      setValid(true);
      if (onChange) {
        onChange(parsed);
      }
    } catch (e) {
      setValid(false);
    }
  };

  const cls = valid ? "valid" : "invalid";
  const icon = valid ? "ok" : "remove";

  return (
    <div className="panel panel-default">
      <div className="panel-heading">
        <span className={`${cls} glyphicon glyphicon-${icon}`} /> &nbsp;Schema
      </div>
      <CodeMirror
        value={schema}
        autoCursor={false}
        options={cmOptions}
        onChange={(cm, meta, code) => code !== schema && onEdit(code)}
      />
    </div>
  );
}