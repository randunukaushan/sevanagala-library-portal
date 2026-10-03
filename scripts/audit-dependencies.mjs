import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";

if (!process.env.npm_execpath) throw new Error("Run this check through npm run security:dependencies.");
const result = spawnSync(process.execPath, [process.env.npm_execpath, "audit", "--json"], {
  encoding: "utf8",
  maxBuffer: 10 * 1024 * 1024,
});
if (result.error) throw result.error;
const report = JSON.parse(result.stdout);
if (report.error || !report.vulnerabilities || !report.metadata) {
  throw new Error("Dependency audit unavailable; failing closed.");
}
const packages = JSON.parse(readFileSync("package-lock.json", "utf8")).packages;
const vulnerabilities = report.vulnerabilities;
const advisory = "https://github.com/advisories/GHSA-vfj7-8cjw-p6xm";
// Temporary, explicit exception for unpatched, dev-only braces and its parents.
// New advisories or production exposure must never be hidden by this exception.
const reviewDeadline = Date.parse("2026-10-18T00:00:00Z");
function knownBuildOnlyChain(name, visited = new Set()) {
  const vulnerability = vulnerabilities[name];
  if (!vulnerability || visited.has(name) || !vulnerability.nodes?.length) return false;
  if (!vulnerability.nodes.every((path) => packages[path]?.dev === true)) return false;
  const next = new Set(visited).add(name);
  return vulnerability.via.length > 0 && vulnerability.via.every((via) =>
    typeof via === "string" ? knownBuildOnlyChain(via, next) : via.url === advisory);
}
let blocked = false;
for (const [name, vulnerability] of Object.entries(vulnerabilities)) {
  if (!["high", "critical"].includes(vulnerability.severity)) continue;
  if (Date.now() < reviewDeadline && knownBuildOnlyChain(name)) {
    console.warn(`KNOWN OPEN BUILD-ONLY RISK: ${name}; braces exception expires 2026-10-18.`);
  } else {
    console.error(`BLOCKED: ${name} (${vulnerability.severity}); requires review/remediation.`);
    blocked = true;
  }
}
if (blocked) process.exitCode = 1;
else console.log("No unreviewed high/critical dependency vulnerabilities.");
