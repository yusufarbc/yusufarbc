import { marked } from "marked";
import YAML from "yaml";
import type { Lang } from "../config/site";

export interface ContentEntry {
  lang: Lang;
  id: string;
  slug: string;
  data: Record<string, any>;
  body: string;
}

export type EntryType = "posts" | "writeups";

const localizedMarkdownFiles = import.meta.glob("../../content/*/{tr,en}.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

const baseUrl = import.meta.env.BASE_URL ?? "/";

function prefixBaseUrl(path: string): string {
  if (!path.startsWith("/")) {
    return path;
  }

  if (baseUrl === "/") {
    return path;
  }

  return `${baseUrl.replace(/\/$/, "")}${path}`;
}

export function isLang(value: string): value is Lang {
  return value === "tr" || value === "en";
}

function sanitizeYaml(raw: string): string {
  return raw.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
}

function parseFrontmatter(source: string): { data: Record<string, any>; body: string } {
  const normalized = source.replace(/^\uFEFF/, "");
  const match = normalized.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?([\s\S]*)$/);
  if (match) {
    const frontmatter = sanitizeYaml(match[1]);
    const body = match[2].trim();
    try {
      const parsed = YAML.parse(frontmatter);
      return { data: parsed && typeof parsed === "object" ? parsed : {}, body };
    } catch {
      return { data: {}, body: normalized };
    }
  }
  return { data: {}, body: normalized };
}

function isTrue(value: unknown): boolean {
  return value === true || value === "true";
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .replace(/-{2,}/g, "-");
}

function readTitle(markdown: string): string {
  const line = markdown
    .split(/\r?\n/)
    .find((item) => item.trim().startsWith("# "))
    ?.replace(/^#\s+/, "")
    .trim();
  return line ?? "Untitled";
}

function readDescription(markdown: string): string {
  const lines = markdown.split(/\r?\n/).map((line) => line.trim());
  for (const line of lines) {
    if (!line) continue;
    if (line.startsWith("#")) continue;
    if (line.startsWith("![](")) continue;
    if (line === "---") continue;
    if (/^\[(.*?)\]\(.*\)$/.test(line)) continue;
    return line;
  }
  return "";
}

function readFeaturedImage(markdown: string, frontmatter: Record<string, any>): string | undefined {
  const directValue = frontmatter.featuredImage ?? frontmatter.coverImage ?? frontmatter.image;
  if (typeof directValue === "string" && directValue.trim()) {
    return directValue.trim();
  }

  const imageMatch = markdown.match(/!\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/);
  return imageMatch?.[1];
}
function parseLocalizedFileMeta(path: string): {
  lang: Lang;
  bucket: string;
} | null {
  const normalized = path.replace(/\\/g, "/");
  const pathMatch = normalized.match(/\/content\/([^/]+)\/(tr|en)\.md$/);
  if (!pathMatch) {
    return null;
  }

  return { bucket: pathMatch[1], lang: pathMatch[2] as Lang };
}

function extractDateFromSlug(slug: string): string | undefined {
  const dateMatch = slug.match(/(\d{4}-\d{2}-\d{2})/);
  return dateMatch?.[1];
}
function dedupeEntries(entries: ContentEntry[]): ContentEntry[] {
  const byKey = new Map<string, ContentEntry>();
  for (const entry of entries) {
    const key = `${entry.lang}:${slugify(String(entry.data.title ?? ""))}:${String(entry.data.date ?? "")}`;
    if (!byKey.has(key)) {
      byKey.set(key, entry);
    }
  }

  return [...byKey.values()];
}

function toContentEntry(path: string, markdown: string): ContentEntry | null {
  const meta = parseLocalizedFileMeta(path);
  if (!meta) {
    return null;
  }

  if (meta.bucket === "about" || meta.bucket === "projects") {
    return null;
  }

  const parsed = parseFrontmatter(markdown);
  const frontmatter = parsed.data && typeof parsed.data === "object" ? parsed.data : {};
  const body = parsed.body.trim() || markdown;

  const title = typeof frontmatter.title === "string" && frontmatter.title.trim() ? frontmatter.title.trim() : readTitle(body);
  const description =
    typeof frontmatter.description === "string" && frontmatter.description.trim()
      ? frontmatter.description.trim()
      : readDescription(body);
  const slug = slugify(meta.bucket) || slugify(title);
  const date =
    (typeof frontmatter.date === "string" && frontmatter.date.trim() ? frontmatter.date.trim() : undefined) ??
    extractDateFromSlug(meta.bucket);
  const draft = isTrue(frontmatter.draft);
  const entryType: EntryType =
    frontmatter.type === "writeups" || frontmatter.type === "writeup" ? "writeups" : "posts";

  const rawFeaturedImage = readFeaturedImage(body, frontmatter);
  let resolvedFeaturedImage: string | undefined = undefined;

  if (rawFeaturedImage) {
    if (rawFeaturedImage.startsWith("http://") || rawFeaturedImage.startsWith("https://") || rawFeaturedImage.startsWith("//")) {
      resolvedFeaturedImage = rawFeaturedImage;
    } else if (rawFeaturedImage.startsWith("/")) {
      resolvedFeaturedImage = prefixBaseUrl(rawFeaturedImage);
    } else {
      // Relative to post folder
      resolvedFeaturedImage = prefixBaseUrl(`/${meta.lang}/blog/${slug}/${rawFeaturedImage}`);
    }
  }

  const rawAudioFile = frontmatter.audioFile || frontmatter.audio;
  let resolvedAudioFile: string | undefined = undefined;

  if (typeof rawAudioFile === "string" && rawAudioFile.trim()) {
    const audio = rawAudioFile.trim();
    if (audio.startsWith("http://") || audio.startsWith("https://") || audio.startsWith("//")) {
      resolvedAudioFile = audio;
    } else if (audio.startsWith("/")) {
      resolvedAudioFile = prefixBaseUrl(audio);
    } else {
      resolvedAudioFile = prefixBaseUrl(`/${meta.lang}/blog/${slug}/${audio}`);
    }
  }

  return {
    lang: meta.lang,
    id: `${meta.bucket}/${meta.lang}.md`,
    slug,
    data: {
      title,
      description,
      date,
      featuredImage: resolvedFeaturedImage,
      audioFile: resolvedAudioFile,
      type: entryType,
      draft,
    },
    body,
  };
}

const contentEntries: ContentEntry[] = dedupeEntries(
  Object.entries(localizedMarkdownFiles)
  .map(([path, raw]) => toContentEntry(path, raw))
  .filter((entry): entry is ContentEntry => Boolean(entry)),
);

interface StaticPage {
  title?: string;
  description?: string;
  body: string;
}

const staticPages: Record<string, StaticPage> = {};
for (const [path, raw] of Object.entries(localizedMarkdownFiles)) {
  const meta = parseLocalizedFileMeta(path);
  if (!meta) {
    continue;
  }
  if (meta.bucket !== "about" && meta.bucket !== "projects") {
    continue;
  }

  const parsed = parseFrontmatter(raw);
  staticPages[`${meta.lang}:${meta.bucket}`] = {
    title: typeof parsed.data.title === "string" ? parsed.data.title : undefined,
    description: typeof parsed.data.description === "string" ? parsed.data.description : undefined,
    body: parsed.body,
  };
}

export function parseDate(value: unknown): Date {
  if (value instanceof Date) {
    return value;
  }
  if (typeof value === "string") {
    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) {
      return date;
    }
  }
  return new Date(0);
}

