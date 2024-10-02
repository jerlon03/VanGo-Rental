import { Instance } from "../axious"
import { Van ,DataRes} from "../types/van.type"


const fetchAllVan = async () => {
    const response = await Instance.get<DataRes<Van[]>>('/api/van/');
    return response.data;
}

const fetchAddVan = async (data: Van) => {
    const response = await Instance.post<DataRes<Van[]>>('/api/van/create');
    return response.data;
}

const fetchAllPublicVan = async () => {
    const response = await Instance.get<DataRes<Van[]>>('/public/van/');
    return response.data;
}
  

export {
    fetchAllVan,
    fetchAddVan,
    fetchAllPublicVan
  }