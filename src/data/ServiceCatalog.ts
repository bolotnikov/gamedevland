import type { Locale } from '../i18n/Locale';
import { servicePages, type ServicePage } from './services';

export class ServiceCatalog {
 constructor(private readonly locale: Locale) {}

 pages(): ServicePage[] {
  const t = this.locale.t.bind(this.locale);
  return servicePages.map(page => ({
   ...page,
   label: t(page.label),
   title: t(page.title),
   accent: t(page.accent),
   description: t(page.description),
   summary: t(page.summary),
   action: t(page.action),
   tags: page.tags.map(tag => t(tag)),
   scopeTitle: t(page.scopeTitle),
   scope: page.scope.map(item => ({title: t(item.title), text: t(item.text)})),
   process: page.process.map(item => ({title: t(item.title), text: t(item.text)})),
   result: t(page.result),
   note: t(page.note),
   faq: page.faq.map(item => ({question: t(item.question), answer: t(item.answer)})),
   contact: t(page.contact),
  }));
 }
}
