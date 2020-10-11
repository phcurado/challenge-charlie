import BaseModel from '@/domain/base/BaseModel';

interface ComponentsParams {
    state: string;
    city: string;
}

interface ResultsParams {
    components: ComponentsParams;
}

interface OpenCageParams {
    results: Array<ResultsParams>;
}

class OpenCage extends BaseModel implements OpenCageParams {
    results: Array<ResultsParams>;

    constructor(data: OpenCageParams) {
        super();
        this.results = data.results;
    }

    static fromData(data: OpenCageParams): OpenCage {
        return new OpenCage(data);
    }
}

export default OpenCage;
export { OpenCageParams };
