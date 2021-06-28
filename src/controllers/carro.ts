import { Request, Response } from "express";
import { Controller, Post, Get} from "@overnightjs/core";
import { CarroInterface } from "@src/util/intefaces/geral";


@Controller('carro')
export class CarroController {

	@Post('create')
	public async createCar(
		req: Request,
		res: Response
	):Promise<Response> {
		console.log('oi');
		const car: CarroInterface = {
			modelo: 		req.body.modelo,
			marca: 			req.body.marca,
			ano_fabric: 	req.body.fabricação,
			placa: 			req.body.placa,
			cor: 			req.body.cor,
			chassi: 		req.body.chassi,
			data_compra: 	req.body.compra,
			valorCompra: 	req.body.valorCompra,
		}
		


		return res.status(200).json('Carro adicionado');

	}
}
