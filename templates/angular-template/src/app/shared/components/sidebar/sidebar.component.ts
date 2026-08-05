import { Component, OnInit, Renderer2 } from '@angular/core';

interface SubItem { name: string; path: string; }

interface NavGroup {
  name: string;
  icon: string;
  subList: SubItem[];
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  sidebarList: NavGroup[] = [
    {
      name: '版面範例',
      icon: 'dashboard',
      subList: [
        { name: 'default', path: '/example/default-layout' },
        { name: 'search-option', path: '/example/search-option' }
      ]
    }
  ];

  openGroups: Set<string> = new Set();
  isDark = false;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.openGroups.add(this.sidebarList[0]?.name ?? '');
    this.loadTheme();
  }

  isGroupOpen(name: string): boolean {
    return this.openGroups.has(name);
  }

  toggleGroup(name: string): void {
    if (this.openGroups.has(name)) {
      this.openGroups.delete(name);
    } else {
      this.openGroups.add(name);
    }
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;
    if (this.isDark) {
      this.renderer.addClass(document.body, 'dark-theme');
    } else {
      this.renderer.removeClass(document.body, 'dark-theme');
    }
    localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
  }

  private loadTheme(): void {
    const saved = localStorage.getItem('theme');
    this.isDark = saved === 'dark';
    if (this.isDark) {
      this.renderer.addClass(document.body, 'dark-theme');
    }
  }
}
