import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  @Input() menu!: any[];
  estaLogado: boolean = false;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  logout() {}
}
