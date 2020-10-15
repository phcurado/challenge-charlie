import BaseModel from '@/domain/base/BaseModel';
import Weather, { IWeatherParams } from './Weather';

interface IForecastParams {
    list: Array<IWeatherParams>;
}

class ForecastList extends BaseModel implements IForecastParams {
    list: Array<Weather>;

    constructor(
        data: IForecastParams = {
            list: [],
        }
    ) {
        super();
        this.list = data.list.map((forecast) => Weather.fromData(forecast));
    }

    static fromData(data: IForecastParams): ForecastList {
        return new ForecastList(data);
    }
}

export default ForecastList;
export { IForecastParams };
