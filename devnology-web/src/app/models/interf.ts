export interface member {
    idVenda?: number 
    valor?: number,
    comissao?: number,
    data_venda?: string
    funcionario?: string,
    idCarro?: number,
    modelo?: string,
    placa?: string
}
export interface Venda { 
    idVenda?: number 
    valor?: number,
    comissao?: number,
    data_venda?: string
    funcionario?: string,
    idCarro?: number,
    modelo?: string,
}

export interface Compra {
    idCompra?: number,
    valor_compra?: number,
    idCarro?: number,
    data_compra?: string 
}

export interface Vehc {
    id?: number 
    placa?: string
    marca?:string
    modelo?:string
    cor?: string
    chassi?: string
    ano_fabric?: string
    ativo?: boolean
    idCompra?: number
    valor_compra?: number
    idCarro?: number
    data_compra?: string
}

export interface Funcionario {
    idFuncionario?: number,
    idNome?: string
}