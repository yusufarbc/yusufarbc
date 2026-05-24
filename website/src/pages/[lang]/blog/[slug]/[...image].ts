import fs from "fs";
import path from "path";
import { LANGS, type Lang } from "../../../../config/site";
import { getEntriesByLang, getPostSlug, isPostEntry } from "../../../../lib/content";

export async function getStaticPaths() {
  const paths = [];
  for (const lang of LANGS) {
    const entries = getEntriesByLang(lang).filter(isPostEntry);
    for (const post of entries) {
      const slug = getPostSlug(post);
      const contentDir = path.join(process.cwd(), "content", post.id.split("/")[0]);

      if (fs.existsSync(contentDir)) {
        const files = fs.readdirSync(contentDir);
        for (const file of files) {
          if (file.match(/\.(jpg|jpeg|png|gif|webp|svg|wav|mp3)$/i)) {
            console.log("Generating path for", lang, slug, file);
            paths.push({
              params: {
                lang,
                slug,
                image: file,
              },
              props: {
                filePath: path.join(contentDir, file),
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
