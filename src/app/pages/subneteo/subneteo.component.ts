import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AlertService } from '../../_alert';

@Component({
  selector: 'app-subneteo',
  templateUrl: './subneteo.component.html',
  styleUrls: ['./subneteo.component.scss']
})


export class SubneteoComponent implements OnInit {

	subnet1 = false;
	subnet2 = false;
	dirIP: FormGroup;
	ipSet =false;
	showResults = false;

	octetos;
	subredes;
	hosts;
	mascara;

  constructor(protected alertService: AlertService) {  }

  ngOnInit(): void {
	this.dirIP = new FormGroup({
		ip: new FormControl(''),
		
		subredes: new FormControl(0),
		
		hosts: new FormControl(0),

		mascara: new FormControl(0)
	  })
  }

//Creación de entradas para número de hosts y subredes
crearcuadrossubn(selection){
	if (!/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(this.dirIP.value.ip)) {
		this.alertService.error('Direccion IP incorrecta. Introduce IPv4', { autoClose: 2.5 });
		return;
	}
	this.dirIP.controls.ip.disable();
	this.ipSet = true;
	if(selection == 1){
		this.subnet1 = true;
		return
	}
	this.subnet2 = true;
	return
}
//Verifica los datos
verifica(octetos, subredes, hosts, s, h){
	if (this.clase(octetos) == 0 || octetos.length != 4){
		alert("Dirección IP no válida");
		return false;
	}
	else if(s <= 0 || h <= 0){
		alert("Número de subredes/hosts no válido\nMáscara de subred no válida");
		return false;
	}
	else if (this.clase(octetos) + Math.log2(subredes) + Math.log2(hosts) > 32){
		alert("Número de subredes/hosts no válido\nMáscara de subred no válida");
		return false;
	}
	for (var i = 0; i < octetos.length; i++){
		if (octetos[i] > 255){
			alert("Dirección IP no válida");
			return false;
		}
	}
	return true;
}

//Subneteo
subneteo(){
	var subnet = 'La red se dividió en: ';
	var dir = this.dirIP.controls.ip.value;
	var s = this.dirIP.controls.subredes.value;
	var h = this.dirIP.controls.hosts.value;

	console.log("Direccion: " + dir);
	console.log("Subredes: " + s);
	console.log("Hosts: " + h);

	this.octetos = this.creaoctetos(dir);
	this.subredes = this.potencia(s);
	this.hosts = this.potencia(h);
	if (this.verifica(this.octetos, this.subredes, this.hosts, s, h)){
		while (this.clase(this.octetos) + Math.log2(this.subredes) + Math.log2(this.hosts) < 32){
			this.hosts *= 2;
		}
		this.showResults = true;

		//subnet += this.subredes.toString() + ' subredes con ' + this.hosts.toString() + ' hosts cada una.\n';
		//subnet += 'Por lo tanto, existen ' + (this.subredes-2).toString() + ' subredes asignables con '+ (this.hosts-2).toString() + ' hosts asignables cada una.\n\n';
		//subnet += 'Dirección IP\n' + dir + '\n' + this.dirbin(this.octetos);
		//subnet += this.mascaras(this.clase(this.octetos), Math.log2(this.subredes));
		//subnet += '\n\nSegmento de red\n' + this.direccion(this.segmentodered(this.octetos, this.clase(this.octetos))) + '\n' + this.dirbin(this.segmentodered(this.octetos, this.clase(this.octetos)));
		//subnet += '\n\nBroadcast\n' + this.direccion(this.broadcast(this.octetos, this.clase(this.octetos))) + '\n' + this.dirbin(this.broadcast(this.octetos, this.clase(this.octetos))) + '\n\n';
		//subnet += (this.clase(this.octetos)).toString() + ' bits ID RED\n'
		//subnet += (Math.log2(this.subredes)).toString() + ' bits ID SUBRED\n'
		//subnet += (Math.log2(this.hosts)).toString() + ' bits ID HOST\n\n'
		//subnet += this.rangos(this.segmentodered(this.octetos, this.clase(this.octetos)), this.subredes, this.hosts);
		return;
	}
	else{
		this.alertService.error('Error al verificar los datos', { autoClose: 2.5 });
	}
}

subneteo2(){
	var m = this.dirIP.controls.mascara.value;

	var subnet = 'La red se dividió en: ';
	var dir = this.dirIP.controls.ip.value;
	var s = Math.pow(2, m-this.clase(this.creaoctetos(dir)))
	var h = Math.pow(2,32-m)

	console.log("Direccion: " + dir);
	console.log("Subredes: " + s);
	console.log("Hosts: " + h);

	this.octetos = this.creaoctetos(dir);
	this.subredes = this.potencia(s);
	this.hosts = this.potencia(h);
	if (this.verifica(this.octetos, this.subredes, this.hosts, s, h)){
		while (this.clase(this.octetos) + Math.log2(this.subredes) + Math.log2(this.hosts) < 32){
			this.hosts *= 2;
		}
		this.showResults = true;
		return;
	}
	else{
		this.alertService.error('Error al verificar los datos', { autoClose: 2.5 });
	}
}


//Obtiene los rangos de direcciones IP
rangos(octetos, subredes, hosts){
	var rang = 'Rango de subredes: \n', ranga = 'Rango de subredes asignables: \n';
	for (var i = 0; i < subredes; i++){
		rang += 'Subred ' + i.toString() + ': ' + this.direccion(this.actualiza(octetos)) + ' - ';
		rang.replace("\n", "<br>");
		if (i > 0 && i < subredes - 1){
			octetos[3]++;
			ranga += 'Subred asignable ' + i.toString() + ': ' + this.direccion(this.actualiza(octetos)) ;
			octetos[3]--;
		}
		for (var j = 1; j < hosts; j++){
			octetos[3]++;
		}
		rang += this.direccion(this.actualiza(octetos)) + "<div></div>";//aqui dar el salto
		octetos[3]--;
		if (i > 0 && i < subredes - 1){
			ranga += this.direccion(this.actualiza(octetos)) +  "<div></div>";
		}
		octetos[3] += 2;
	}
	return rang + '\n' + ranga;
}

//Obtiene el número potencia de 2 para abarcar un dato
potencia(n){
	var num = 2;
	while (n > num){
		num *= 2;
	}
	return num;
}

//Completa el octeto
completa(binario){
	while (binario.length < 8){
		binario = '0' + binario;
	}
	return binario;
}

//Actualiza los octetos para obtener la dirección IP
actualiza(octetos){
	for (var i = octetos.length-1; i >= 0; i--){
		if (octetos[i] > 255){
			octetos[i-1] += Math.floor(octetos[i]/256);
			octetos[i] %= 256;
		}
	}
	return octetos;
}

//Convierte un arreglo de octetos a una dirección IP
direccion(octetos){
	let cadena = ''
	for (var i = 0; i < octetos.length; i++){
		cadena += octetos[i].toString() + '.';
	}
	return cadena.substr(0, cadena.length - 1);
}

//Asigna clase a la dirección IP
clase(octetos){
	if (octetos[0] <= 127){
		return 8;
	}
	else if (octetos[0] <= 191){
		return 16;
	}
	else if (octetos[0] <= 223){
		return 24;
	}
	return 0;
}

//Obtiene la mascara tipica y la mascara modificada
mascaras(c, n){
	var n2 = Math.log2(n);
	var mm = '';
	var mt = '';
	for (var i = 0; i < c; i++){
		mt += '1';
		if (mt.length == 8 || mt.length == 17 || mt.length == 26){
			mt += '.';
		}
	}
	while (mt.length < 35){
		mt += '0';
		if (mt.length == 8 || mt.length == 17 || mt.length == 26){
			mt += '.';
		}
	}
	for (var i = 0; i < c + n2; i++){
		mm += '1';
		if (mm.length == 8 || mm.length == 17 || mm.length == 26){
			mm += '.';
		}
	}
	while(mm.length < 35){
		mm += '0';
		if (mm.length == 8 || mm.length == 17 || mm.length == 26){
			mm += '.';
		}
	}

	var resultado =  '\n\nMáscara típica\n' + this.bindir(mt) + '\n' + mt + 
	'\n\nMáscara modificada\n' + this.bindir(mm) + '\n' + mm;
	return resultado;
}

//Separa la dirección IP en octetos
creaoctetos(dir){
	var octetos = dir.split('.');
	for (var i = 0; i < octetos.length; i++){
		octetos[i] = parseInt(octetos[i]);
	}
	return octetos
}

//Obtiene el segmento de red
segmentodered(octetos, c){
	var segmento = [];
	for (var i = 0; i < octetos.length; i++){
		segmento.push(octetos[i]);
	}
	if (c == 8){
		segmento[1] = 0;
		segmento[2] = 0;
		segmento[3] = 0;
	}
	if (c == 16){
		segmento[2] = 0;
		segmento[3] = 0;
	}
	if (c == 24){
		segmento[3] = 0;
	}
	return segmento
}

//Obtiene el broadcast 
broadcast(octetos, c){
	var br = [];
	for (var i = 0; i < octetos.length; i++){
		br.push(octetos[i]);
	}
	if (c == 8){
		br[1] = 255;
		br[2] = 255;
		br[3] = 255;
	}
	if (c == 16){
		br[2] = 255;
		br[3] = 255;
	}
	if (c == 24){
		br[3] = 255;
	}
	return br
}

//Convierte direcciones IP a su equivalente binario
dirbin(octetos){
	var binario  = '';
	for (var i = 0; i < octetos.length; i++){
		binario += this.completa(octetos[i].toString(2)) + '.'}
	return binario.substr(0, binario.length - 1);
}

//Convierte una dirección binaria a decimal
bindir(binario){
	let bin = binario.split('.');
	let dir = ''
	for (var i = 0; i < bin.length; i++){
		dir += parseInt(bin[i], 2).toString() + '.';}
	return dir.substr(0, dir.length - 1);
}

reset(){
	/* 
	//Trate de poner estos en falso y que me borrará los valores como me dijo Pato, borraba todos excepto la label de 1.- Insertar dirección IP
	//Y no me dejaba resetar esta label,tenía que cargar de nuevo la pagina.
	//Pueden tratar ustedes, descomenten las siguientes lineas de codigo y comenten la funcion window
	this.subnet1 = false;
	this.subnet2 = false;
	this.ipSet =false;
	this.showResults = false;
	*/

	//comentar sig. funcion
	window.location.reload()

}

showlog (subredes,hosts){
	var bitsRed = Math.log2(subredes)
	var bitsHosts = Math.log2(hosts)
	var cadena = bitsRed + " bits ID de subred y " + bitsHosts + " bits ID Hosts";
	return  cadena;

}
}
