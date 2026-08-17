import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { test } from "node:test";
import path from "node:path";
import { fileURLToPath } from "node:url";

const assetsRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const requiredBrandAssets = [
  "brand/mark/openfoot-mark.svg",
  "brand/mark/openfoot-mark-inverse.svg",
  "brand/lockup/openfoot-lockup.svg",
  "brand/lockup/openfoot-lockup-inverse.svg",
  "brand/favicon/source.svg",
  "brand/app-icon/source.svg",
  "brand/social/cover.svg",
  "brand/README.md",
  "brand_usage_guide.md"
];
const requiredTokenAssets = [
  "tokens/primitives.json",
  "tokens/semantic-light.json",
  "tokens/semantic-dark.json",
  "tokens/foundations.json",
  "tokens/schema.json",
  "tokens/README.md"
];
const opticalEvidence = [16, 24, 32, 64].map((size) => `brand/evidence/openfoot-mark-${size}.png`);

async function readJson(relativePath) {
  return JSON.parse(await readFile(path.join(assetsRoot, relativePath), "utf8"));
}

function leafPaths(value, prefix = "") {
  return Object.entries(value).flatMap(([key, child]) => {
    const next = prefix ? `${prefix}.${key}` : key;
    return child && typeof child === "object" && !Array.isArray(child)
      ? leafPaths(child, next)
      : [next];
  });
}

function tokenLeaves(value, prefix = "") {
  return Object.entries(value).flatMap(([key, child]) => {
    const next = prefix ? `${prefix}.${key}` : key;
    if (child && typeof child === "object" && !Array.isArray(child) && "value" in child) return [[next, child]];
    return child && typeof child === "object" && !Array.isArray(child) ? tokenLeaves(child, next) : [];
  });
}

test("publishes every canonical design authority", async () => {
  await Promise.all([
    access(path.join(assetsRoot, "DESIGN.md")),
    access(path.join(assetsRoot, "brand/manifest.json")),
    access(path.join(assetsRoot, "tokens/foundations.json")),
    access(path.join(assetsRoot, "tokens/semantic.light.json")),
    access(path.join(assetsRoot, "tokens/semantic.dark.json")),
    access(path.join(assetsRoot, "tokens/components.json"))
  ]);
});

test("publishes every asset and token required by the approved specifications", async () => {
  await Promise.all([...requiredBrandAssets, ...requiredTokenAssets].map((relativePath) =>
    access(path.join(assetsRoot, relativePath))
  ));
});

test("keeps canonical marks transparent and every SVG locally safe", async () => {
  const svgPaths = requiredBrandAssets.filter((relativePath) => relativePath.endsWith(".svg"));
  for (const relativePath of svgPaths) {
    const source = await readFile(path.join(assetsRoot, relativePath), "utf8");
    assert.match(source, /^<svg[^>]+viewBox=/, relativePath);
    assert.doesNotMatch(source, /<(?:script|foreignObject)\b|\bon\w+=|(?:href|src)=["'](?:https?:|data:)/i, relativePath);
    if (relativePath.includes("brand/mark/")) {
      assert.doesNotMatch(source, /<rect\b/i, `${relativePath} must not contain a background`);
    }
  }
});

test("publishes recognizable-size raster evidence with exact dimensions", async () => {
  for (const [index, relativePath] of opticalEvidence.entries()) {
    const bytes = await readFile(path.join(assetsRoot, relativePath));
    assert.equal(bytes.subarray(1, 4).toString(), "PNG", relativePath);
    const expected = [16, 24, 32, 64][index];
    assert.equal(bytes.readUInt32BE(16), expected, `${relativePath} width`);
    assert.equal(bytes.readUInt32BE(20), expected, `${relativePath} height`);
  }
});

test("keeps light and dark semantic token paths identical", async () => {
  const light = await readJson("tokens/semantic.light.json");
  const dark = await readJson("tokens/semantic.dark.json");

  assert.deepEqual(leafPaths(light).sort(), leafPaths(dark).sort());
});

test("keeps every canonical token leaf typed and documented", async () => {
  for (const relativePath of ["tokens/primitives.json", "tokens/semantic-light.json", "tokens/semantic-dark.json"]) {
    const document = await readJson(relativePath);
    assert.equal(document.version, "1.0.0", relativePath);
    assert.match(document.reviewed, /^\d{4}-\d{2}-\d{2}$/, relativePath);
    const leaves = tokenLeaves(document.tokens);
    assert.ok(leaves.length > 0, `${relativePath} token leaves`);
    for (const [tokenPath, token] of leaves) {
      assert.ok(["color", "dimension", "duration", "fontFamily", "string"].includes(token.type), `${relativePath}:${tokenPath} type`);
      assert.equal(typeof token.description, "string", `${relativePath}:${tokenPath} description`);
      assert.ok(token.description.trim().length > 0, `${relativePath}:${tokenPath} description`);
      assert.notEqual(token.value, undefined, `${relativePath}:${tokenPath} value`);
    }
  }
});

test("publishes a recursive schema for canonical token documents", async () => {
  const schema = await readJson("tokens/schema.json");
  assert.equal(schema.properties.tokens.$ref, "#/$defs/tokenGroup");
  assert.deepEqual(schema.$defs.token.required, ["value", "type", "description"]);
  assert.equal(schema.$defs.token.additionalProperties, false);
});

test("declares existing brand derivatives with valid sha256 checksums", async () => {
  const manifest = await readJson("brand/manifest.json");
  assert.equal(manifest.version, "1.0.0");
  assert.ok(manifest.assets.length >= 4);

  for (const asset of manifest.assets) {
    const bytes = await readFile(path.join(assetsRoot, asset.path));
    const checksum = createHash("sha256").update(bytes).digest("hex");
    assert.equal(asset.sha256, checksum, asset.path);
    assert.ok(asset.purpose);
    assert.ok(asset.classification);
    assert.ok(asset.sourceRevision);
    assert.ok(Number.isInteger(asset.width) && asset.width > 0, `${asset.path} width`);
    assert.ok(Number.isInteger(asset.height) && asset.height > 0, `${asset.path} height`);
  }

  for (const requiredPath of requiredBrandAssets.filter((relativePath) => relativePath.endsWith(".svg"))) {
    assert.ok(manifest.assets.some((asset) => asset.path === requiredPath), requiredPath);
  }
});

test("documents the approved identity and message hierarchy", async () => {
  const design = await readFile(path.join(assetsRoot, "DESIGN.md"), "utf8");

  assert.match(design, /Floodlight Volt/);
  assert.match(design, /Run the club\. Shape the game\./);
  assert.match(design, /The open football manager\./);
  assert.match(design, /Play OpenFoot/);
  assert.match(design, /Explore the Studio/);
});
