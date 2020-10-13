import BaseModel from '@/domain/base/BaseModel';
import Forecast, { IForecastParams } from './Forecast';

interface IForecastListParams {
    list: Array<IForecastParams>;
}

class ForecastList extends BaseModel implements IForecastListParams {
    list: Array<Forecast>;

    constructor(
        data: IForecastListParams = {
            list: [],
        }
    ) {
        super();
        this.list = data.list.map((forecast) => Forecast.fromData(forecast));
    }

    static fromData(data: IForecastListParams): ForecastList {
        return new ForecastList(data);
    }
}

export default ForecastList;
export { IForecastListParams };
