import { Request, Response } from "express";
import { Controller, Post, Get } from "@overnightjs/core";
import { CarroInterface } from "@src/util/intefaces/geral";
import Carro from "@src/model/carro";
@Controller('carro')
export class CarroController {
	// ATIVO FIELD -> 
	// 1 - true | 0 - false ?

	@Post('create')
	public async createCar(
		req: Request,
		res: Response
	): Promise<Response> {
		const car: CarroInterface = {
			modelo: req.body.modelo,
			marca: req.body.marca,
			ano_fabric: req.body.fabricação,
			placa: req.body.placa,
			cor: req.body.cor,
			chassi: req.body.chassi,
		}
		// eslint-disable-next-line @typescript-eslint/no-inferrable-types
		let canAdd: boolean = true;
		try {
			const carrosToCheck = 
				await Carro.query().select("*");

			carrosToCheck.forEach(carroPlc => {
				if (carroPlc.placa == car.placa && carroPlc.ativo){
					canAdd = false;
				}
			});
			if (canAdd){ 
				await Carro.query().insert(car);
				return res.status(200).json({
					result: 'Carro adicionado'
				});
			} else {
				throw Error('Registro nao autorizado.\nUm carro com a mesma placa está ativo no sistema')
			}

		} catch (err) {

			return res.status(409).json(err.message);

		}

	}
}
