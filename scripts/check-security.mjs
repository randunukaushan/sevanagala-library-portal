import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";

const versions = new Set();
for (const name of readdirSync("supabase/migrations").filter((name) => name.endsWith(".sql"))) {
  const version = name.match(/^([0-9]+)_/)?.[1];
  assert(version, `Invalid migration filename: ${name}`);
  assert(!versions.has(version), `Duplicate migration version: ${version}`);
  versions.add(version);
}
const manifest = JSON.parse(readFileSync("package.json", "utf8"));
const lock = JSON.parse(readFileSync("package-lock.json", "utf8"));
assert.equal(lock.packages[""].dependencies.next, manifest.dependencies.next);
assert.equal(lock.packages["node_modules/next"].version, manifest.dependencies.next);
for (const file of ["app/admin/needs/actions.ts", "app/admin/partnerships/actions.ts"]) {
  const source = readFileSync(file, "utf8");
  assert(source.includes('staff.status === "mfa_required"'), `Missing MFA action gate: ${file}`);
  for (const match of source.matchAll(/\.update\([\s\S]*?\.maybeSingle\(\);/g)) {
    assert(match[0].includes('.select("id")'), `Update must return an affected row: ${file}`);
  }
  assert(!/const \{ error \} = await supabase\s*\.from\([^)]*\)\s*\.update/.test(source),
    `Update lacks affected-row check: ${file}`);
}
assert(readFileSync("lib/supabase/staff.ts", "utf8").includes('claims?.aal !== "aal2"'));
console.log("Security source/lockfile/migration checks passed.");
