export function validAdres(text){
    let err={msg:'',error:false};

        
    if(text.length>10)return err;
    err.msg="Слишком короткое значение";
    err.error=true;
    return err;
}

export function required(text){

    let err={msg:'',error:false};
    if(text.length==0){
        err.msg="Поле обязаьельно для заполнения";
        err.error=true;
        return err;
    }
    
    return err;

}

export function validNumber(value){
    let err={msg:'',error:false};


    if (Number(value)&&value.length==10)return err;
    err.msg="Номер не корректен";
    err.error=true;
    return err;
 
}
