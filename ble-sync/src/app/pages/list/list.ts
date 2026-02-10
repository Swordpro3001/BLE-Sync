import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-list',
  imports: [FormsModule],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class ListPage {
  private readonly storage = inject(StorageService);

  readonly items = this.storage.items;
  readonly newItemText = signal('');

  addItem(): void {
    const text = this.newItemText().trim();
    if (!text) return;
    this.storage.addItem(text);
    this.newItemText.set('');
  }

  toggleItem(id: number): void {
    this.storage.toggleItem(id);
  }

  removeItem(id: number): void {
    this.storage.removeItem(id);
  }

  clearAll(): void {
    this.storage.clearAll();
  }
}
