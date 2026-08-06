import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { GITHUB_CACHE_FILE, GITHUB_CACHE_TTL_MS } from './github.constants';
import type { CachedGitHubData, GitHubPortfolioData } from './github.types';

const cachePath = resolve(process.cwd(), GITHUB_CACHE_FILE);

export async function readGitHubCache(): Promise<GitHubPortfolioData | null> {
  try {
    const cached = JSON.parse(await readFile(cachePath, 'utf8')) as CachedGitHubData;
    const age = Date.now() - new Date(cached.savedAt).getTime();
    return age >= 0 && age < GITHUB_CACHE_TTL_MS && cached.data.profile ? cached.data : null;
  } catch {
    return null;
  }
}

export async function writeGitHubCache(data: GitHubPortfolioData): Promise<void> {
  try {
    await mkdir(dirname(cachePath), { recursive: true });
    await writeFile(cachePath, JSON.stringify({ savedAt: new Date().toISOString(), data }), 'utf8');
  } catch {
    // Builds on read-only hosts continue using the in-memory cache.
  }
}
