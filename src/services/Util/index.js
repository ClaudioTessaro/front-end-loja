/* eslint-disable class-methods-use-this */
import { toast } from 'react-toastify';

class UtilService {
  retornoUtil(response) {
    if (response.status === 200) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  }
}

export default new UtilService();