export function formatDate(value: unknown, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === "tr" ? "tr-TR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(parseDate(value));
}

export function isDraft(entry: ContentEntry): boolean {
  return isTrue(entry.data.draft);
}

export function sortByDateDesc<T extends ContentEntry>(entries: T[]): T[] {
  return [...entries].sort(
    (a, b) => parseDate(b.data.date).getTime() - parseDate(a.data.date).getTime(),
  );
}

export function getPostSlug(entry: ContentEntry): string {
  return entry.slug;
}

export function isPostEntry(entry: ContentEntry): boolean {
  return entry.data.type === "posts";
}

export function isWriteupEntry(entry: ContentEntry): boolean {
  return entry.data.type === "writeups";
}

export function isSeriesIndexEntry(entry: ContentEntry): boolean {
  return false;
}

export function getSeriesSlug(entry: ContentEntry): string {
  return entry.slug;
}

export function getStandalonePageId(page: "about" | "projects"): string {
  return `${page}.md`;
}

export function getEntriesByLang(lang: Lang): ContentEntry[] {
  return contentEntries.filter((entry) => entry.lang === lang && !isDraft(entry));
}

export function getStaticPage(lang: Lang, page: "about" | "projects"): StaticPage | null {
  return staticPages[`${lang}:${page}`] ?? null;
}

export function renderMarkdown(markdown: string): string {
  const rendered = marked.parse(markdown, { gfm: true, breaks: true }) as string;

  return rendered.replace(/(src|href)=(['"])(\/(?!\/)[^'"]+)\2/g, (_match, attribute, quote, path) => {
    return `${attribute}=${quote}${prefixBaseUrl(path)}${quote}`;
  });
}

export function resolveAssetPath(path: string): string {
  return prefixBaseUrl(path);
}