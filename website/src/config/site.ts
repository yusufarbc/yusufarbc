export const LANGS = ["tr", "en"] as const;
export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = "tr";

export const SITE = {
  title: "yusufarbc.dev",
  author: "Yusuf Talha ARABACI",
  avatar: "/images/profile.jpeg",
  info: {
    tr: "BT ve Güvenlik Mühendisi",
    en: "Software & Security Engineer",
  },
  description:
    "Software & Security Engineer specializing in infrastructure management, secure-by-design architectures, and open-source enterprise solutions.",
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
      url: "mailto:yusuf.talhaarabaci@owasp.org",
    },
  ],
};

export const MENU: Record<Lang, Array<{ label: string; href: string; external?: boolean }>> = {
  tr: [
    { label: "Blog", href: "/tr/blog/" },
    { label: "Write-up", href: "/tr/writeups/" },
    { label: "Projeler", href: "/tr/projects/" },
    { label: "Hakkımda", href: "/tr/about/" },
    { label: "İletişim", href: "mailto:yusuf.talhaarabaci@owasp.org", external: true },
  ],
  en: [
    { label: "Blog", href: "/en/blog/" },
    { label: "Write-ups", href: "/en/writeups/" },
    { label: "Projects", href: "/en/projects/" },
    { label: "About", href: "/en/about/" },
    { label: "Contact", href: "mailto:yusuf.talhaarabaci@owasp.org", external: true },
  ],
};