import BaseModel from '@/domain/base/BaseModel';

interface ImageParams {
    startdate: Date;
    fullstartdate: Date;
    enddate: Date;
    url: string;
    urlbase: boolean;
    copyright: string;
    copyrightlink: string;
    title: string;
    quiz: string;
    wp: boolean;
    hsh: string;
    drk: number;
    top: number;
    bot: number;
    hs: Array<string>;
}
interface ToolTipsParams {
    loading: string;
    previous: string;
    next: string;
    walle: string;
    walls: string;
}

interface BingImageParams {
    images: Array<ImageParams>;
    tooltips: ToolTipsParams;
}

class BingImage extends BaseModel implements BingImageParams {
    images: Array<ImageParams>;
    tooltips: ToolTipsParams;

    constructor(data: BingImageParams) {
        super();
        this.images = data.images;
        this.tooltips = data.tooltips;
    }

    static fromData(data: BingImageParams): BingImage {
        return new BingImage(data);
    }
}

export default BingImage;
export { BingImageParams };
