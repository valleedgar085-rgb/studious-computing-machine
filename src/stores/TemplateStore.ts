import { Template, TemplateScope } from '../types';

class TemplateStore {
  private readonly STORAGE_KEY = 'templates';
  private readonly LAST_USED_KEY = 'last-used-template';

  private getTemplates(): Template[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse templates', e);
      }
    }
    return [];
  }

  private saveTemplates(templates: Template[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(templates));
  }

  save(template: Omit<Template, 'id' | 'createdAt' | 'updatedAt' | 'isFavorite'>): Template {
    const templates = this.getTemplates();
    const newTemplate: Template = {
      ...template,
      id: `template-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
      isFavorite: false,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    templates.push(newTemplate);
    this.saveTemplates(templates);
    this.setLastUsed(template.scope, newTemplate.id);
    return newTemplate;
  }

  load(id: string): Template | null {
    const templates = this.getTemplates();
    const template = templates.find(t => t.id === id);
    if (template) {
      template.lastUsed = Date.now();
      template.updatedAt = Date.now();
      this.saveTemplates(templates);
      this.setLastUsed(template.scope, id);
    }
    return template || null;
  }

  delete(id: string): boolean {
    const templates = this.getTemplates();
    const index = templates.findIndex(t => t.id === id);
    if (index !== -1) {
      templates.splice(index, 1);
      this.saveTemplates(templates);
      return true;
    }
    return false;
  }

  rename(id: string, newName: string): boolean {
    const templates = this.getTemplates();
    const template = templates.find(t => t.id === id);
    if (template) {
      template.name = newName;
      template.updatedAt = Date.now();
      this.saveTemplates(templates);
      return true;
    }
    return false;
  }

  duplicate(id: string): Template | null {
    const templates = this.getTemplates();
    const template = templates.find(t => t.id === id);
    if (template) {
      const newTemplate: Template = {
        ...template,
        id: `template-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
        name: `${template.name} (copy)`,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };
      templates.push(newTemplate);
      this.saveTemplates(templates);
      return newTemplate;
    }
    return null;
  }

  toggleFavorite(id: string): boolean {
    const templates = this.getTemplates();
    const template = templates.find(t => t.id === id);
    if (template) {
      template.isFavorite = !template.isFavorite;
      template.updatedAt = Date.now();
      this.saveTemplates(templates);
      return template.isFavorite;
    }
    return false;
  }

  getByScope(scope: TemplateScope): Template[] {
    return this.getTemplates().filter(t => t.scope === scope);
  }

  getFavorites(scope?: TemplateScope): Template[] {
    const templates = this.getTemplates();
    return scope 
      ? templates.filter(t => t.isFavorite && t.scope === scope)
      : templates.filter(t => t.isFavorite);
  }

  getLastUsed(scope: TemplateScope): Template | null {
    const key = `${this.LAST_USED_KEY}-${scope}`;
    const id = localStorage.getItem(key);
    if (id) {
      return this.load(id);
    }
    return null;
  }

  private setLastUsed(scope: TemplateScope, id: string) {
    const key = `${this.LAST_USED_KEY}-${scope}`;
    localStorage.setItem(key, id);
  }
}

export const templateStore = new TemplateStore();
