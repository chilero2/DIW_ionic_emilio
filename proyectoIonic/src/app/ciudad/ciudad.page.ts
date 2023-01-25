import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-ciudad',
  templateUrl: './ciudad.page.html',
  styleUrls: ['./ciudad.page.scss'],
})
export class CiudadPage implements OnInit {

  id:any
  finalId:any
  ciudades: any = []
  name: any
  image: any
  desc: any

  constructor(private activatedRoute: ActivatedRoute,  private http: HttpClient) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    this.finalId = this.id -1 //para que tenga la posición de una array
    
    this.getCiudades().subscribe(res => {
      this.ciudades = res
      this.name = this.ciudades[this.finalId].name 
      this.image = this.ciudades[this.finalId].image 
      this.desc = this.ciudades[this.finalId].desc 
      
    });
    

  }

  getCiudades() {
    return this.http
    .get('assets/files/ciudades.json')
    .pipe(
      map((res:any) => {
        return res.data
      })
    )
  }

}
