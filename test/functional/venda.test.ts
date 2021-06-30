import Venda from "@src/model/venda";
import Carro from "@src/model/carro";
import Venda_Funcionario from "@src/model/venda_funcionario";

describe('Sale registry [Venda] functional tests creating (CREATE) method. Perform rout: .../venda/createNota', () => {
	afterAll(async () => {
		// TODO implement --> on cascade migrations:?
		// 1) delete vendas_func relation
		// Venda_Funcionario.query().delete().where('idFuncionario', '=', '????')

		// 2) delete sales [ vendas ] table 
		await Venda.query().delete().where('valor', '=', 999999);

		// 3) swap state of boolean inside CARROS (ativo) to true -> 
		// We removed entire trail of this SALE. So we must set this car to available again
		await Carro.query().findById(4).patch({
			ativo: true
		})
	});

	it('Should sucessfull create an sale registry [VENDA] (venda_Func table) - #1', async () => {
		const vendaAdded = {
			valor: 999999,
			comissao: 150,
			idCarro: 4,
			idFuncionario: 2,
		}
		const { status, body } =
			await global.testRequest.post('/venda/createNota').send(vendaAdded);
		expect(status).toBe(201);
		// expect body 
	});

	it('Should fail creating an sale registry [VENDA] cuz vehicle not available - #2', async () => {
		const vendaAdded = {
			valor: 999999,
			comissao: 150,
			idCarro: 4,
			idFuncionario: 2,
		}
		const { status, body } =
			await global.testRequest.post('/venda/createNota').send(vendaAdded);
		expect(status).toBe(409);
		expect(body).toEqual({
			Error: 'Carro indisponível para venda'
		});
	});

	it('Should fail creating an sale registry [VENDA] INVALID VEHICLE or funcionario given by input - #3', async () => {
		const vendaAdded = {
			valor: 35000,
			comissao: 150,
			idCarro: 92873, // invalid FK that may cause an 'sucessfull fail' test
			idFuncionario: 4,
		}
		const { status, body } =
			await global.testRequest.post('/venda/createNota').send(vendaAdded);
		expect(status).toBe(409);
		expect(body).toEqual({
			Error: "Invalid input."
		});
	});
}); // EOM Creating 

describe('Sale [VENDA] functional tests listing (GET) method. Perform rout: .../venda/listAllVendas', () => {
	it('Should sucessfull return a list of all sales [VENDAS]', async () => {
		const { status, body } =
			await global.testRequest.get('/venda/');
		expect(status).toBe(200);
	});

	it.skip('', () => {
		// await global.test
	});


});