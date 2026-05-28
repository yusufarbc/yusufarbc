import fs from "fs";
import path from "path";
import { LANGS, type Lang } from "../../../../config/site";
import { getEntriesByLang, getPostSlug, isPostEntry } from "../../../../lib/content";

function getFilesRecursively(dir: string, baseDir: string = dir): Array<{ relativePath: string; absolutePath: string }> {
  let results: Array<{ relativePath: string; absolutePath: string }> = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const absolutePath = path.join(dir, file);
    const stat = fs.statSync(absolutePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(absolutePath, baseDir));
    } else {
      const relativePath = path.relative(baseDir, absolutePath).replace(/\\/g, "/");
      results.push({ relativePath, absolutePath });
    }
  }
  return results;
}

export async function getStaticPaths() {
  const paths = [];
  for (const lang of LANGS) {
    const entries = getEntriesByLang(lang).filter(isPostEntry);
    for (const post of entries) {
      const slug = getPostSlug(post);
      const contentDir = path.join(process.cwd(), "content", post.id.split("/")[0]);

      if (fs.existsSync(contentDir)) {
        const files = getFilesRecursively(contentDir);
        for (const file of files) {
          if (file.relativePath.match(/\.(jpg|jpeg|png|gif|webp|svg|wav|mp3)$/i)) {
            console.log("Generating path for", lang, slug, file.relativePath);
            paths.push({
              params: {
                lang,
                slug,
                image: file.relativePath,
              },
              props: {
                filePath: file.absolutePath,
              },
            });
          }
        }
      }
    }
  }
  return paths;
}

export async function GET({ params, props }: any) {
  console.log("Serving asset:", params.image, props.filePath);
  const ext = path.extname(props.filePath).toLowerCase();
  const mimeTypes: Record<string, string> = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".webp": "image/webp",
    ".svg": "image/svg+xml",
    ".wav": "audio/wav",
    ".mp3": "audio/mpeg",
  };

  return new Response(fs.readFileSync(props.filePath), {
    headers: {
      "Content-Type": mimeTypes[ext] || "application/octet-stream",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
