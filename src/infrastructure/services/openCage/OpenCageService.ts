import OpenCage, { OpenCageParams } from '@/domain/models/OpenCage';
import route from './route';
import { AxiosInstance, AxiosResponse } from 'axios';

/**
 * Service for the OpenCage API
 */
class OpenCageService {
    static API_KEY = 'c63386b4f77e46de817bdf94f552cddf';
    constructor(private http: AxiosInstance) {}

    async getLocation(lat: number, long: number): Promise<OpenCage> {
        return this.http
            .get(`${route.BASE}`, {
                params: {
                    q: `${lat},${long}`,
                    key: OpenCageService.API_KEY,
                },
            })
            .then((response: AxiosResponse<OpenCageParams>) => {
                return OpenCage.fromData(response.data);
            });
    }

    async getLocationName(lat: number, long: number) {
        const openCage = await this.getLocation(lat, long);
        return `${openCage.results[0].components.city}, ${openCage.results[0].components.state}`;
    }
}

export default OpenCageService;
