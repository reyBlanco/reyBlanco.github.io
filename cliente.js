let d=document;
const $form=d.querySelector("#form");
const $nombre=d.querySelector("#nombre");
const $edad=d.querySelector("#edad");
const $submit=d.querySelector("#submit");
const $contenedor=d.querySelector("#contenedor");

let c=console.log;
let paquete={
    data:{},
    url:"https://elemental-yellow-pyroraptor.glitch.me/",
    mode:"cors",
    headers:{
        "content-type":"application/json"
    },
    succes:(resObj)=>{
        $contenedor.innerHTML="";

        for(const atributo in resObj){
            if(typeof resObj[atributo]==="string"){
                $contenedor.innerHTML+=`${atributo}:${resObj[atributo]}<br>`;
            }

            if(typeof resObj[atributo]==="object"){
                let obj2=resObj[atributo];
                for (const key in obj2) {
                    $contenedor.innerHTML+=`${key}:${obj2[key]}<br>`;
                }
            }
            
        }
    },
    reject:(error)=>{
        $contenedor.innerHTML=error;
    }
}

let enviar=async(paquete)=>{
    let {data,url,method,mode,headers,succes,reject}=paquete;

    try {
        let res=await fetch(url,{
            body:JSON.stringify(data),
            headers,
            mode,
            method,
        });

        succes(await res.json());
    } catch (error) {
        reject(`algo salio mal. ${error.message}`);
    }
}

d.addEventListener("click",(e)=>{
    if(e.target===$submit){
        paquete.data.nombre=$nombre.value;
        paquete.data.edad=$edad.value;

        enviar(paquete);
    }
});
