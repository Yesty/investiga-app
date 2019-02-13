import { ProyectoService } from './../../services/proyecto.service';
import { IProyecto } from './../../models/proyecto';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalle-proyecto',
  templateUrl: './detalle-proyecto.page.html',
  styleUrls: ['./detalle-proyecto.page.scss'],
})
export class DetalleProyectoPage implements OnInit {
  codigoProyecto: string;
  proyecto: IProyecto;

  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private proyectoService: ProyectoService
  ) { }

  ngOnInit() {
    this.codigoProyecto = this.route.snapshot.params['id'];

    this.proyectoService.getProyectoQuery(this.codigoProyecto).subscribe(res => {
      this.proyecto = res[0];
      console.log(this.proyecto);
    });


  }

}
