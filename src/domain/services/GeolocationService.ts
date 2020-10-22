import BaseService from '@/domain/base/BaseService';
import Geolocation from '@/domain/models/Geolocation';
/**
 * Domain service for getting geolocation information
 */
class GeolocationService extends BaseService {
    setLocation(func: Function) {
        navigator.geolocation.getCurrentPosition((position) => {
            const geo = new Geolocation();
            geo.latitude = position.coords.latitude;
            geo.longitude = position.coords.longitude;
            func(geo);
        });
    }
}

export default GeolocationService;
