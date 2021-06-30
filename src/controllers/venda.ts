import { Request, Response } from "express";
import { Controller, Post, Get } from "@overnightjs/core";
import Funcionario from "@src/model/funcionario";
import Venda_Funcionario from "@src/model/venda_funcionario";
import { ForeignKeyViolationError } from "objection";
import Venda from "@src/model/venda";
import Carro from "@src/model/carro";

@Controller('venda')
export class VendaController {
	// ATIVO FIELD -> 
	// 1 - true | 0 - false ?
	@Post('createNota')
	public async createNota(
		req: Request,
		res: Response
	): Promise<Response> {
		const venda = {
			valorTotal: req.body.valor,
			valorComissao: req.body.comissao,
			idCarro: req.body.idCarro,
			idFuncionario: req.body.idFuncionario
		}

		try {
			// This vehicle cannot be sold -> not available
			const car = await Carro.query().findById(venda.idCarro);

			if(!car)
			throw Error('Invalid input.')

			if (!car.ativo) {
				throw Error('Carro indisponível para venda');
			} else {
				const vendaAdded = await Funcionario.relatedQuery('vendas')
					.for(venda.idFuncionario)
					.insert({
						valor: venda.valorTotal,
						comissao: venda.valorComissao,
						idCarro: venda.idCarro,
					});

				const vehic = await Carro.query()
					.findById(venda.idCarro)
					.patch({ ativo: false });

				// Above method are suposed to insert in two tables (create venda and relate insert an vendas_funcionario)
				// But idk it is not working propely
				// It must be a problem in models relation ship definition
				// I dont found it so Iḿ doing this arbitrary way

				// -- Creating relatio between venda and funcionarios
				await Venda_Funcionario.query().insert({
					idFuncionario: venda.idFuncionario,
					idVenda: vendaAdded.id
				});

				return res.status(201).json({
					status: 'Venda registrada',
					vendaAdded,
				});
			}
		} catch (err) {
			if (err instanceof ForeignKeyViolationError) {
				return res.status(401).json({
					Error: "Invalid input."
				})
			}
			return res.status(409).json({
				Error: err.message
			})
		}

	}


	@Get('')
	public async listAllVendas(
		req: Request,
		res: Response
	): Promise<Response> {
		const vendas: Venda[] = await Venda.query();

		return res.status(200).json({
			vendas
		});
	}
}
