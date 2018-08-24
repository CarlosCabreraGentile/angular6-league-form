export class HelperService {

    static fromObjectToArray(object: any) {
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