import * as HTTPUtil from '@src/util/request';
import { ConsultaExterna } from '../consultaExterna';

describe('External service caller - testing layer - ', () => {
    it('should sucess full reach external api with specific - PLACA - ', async () => {
        ConsultaExterna.getDataFromAPI();
    });
});
