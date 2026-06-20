export const LANGS = ["tr", "en"] as const;
export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = "tr";

export const SITE = {
  title: "yusufarbc.dev",
  author: "Yusuf Talha ARABACI",
  url: "https://yusufarbc.dev",
  avatar: "/images/profile.jpeg",
  ogImage: "/images/profile.jpeg",
  info: {
    tr: "Software & Security Engineer | Digital Sovereignty • Cloud-Native • Open Source • Data Privacy • Next-Gen SOC • Endpoint Protection • Network Defense",
    en: "Software & Security Engineer | Digital Sovereignty • Cloud-Native • Open Source • Data Privacy • Next-Gen SOC • Endpoint Protection • Network Defense",
  },
  description: {
    tr: "Yazılım & Güvenlik Mühendisi, altyapı yönetimi, güvenli tasarım mimarileri ve açık kaynak kurumsal çözümler üzerine çalışır.",
    en: "Software & Security Engineer specializing in infrastructure management, secure-by-design architectures, and open-source enterprise solutions.",
  },
  socials: [
    {
      name: "Github",
      icon: "fa-brands fa-github",
      url: "https://github.com/yusufarbc/",
    },
    {
      name: "LinkedIn",
      icon: "fa-brands fa-linkedin",
      url: "https://www.linkedin.com/in/yusufarbc/",
    },
    {
      name: "Mastodon",
      icon: "fa-brands fa-mastodon",
      url: "https://infosec.exchange/@yusufarbc",
    },
    {
      name: "Email",
      icon: "fa-solid fa-envelope",
      url: "mailto:yusuftalhaarabaci@hotmail.com",
    },
  ],
};

export const MENU: Record<Lang, Array<{ label: string; href: string; external?: boolean }>> = {
  tr: [
    { label: "Blog", href: "/tr/blog/" },
    { label: "Write-up", href: "/tr/writeups/" },
    { label: "Projeler", href: "/tr/projects/" },
    { label: "Hakkımda", href: "/tr/about/" },
    { label: "İletişim", href: "mailto:yusuftalhaarabaci@hotmail.com", external: true },
  ],
  en: [
    { label: "Blog", href: "/en/blog/" },
    { label: "Write-ups", href: "/en/writeups/" },
    { label: "Projects", href: "/en/projects/" },
    { label: "About", href: "/en/about/" },
    { label: "Contact", href: "mailto:yusuftalhaarabaci@hotmail.com", external: true },
  ],
};