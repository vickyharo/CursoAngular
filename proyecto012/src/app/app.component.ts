import { Component, OnInit  } from '@angular/core';
import { ArticulosService } from './articulos.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit{
  title = 'proyecto012';

  articulos :any;
  
  constructor(private articulosServicio: ArticulosService) {
  }
  
  ngOnInit() {
    this.articulos=this.articulosServicio.retornar();
  }
}
