import type { PublicLocale } from "@/lib/i18n/config";
import { publicContent } from "@/lib/i18n/public-content";
import { navigationCopy } from "@/lib/i18n/navigation";

type PageMetadata = {
  title: string;
  description: string;
};

export function getLocalizedPageMetadata(
  locale: PublicLocale,
  pathname: string,
): PageMetadata {
  const copy = publicContent[locale];
  const navigation = navigationCopy[locale];

  switch (pathname) {
    case "/":
      return {
        title: copy.home.hero.title,
        description: copy.home.hero.description,
      };
    case "/about":
      return {
        title: navigation.about,
        description: copy.about.heroDescription,
      };
    case "/services":
      return {
        title: navigation.services,
        description: copy.services.heroDescription,
      };
    case "/books-resources":
      return {
        title: navigation.footer.books,
        description: copy.books.heroDescription,
      };
    case "/needs":
      return {
        title: navigation.footer.currentNeeds,
        description: copy.needs.heroPrototype,
      };
    case "/projects":
      return {
        title: navigation.projects,
        description: copy.projects.heroDescription,
      };
    case "/support":
      return {
        title: navigation.supportPartner,
        description: copy.support.heroDescription,
      };
    case "/transparency":
      return {
        title: navigation.transparency,
        description: copy.transparency.heroDescription,
      };
    case "/news":
      return {
        title: navigation.footer.news,
        description: copy.news.heroDescription,
      };
    case "/contact":
      return {
        title: navigation.contact,
        description: copy.contact.heroDescription,
      };
    default:
      return {
        title: navigation.fullLibraryName,
        description: navigation.footer.description,
      };
  }
}
