import BingImage, { BingImageParams } from '@/domain/models/BingImage';
import route from './route';
import { AxiosInstance, AxiosResponse } from 'axios';

/**
 * Small service for the Bing image request
 */
class BingService {
    constructor(private http: AxiosInstance) {}

    async getImage(): Promise<BingImage> {
        return this.http
            .get(`${route.BASE}${route.IMAGE}`)
            .then((response: AxiosResponse<BingImageParams>) => {
                return BingImage.fromData(response.data);
            });
    }

    extractImageUrl(bingImage: BingImage): string {
        return `${route.BASE}${bingImage.images[0].url}`;
    }

    async getImageUrl() {
        const image = await this.getImage();
        return `${route.BASE}${image.images[0].url}`;
    }
}

export default BingService;
