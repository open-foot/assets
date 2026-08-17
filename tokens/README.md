# OpenFoot design tokens

`primitives.json` owns raw choices. `semantic-light.json` and
`semantic-dark.json` expose matching role paths. `foundations.json` and
`components.json` remain portable adapter inputs for existing consumers.

Every new canonical token leaf carries a value, type, and description. Product
components consume semantic roles; they do not copy primitive values.
