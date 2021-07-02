import {
	Request,
	Response
} from "express";
import {
	Controller,
	Post,
	Get
} from "@overnightjs/core";
import { ForeignKeyViolationError } from "objection";

import Funcionario from "@src/model/funcionario";
import Venda_Funcionario from "@src/model/venda_funcionario";
import Venda from "@src/model/venda";
import Carro from "@src/model/carro";
import Compra from "@src/model/compra";

import { GestaoService } from "@src/services/gestao";
import Dinero from "dinero.js";

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
			idCarro: req.body.idCarro,
			idFuncionario: req.body.idFuncionario
		}

		try {
			// If theres two vehicles with same 'PLACA' with ATIVO: true
			// Something is wrong. It CANNOT HAPPEND 
			// Valid vehicle is: ATIVO = true
			const car: Carro = await Carro.query().findOne({
				id: req.body.idCarro,
				ativo: true
			});
			if (!car) {
				throw Error('Invalid input.')
			} else {
				const compra: Compra[] = await Compra.query()
					.joinRelated('carros')
					.where('carros.id', car.id);

				// if we bough same car twice, this method above may return > 1 vechile
				// to solve this we need to implement: 
				// if len > 1 :: arr[lastIndex]... - FIX ME

				const mone = Dinero({
					amount: parseInt(compra[0].valor_compra.toString()) // THAT CASTING...
				});

				const valorVenda = GestaoService.calcValorVenda(mone);
				const valorComissao = GestaoService.calcValorComissao(valorVenda);

				// This method s suposed to insert in two tables (create venda and relate insert an vendas_funcionario)
				// But idk it is not working propely - FIX ME
				// It must be a problem in models relation ship definition
				// -- I dont found it so Iḿ doing this arbitrary way
				const vendaAdded = await Funcionario.relatedQuery('vendas')
					.for(venda.idFuncionario).insert({
						valor: valorVenda.getAmount(),
						comissao: valorComissao.getAmount(),
						idCarro: compra[0].idCarro
					});

				// -- Creating relatio between 'em (VENDAS && VENDAS_FUNC>)
				await Venda_Funcionario.query().
					insert({
						idFuncionario: venda.idFuncionario,
						idVenda: vendaAdded.id
					});

				// -- Set vehicle to UNAVAILABLE -> ativo: false
				await Carro.query()
					.findById(venda.idCarro)
					.patch({ ativo: false });

				return res.status(201).json({
					status: 'Venda registrada',
					vendaAdded,
				});
			}

		} catch (err) {
			if (err instanceof ForeignKeyViolationError) {
				return res.status(401).json({
					Error: err.message
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
		// TODO :: implement order by desc
		const vendas: Venda[] = await Venda.knex()
			.raw('select v.idVenda, v.valor, v.comissao, v.data_venda, f.nome as Funcionario, c.id as idCarro, c.modelo, c.placa from vendas as v join vendas_funcionario as vF on v.idVenda = vF.idVenda left join funcionarios as f on vF.idFuncionario = f.id left join carros as c on v.idCarro = c.id order by data_venda desc')

		return res.status(200).json(
			vendas[0]
		);
	}


	// TODO
	@Get('testing')
	public async all(
		req: Request,
		res: Response
	): Promise<Response> {

		// total em compra 
		// All the time
		const totalCompraALL = await Compra.knex()
			.raw('select sum(valor_compra) from compras');
		console.log(totalCompraALL[0]);

		// total em venda
		const totalVendaALL = await Compra.knex()
			.raw('select sum(valor) from vendas');
		console.log(totalVendaALL[0]);


		// total pago em comissao
		const totalComissaoALL = await Compra.knex()
			.raw('select sum (comissao) from vendas');
		console.log(totalComissaoALL[0]);


		// resumo - mes
		return res.status(201).json('rlo');
	}


}
