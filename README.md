# Weglot Technology Rules

This repo brings Weglot's rules to be able to translate common technologies. A
rule can be applied on a specific document type like a JSON, on a specific
technology like Wix, on a specific path, hostname, header, etc. to define what
and how we could translate as accurately as possible a resource to users.

## Tech

This is a Yarn workspace with two separated packages:

- `@weglot/technology-rules`: published technology rules on Github registry
- `rules-builder`: a React.js app to visually edit JSON Schemas,
[published on Github pages](https://weglot.github.io/technology-rules/)

We are using [JSON Schemas](https://json-schema.org/) to write and validate
consistent rules, automatically tested with [ajv](https://ajv.js.org/) tool.

These rules are currently used on more than 6k+ websites translated with Weglot.

## Setup

```sh
git clone https://github.com/weglot/technology-rules.git
cd technology-rules
yarn
```


