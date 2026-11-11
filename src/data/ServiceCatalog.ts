import type { Locale } from '../i18n/Locale';
import { servicePages, serviceOverview, serviceOverviewShowcase, type ServicePage, type ServiceShowcase } from './services';

export class ServiceCatalog {
 constructor(private readonly locale: Locale) {}

 overview() {
  const t = this.locale.t.bind(this.locale);
  return {
   title: t(serviceOverview.title), description: t(serviceOverview.description), header: t(serviceOverview.header),
   intro: t(serviceOverview.intro), strip: t(serviceOverview.strip),
   porting: t(serviceOverview.porting), portingDescription: t(serviceOverview.portingDescription),
  };
 }

 overviewShowcase(): ServiceShowcase {
  return this.showcase(serviceOverviewShowcase);
 }

 private showcase(showcase: ServiceShowcase): ServiceShowcase {
  const t = this.locale.t.bind(this.locale);
  return {...showcase, landscapeAlt: t(showcase.landscapeAlt), portraitAlt: t(showcase.portraitAlt), caption: t(showcase.caption)};
 }

 pages(): ServicePage[] {
  const t = this.locale.t.bind(this.locale);
  return servicePages.map(page => ({
   ...page,
   ...(page.showcase ? {showcase: this.showcase(page.showcase)} : {}),
   label: t(page.label),
   title: t(page.title),
   accent: t(page.accent),
   description: t(page.description),
   summary: t(page.summary),
   action: t(page.action),
   tags: page.tags.map(tag => t(tag)),
   scopeTitle: t(page.scopeTitle),
   scope: page.scope.map(item => ({title: t(item.title), text: t(item.text)})),
   ...(page.delivery ? {delivery: {
    steps: page.delivery.steps.map(item => ({title: t(item.title), text: t(item.text)})),
    result: t(page.delivery.result),
    note: t(page.delivery.note),
   }} : {}),
   faq: page.faq.map(item => ({question: t(item.question), answer: t(item.answer)})),
   contact: t(page.contact),
  }));
 }
}
