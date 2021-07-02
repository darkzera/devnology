import { Request, Response } from "express";
import { Controller, Post, Get } from "@overnightjs/core";
import { CarroInterface } from "@src/util/intefaces/geral";
import Carro from "@src/model/carro";
import Compra from "@src/model/compra";
import Dinero from "dinero.js";
import { parse } from "path";



@Controller('compra')
export class CompraController {
	@Post('')
	public async createNota(
		req: Request,
		res: Response
	): Promise<Response> {
		const vehicle: CarroInterface = {
			placa: 		req.body[1].placa,
			modelo:		req.body[1].modelo,
			marca: 		req.body[1].marca,
			cor: 		req.body[1].cor,
			chassi: 	req.body[1].chassi,
			ano_fabric: req.body[1].ano_fabric,
		}

		const vlue: number = req.body[0];
		console.log("input value by html bdy", vlue);

		const mone = Dinero({
			// amount: parseInt(req.body[0].toString()) // THAT CASTING...
			amount: parseInt(req.body[0].toLocaleString()),
		});

		try {
			// Im dealing with two different things over here
			// This is not best approach..should be modularized 
			const car: Carro = await Carro.query().findOne({
				placa: vehicle.placa,
				ativo: true
			});
			// 
			if (car) {
				throw Error('Ja tem um carro com essa placa marcado como ativo.');
			}
			else {
				const v = await Carro.query().insert(vehicle);
				console.log(parseInt(req.body[0].toString()), "o preço dessa porra foi ", mone.getAmount(), " viado");
				
				await Compra.query().insert({
					valor_compra: mone.getAmount(),
					idCarro: v.id
				});

				return res.status(200).json({
					status: 'Compra registrada e carro armazenado',
					v,
				});
			}
		} catch (err) {
			return res.status(409).json({
				error: err.message
			});
		}

	}


	@Get(':id')
	public async getCompraByID(
		req: Request,
		res: Response
	): Promise<Response> {
		const id= req.params.id;
		
		try {
			const compraFound = await
				Compra.query().select('*').where('idCompra', '=', id)
			return res.status(200).json(compraFound[0])

		} catch (error) {
			return res.status(500).json({
				err: error
			});

		}




	}


}
