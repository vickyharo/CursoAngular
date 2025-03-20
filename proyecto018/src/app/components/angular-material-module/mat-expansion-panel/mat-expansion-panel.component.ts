import { Component, OnInit } from '@angular/core';
import { PostblogService } from '../../../core/services/postblog.service';

@Component({
  selector: 'app-mat-expansion-panel',
  standalone: false,
  templateUrl: './mat-expansion-panel.component.html',
  styleUrl: './mat-expansion-panel.component.css'
})
export class MatExpansionPanelComponent {
  post: any;

  constructor(private postblogService: PostblogService) { }

  ngOnInit() {
    this.postblogService.retornar()
      .subscribe(result => this.post = result)
  }
}
