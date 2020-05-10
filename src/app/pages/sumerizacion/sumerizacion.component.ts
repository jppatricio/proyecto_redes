import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AlertService } from '../../_alert';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-sumerizacion',
  templateUrl: './sumerizacion.component.html',
  styleUrls: ['./sumerizacion.component.scss']
})
export class SumerizacionComponent implements OnInit {
  dir: FormGroup;
  direcciones = [];
  ordenadas = [];
  binarios = [];
  ordena = false;
  tam_bloque_total = 0;
  cadena = "";
  segmento = "";
  mascara = 0;
  constructor(protected alertService: AlertService) { }

  ngOnInit(): void {
    this.dir = new FormGroup({
      ip: new FormControl(''),
      cidr: new FormControl('')
    })
  }

  onSubmit(data) {
    const ip = data.ip;
    if (!/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip)) {
      this.alertService.error('Direccion IP incorrecta', { autoClose: 2.5 });
      return;
    }
    if (data.cidr > 30 || data.cidr < 8) {
      this.alertService.error('CIDR no esta en un rango adecuado', { autoClose: 2.5 });
      return;
    }
    const arr = ip.split(".");
    let suma = 0;
    const tam_bloque = 2 ** (32 - data.cidr);
    for (const ix in arr) {
      suma += (arr[ix] * (256 ** (3 - parseInt(ix))));
    }
    this.direcciones = [...this.direcciones, { ip: ip, cidr: data.cidr }];
    this.ordenadas = [...this.ordenadas, { ip: ip, id: suma, bcast: (suma + tam_bloque - 1), tamBloque: tam_bloque }];
    this.tam_bloque_total += tam_bloque;
    this.ordena = false;
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
    //let arr = Array(30 - 8 + 1).fill(2).map((n, ix) => n ** (ix + 2));
    if (this.direcciones.length in [0, 1]) {
      this.alertService.error('Añade más direcciones IP', { autoClose: 2.5 });
    }
    else {
      this.ordenadas.sort(this.compare);
      temp = this.ordenadas[0].bcast;
      for (ix = 1; ix < this.direcciones.length; ix++) {
        id = this.ordenadas[ix].id;
        if ((id - temp) !== 1) {
          this.alertService.error('Las direcciones IP no son contiguas', { autoClose: 2.5 });
          return;
        }
        temp = this.ordenadas[ix].bcast;
      }
    }
    // if (arr.indexOf(this.tam_bloque_total) === -1) {
    //   this.alertService.error('El tamaño del nuevo bloque no es correcto.', { autoClose: 2.5 });
    //   return;
    // }
    this.ordena = true;
    this.muestraBinarios();
  }


  muestraBinarios() {
    this.binarios = this.ordenadas.map(obj => {
      let str = '';
      const arr = obj.ip.split(".");
      for (let num of arr) {
        str += ("00000000" + (parseInt(num).toString(2))).slice(-8) + '.';
      }
      return str.substr(0, str.length - 1);
    })
    this.cadenaIdentica()
  }
  cadenaIdentica() {
    let i = 1;
    let ix = 0;
    let str1 = this.binarios[0];
    let str2 = '';
    for (i = 1; i < this.binarios.length; i++) {
      str2 = this.binarios[i];
      ix = 0;
      while (str1[ix] == str2[ix]) {
        ix += 1;
      }
      str1 = str1.substr(0, ix);
    }
    this.mascara = ix - Math.floor(ix / 8);
    this.cadena = str1;
    this.interpretaCadena();
  }
  interpretaCadena() {
    let str = '';
    let bin = '';
    const arr = this.cadena.split(".");
    while (arr.length < 4) {
      arr.push("0");
    }
    for (let num of arr) {
      bin = num.padEnd(8, "0");
      str += parseInt(bin, 2).toString() + '.';
    }
    this.segmento = str.substr(0, str.length - 1);
  }
}
