import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {
  users: any = [];
  permisson: boolean | undefined; // variable booleana para establecer si va a ser false o true
  searchUsuario: any;
  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.getUsers().subscribe((res) => {
      console.log('Res', res);
      this.users = res;
      this.searchUsuario = this.users;
    });
  }

  redHome() {
    this.router.navigate(['/home']);
  }

  getUsers() {
    return this.http
      .get('./assets/files/clientes.json')
      .pipe(map((res: any) => res.data));
  }

  searchClientes(event: any) {
    const text = event.target.value;
    this.searchUsuario = this.users;
    if (text && text.trim() != '') {
      this.searchUsuario = this.searchUsuario.filter((user: any) => {
        return user.name.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });
    }
  }
}
