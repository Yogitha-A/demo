let btn=document.getElementById("sub");

document.querySelectorAll(".drop-zone__input").forEach((inputElelment) => {
    const dropZoneElement = inputElelment.closest(".drop-zone");

    dropZoneElement.addEventListener("click",(e) => {
        inputElelment.click();
        btn.disabled=false;
        btn.style.backgroundColor='#2A9DF4';
    });

    inputElelment.addEventListener("change", (e) =>{
        if(inputElelment.files.length){
            
            updateThumbnail(dropZoneElement,inputElelment.files[0]);
        }
        
    });

    dropZoneElement.addEventListener("dragover",(e)=>{
        e.preventDefault();
        dropZoneElement.classList.add("drop-zone--over");
    });


    ["dragleave","dragend"].forEach((type)=>{
        dropZoneElement.addEventListener(type,(e)=>{
            dropZoneElement.classList.remove("drop-zone--over");
        });
    });


    dropZoneElement.addEventListener("drop",(e)=>{
        e.preventDefault();
       

        if(e.dataTransfer.files.length){
            inputElelment.files=e.dataTransfer.files;
            updateThumbnail(dropZoneElement,e.dataTransfer.files[0]);
        }


        dropZoneElement.classList.remove("drop-zone--over");
    });

});

function updateThumbnail(dropZoneElement,file){
    let thumbnailElement=dropZoneElement.querySelector(".drop-zone__thumb");
const uploadFile=document.getElementById("uploadfile");
const myfiles=document.getElementById("myFile");


if(dropZoneElement.querySelector(".drop-zone__prompt")){
    dropZoneElement.querySelector(".drop-zone__prompt").remove();
}

if(!thumbnailElement){
    thumbnailElement=document.createElement("div");
    thumbnailElement.classList.add("drop-zone__thumb");
    dropZoneElement.appendChild(thumbnailElement);
}

thumbnailElement.dataset.label=file.name;

uploadFile.addEventListener("submit",e=>{
    e.preventDefault();

    const endpoint=file.name;
    const formData=new FormData();


    formData.append("dvr-part-video",file);

    /*fetch(endpoint,{
        method:"post",
        url:" https://social-video.digitalharbor.us/dvrapi/dvr/uploadvideo",
        Header: ' "Content-Type":"multipart/form-data" ',
        body:formData,
        
    }).catch(console.error);*/
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `https://social-video.digitalharbor.us/dvrapi/dvr/uploadvideo`, true);
    xhr.send(formData);

});
}
