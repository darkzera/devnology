import * as HTTPUtil from "@src/util/request"
import  axios  from "axios";

// Deprecated
// A api que escolhi tinha um tempo de descanso ridiculo, desisti de usar.
export class ConsultaExterna {
    constructor(protected request = new HTTPUtil.Request()){}

    public static async getDataFromAPI() {
        // As placas nao podem ser geradas, devem estar dentro do sis. 
        // Posso criar uma lista/interface statica, pertecente a esta classe como valores imutaveis
        // Ao inves de usar o modulo SIDESP-API pra buscar os dados por placa
        // Vamos usar o axios aqui -> https://apicarros.com/v1/consulta/{PLACA}/json
        // Por enquanto vou manter de forma arbitraria 
        // const url: string = 'https://apicarros.com/v1/consulta/`${placa}`/json'
        const placasReais = [
            'GDE8759', 
            'CMG3164', 
            'PLK3959'
        ];
        return 'ok'
    }
}
