import { Injectable, signal } from '@angular/core';

export interface ListItem {
  id: number;
  text: string;
  done: boolean;
  createdAt: string;
}

const STORAGE_KEY = 'ble-sync-items';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly _items = signal<ListItem[]>(this.load());

  readonly items = this._items.asReadonly();

  private load(): ListItem[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  private save(items: ListItem[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    this._items.set(items);
  }

  addItem(text: string): void {
    const items = [...this._items()];
    items.push({
      id: Date.now(),
      text,
      done: false,
      createdAt: new Date().toISOString(),
    });
    this.save(items);
  }

  toggleItem(id: number): void {
    const items = this._items().map((item) =>
      item.id === id ? { ...item, done: !item.done } : item
    );
    this.save(items);
  }

  removeItem(id: number): void {
    const items = this._items().filter((item) => item.id !== id);
    this.save(items);
  }

  clearAll(): void {
    this.save([]);
  }
}
