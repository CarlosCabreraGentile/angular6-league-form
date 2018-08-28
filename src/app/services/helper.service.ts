export class HelperService {

    /**
     * Add new parameter to object
     * @param object 
     * @returns {Object}
     */
    static fromObjectToArray(object: any): Object {
        if (!object){
            return [];
        }
        else{
            let  objectRetornado = Object.keys(object).map((key) => {
                const obj = object[key];
                obj['_id'] = key;
                return obj;
            });
            return objectRetornado;
        }    
    }
  
  }