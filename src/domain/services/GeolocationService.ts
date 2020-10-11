import BaseService from '@/domain/base/BaseService';
import Geolocation from '@/domain/models/Geolocation';
/**
 * Domain service for getting geolocation information
 */
class GeolocationService extends BaseService {
    setLocation(geo: Geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            geo.latitude = position.coords.latitude;
            geo.longitude = position.coords.longitude;
        });
    }
}

export default GeolocationService;
