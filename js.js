let filters={
    brightness:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    contrast:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    saturate:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    "hue-rotate":{
        value:0,
        min:0,
        max:360,
        unit:"deg"
    },
    blur:{
        value:0,
        min:0,
        max:20,
        unit:"px"
    },
    grayscale:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
    sepia:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
    opacity:{
        value:100,
        min:0,
        max:100,
        unit:"%"
    },
    invert:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    }
} 

const filterbox=document.querySelector(".filters");
function createFliterElement(name,unit,value,min,max){
    const div=document.createElement("div");
    div.classList.add("filter");
      
    const p=document.createElement("p");
    p.innerText=name;

    const input=document.createElement("input");
    input.type="range";
    input.min=min;
    input.max=max;
    input.value=value
    input.id=name

    div.appendChild(p)
    div.appendChild(input)
    
input.addEventListener("input",(event)=>{
    // const filterName = event.target.id; 
    filters[name].value = event.target.value;
    applyfilter();
    })
    return div
}
 
function createfilter(){
Object.keys(filters).forEach(key =>{
         const filterelement=createFliterElement(key,filters[key].unit,filters[key].value,filters[key].min,filters[key].max)
          filterbox.appendChild(filterelement)
})
}
createfilter()
const inputimage=document.querySelector("#input_image")
const inputlabel=document.querySelector("#input-label")
const canvasCtx= inputimage.getContext("2d")
const resetbtn=document.querySelector("#reset-btn")
const downloadbtn=document.querySelector("#Download-btn")

let image=null;

inputlabel.addEventListener('change',(event)=>{
    const file=event.target.files[0]

    const imageplace=document.querySelector(".placeholder")
    inputimage.style.display="block"

    imageplace.style.display="none"
    const img=new Image()
    img.src=URL.createObjectURL(file)

    img.onload=()=>{
        image=img
        inputimage.width=img.width
        inputimage.height=img.height
        applyfilter();
    }
})
function applyfilter(){
    canvasCtx.clearRect(0, 0, inputimage.width, inputimage.height);
    canvasCtx.filter=`
    brightness(${filters.brightness.value}${filters.brightness.unit})
    contrast(${filters.contrast.value}${filters.contrast.unit})
    saturate(${filters.saturate.value}${filters.saturate.unit})
    hue-rotate(${filters["hue-rotate"].value}${filters["hue-rotate"].unit})
    blur(${filters.blur.value}${filters.blur.unit})
    grayscale(${filters.grayscale.value}${filters.grayscale.unit})
    sepia(${filters.sepia.value}${filters.sepia.unit})
    opacity(${filters.opacity.value}${filters.opacity.unit})
    invert(${filters.invert.value}${filters.invert.unit})`
    canvasCtx.drawImage(image,0,0)
}


resetbtn.addEventListener("click",()=>{
     filters={
    brightness:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    contrast:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    saturate:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    "hue-rotate":{
        value:0,
        min:0,
        max:360,
        unit:"deg"
    },
    blur:{
        value:0,
        min:0,
        max:20,
        unit:"px"
    },
    grayscale:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
    sepia:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
    opacity:{
        value:100,
        min:0,
        max:100,
        unit:"%"
    },
    invert:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    }
} 
applyfilter()
filterbox.innerHTML=""
createfilter()
})

downloadbtn.addEventListener("click",()=>{
    const link=document.createElement("a")
    link.download="edited.png"
    link.href=inputimage.toDataURL()
    link.click()
})