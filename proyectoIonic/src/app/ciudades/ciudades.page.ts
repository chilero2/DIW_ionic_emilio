import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-ciudades',
  templateUrl: './ciudades.page.html',
  styleUrls: ['./ciudades.page.scss'],
})
export class CiudadesPage implements OnInit {
  ciudades: any = [];

  constructor(
    private router: Router,
    private http: HttpClient,
    private toasController: ToastController,
    public  alertController: AlertController
  ) {}

  ngOnInit() {
    this.getCiudades().subscribe((res) => (this.ciudades = res));
  }

  getCiudades() {
    return this.http
      .get('assets/files/ciudades.json')
      .pipe(map((res: any) => res.data));
  }

  async presentToast() {
    const toast = await this.toasController.create({
      message: 'Ciudad Seleccionada',
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

  async presentAlert() {
    const alert = await this.toasController.create({
      header: 'Borrar ciudad',
      message: 'Se ha borrado la ciudad correctamente',
      buttons: ['OK'],
    });
    await alert.present();
    await alert.onDidDismiss();
  }

  async presentAlert2() {
    const alert = await this.toasController.create({
      header: 'Borrar ciudad',
      message: '¿Estas seguro?',
      buttons: [
        {
          text: 'NO',
          handler: () => {
            console.log('No lo cancele');
          }
        },
        {
          text: 'SI',
          handler: () => {
            console.log('Ciudad eliminada');
          },
        },
      ],
    });

    await alert.present();

    await alert.onDidDismiss();
  }

  async presentAlertMultipleButtons() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['Cancel', 'Open Modal', 'Delete'],
    });

    await alert.present();
  }
}
