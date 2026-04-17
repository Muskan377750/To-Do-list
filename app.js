let inp = document.querySelector("input");
let btn = document.querySelector("button");
let ul = document.querySelector("ul");

btn.addEventListener("click", function () {
  let item = document.createElement("li");
  item.innerText = inp.value;
  inp.value = "";
  ul.appendChild(item);

  let del = document.createElement("button");
  del.innerText = "Delete";
  del.classList.add("delete");
  item.appendChild(del);
});

ul.addEventListener("click",function(event){
    if(event.target.nodeName == "BUTTON"){
        let listItem = event.target.parentElement;
        listItem.remove();  
    }
});