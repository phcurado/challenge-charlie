import BaseModel from '@/domain/base/BaseModel';

interface GeolocationParams {
    latitude?: number;
    longitude?: number;
}

class Geolocation extends BaseModel implements GeolocationParams {
    static DEFAULT_LAT = -23.6388352;
    static DEFAULT_LONG = -46.6976768;
    latitude?: number;
    longitude?: number;

    constructor(
        data: GeolocationParams = {
            latitude: Geolocation.DEFAULT_LAT,
            longitude: Geolocation.DEFAULT_LONG,
        }
    ) {
        super();
        this.latitude = data.latitude ? data.latitude : Geolocation.DEFAULT_LAT;
        this.longitude = data.longitude ? data.longitude : Geolocation.DEFAULT_LONG;
    }

    static fromData(data: GeolocationParams): Geolocation {
        return new Geolocation(data);
    }
}

export default Geolocation;
export { GeolocationParams };
