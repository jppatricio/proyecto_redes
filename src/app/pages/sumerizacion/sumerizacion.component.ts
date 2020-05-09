import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-sumerizacion',
  templateUrl: './sumerizacion.component.html',
  styleUrls: ['./sumerizacion.component.scss']
})
export class SumerizacionComponent implements OnInit {
  @ViewChild('alert', { static: true }) alert: ElementRef
  dir: FormGroup;
  direcciones = [];
  ordenadas = [];
  binarios = [];
  ordena = false;
  constructor() { }

  ngOnInit(): void {
    this.dir = new FormGroup({
      ip: new FormControl('')
    })
  }
  onSubmit(data) {
    // Process checkout data here
    const ip = data.ip;
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip)) {
      this.alert.nativeElement.classList.remove('show');
      const arr = ip.split(".");
      let suma = 0;
      for (const ix in arr) {
        suma += (arr[ix] * (256 ** (3 - parseInt(ix))));
      }
      this.direcciones = [...this.direcciones, { ip: ip, id: suma }];
      this.ordenadas = [...this.ordenadas, { ip: ip, id: suma }];
      this.ordena = false;
    } else {
      this.alert.nativeElement.classList.add('show');
    }
  }
  compare(a, b) {
    if (a.id < b.id) {
      return -1;
    }
    if (a.id > b.id) {
      return 1;
    }
    return 0;
  }
  sumariza() {
    let temp = 0;
    let id = 0;
    let ix = 1;

    if (this.direcciones.length in [0, 1]) {
      console.log('Añade más direcciones IP.')
    }
    else {
      this.ordenadas.sort(this.compare);
      temp = this.ordenadas[0].id;
      for (ix = 1; ix < this.direcciones.length; ix++) {
        id = this.ordenadas[ix].id;
        console.log(id)
        if ((id - temp) !== 1) {
          console.log('Las direcciones IP no son contiguas.')
          this.direcciones.length = 0;
          this.ordenadas.length = 0;
          return;
        }
        temp = id;
      }
    }
    this.ordena = true;
    this.muestraBinarios();
  }
  closeAlert() {
    this.alert.nativeElement.classList.remove('show');
  }

  muestraBinarios() {
    this.binarios = this.ordenadas.map(obj => {
      let str = '';
      const arr = obj.ip.split(".");
      for (let num of arr) {
        str += parseInt(num).toString(2) + '.';
      }
      return str;
    })
    console.log(this.binarios)
    this.cadenaIdentica()
  }
  cadenaIdentica() {
    let i = 1;
    let ix = 0;
    let str1 = this.binarios[0];
    let str2 = '';
    for (i = 1; i < this.binarios.length; i++) {
      str2 = this.binarios[1];
      ix = 0;
      while (str1[ix] == str2[ix]) {
        ix += 1;
      }
      str1 = str1.substr(0, ix);
    }
    console.log(str1);
  }
}
