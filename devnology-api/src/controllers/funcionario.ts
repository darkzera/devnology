import { Request, Response } from "express";
import { Controller, Post, Get } from "@overnightjs/core";
import { CarroInterface } from "@src/util/intefaces/geral";
import Carro from "@src/model/carro";
import Compra from "@src/model/compra";
import Dinero from "dinero.js";
import { parse } from "path";
import Funcionario from "@src/model/funcionario";



@Controller('funcionario')
export class FuncionarioController {


	@Get('')
	public async getFuncionarios(
		req: Request,
		res: Response): Promise<Response> {

		try {
			const funcionario = await Funcionario.query().select('*');
			return res.status(200).json(funcionario);
		} catch (error) {
			return res.json(401).json(error.message)
		}

	}



}