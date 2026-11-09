import fs from 'node:fs/promises';
import { createClient } from '@supabase/supabase-js';

// Node scripts do not automatically read Next.js .env.local. Load simple KEY=VALUE
// lines here without adding a runtime dependency; shell/Vercel variables take priority.
try {
  const envText = await fs.readFile('.env.local', 'utf8');
  for (const line of envText.split(/\r?\n/)) {
    const match = line.match(/^\s*(?:export\s+)?([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (!match || process.env[match[1]]) continue;
    let value = match[2];
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
    else value = value.replace(/\s+#.*$/, '');
    process.env[match[1]] = value.replace(/\\n/g, '\n');
  }
} catch { /* Environment may be supplied by the shell or deployment. */ }

const file = process.argv[2] || 'scripts/automatex-course-bank.json';
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
if (!url || !key) throw new Error('Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local or the shell.');
const bank = JSON.parse(await fs.readFile(file, 'utf8'));
for (const [keyName, expected] of Object.entries({ modules: 8, lessons: 40, questions: 184, exam_questions: 60, placement_questions: 10 })) {
  if (!Array.isArray(bank[keyName]) || bank[keyName].length !== expected) throw new Error(`Refusing import: ${keyName} must contain ${expected} records.`);
}
const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } });
const { data, error } = await supabase.rpc('ax_import_course_bank', { p_bank: bank });
if (error) throw new Error(`Atomic course import failed: ${error.message}`);
console.log('Automate-X bank imported successfully:', data);
