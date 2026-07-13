import { createHash } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';
import { publicFiles } from './public-files.mjs';

const root = new URL('../', import.meta.url);
const output = new URL('../dist/', import.meta.url);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const headers = await readFile(new URL('_headers', root), 'utf8');
const csp = headers.match(/^\s*Content-Security-Policy:\s*(.+)$/m)?.[1] ?? '';

for (const directive of [
  "default-src 'none'",
  "base-uri 'none'",
  'form-action https://formsubmit.co',
  "frame-ancestors 'none'",
  "object-src 'none'",
  "style-src 'self'"
]) {
  assert(csp.includes(directive), `CSP is missing: ${directive}`);
}
assert(!csp.includes("'unsafe-inline'"), 'CSP must not allow unsafe inline code.');
assert(!csp.includes("'unsafe-eval'"), 'CSP must not allow eval.');
assert(headers.includes('Strict-Transport-Security: max-age=31536000'), 'HSTS is missing.');
assert(headers.includes('X-Frame-Options: DENY'), 'Clickjacking protection is missing.');

const htmlFiles = ['index.html', 'window-cleaning.html', 'about.html', 'contact.html'];
for (const file of htmlFiles) {
  const html = await readFile(new URL(file, root), 'utf8');
  assert(!/\sstyle=/i.test(html), `${file} contains an inline style.`);
  assert(!/\b(?:http):\/\//i.test(html), `${file} contains an insecure HTTP URL.`);
}

const index = await readFile(new URL('index.html', root), 'utf8');
const jsonLd = index.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
assert(jsonLd, 'JSON-LD block is missing.');
const jsonLdHash = createHash('sha256').update(jsonLd).digest('base64');
assert(csp.includes(`'sha256-${jsonLdHash}'`), 'CSP JSON-LD hash does not match index.html.');

const contact = await readFile(new URL('contact.html', root), 'utf8');
assert(/<form action="https:\/\/formsubmit\.co\//.test(contact), 'The form action must use FormSubmit over HTTPS.');
assert(!/name="_captcha"\s+value="false"/.test(contact), 'reCAPTCHA must not be disabled.');
assert(/name="_honey"/.test(contact), 'The spam honeypot is missing.');
for (const [field, length] of [['name', 100], ['email', 254], ['phone', 30], ['address', 200], ['notes', 2000]]) {
  assert(new RegExp(`id="${field}"[^>]*maxlength="${length}"`).test(contact), `${field} must have maxlength=${length}.`);
}

const securityTxt = await readFile(new URL('.well-known/security.txt', root), 'utf8');
const rootSecurityTxt = await readFile(new URL('security.txt', root), 'utf8');
for (const field of ['Contact:', 'Expires:', 'Canonical:']) {
  assert(securityTxt.includes(field), `security.txt is missing ${field}`);
}
assert(rootSecurityTxt === securityTxt, 'Root and well-known security.txt files must match.');
const redirects = await readFile(new URL('_redirects', root), 'utf8');
assert(redirects.includes('/.well-known/security.txt /security.txt 200'), 'security.txt proxy redirect is missing.');

const deployed = await readdir(output, { recursive: true });
const normalizedDeployed = deployed.map((entry) => entry.replaceAll('\\', '/'));
for (const forbidden of ['.git', 'README.md', 'mint-website-form-ready.zip', 'package.json', 'scripts']) {
  assert(!normalizedDeployed.some((entry) => entry === forbidden || entry.startsWith(`${forbidden}/`)), `Forbidden deployment content found: ${forbidden}`);
}
for (const file of publicFiles) {
  assert(normalizedDeployed.includes(file), `Allowlisted deployment file is missing: ${file}`);
}
assert(normalizedDeployed.filter((entry) => entry !== '.well-known').length === publicFiles.length, 'Unexpected file found in deployment output.');

console.log('Security checks passed.');
