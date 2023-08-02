/* dom.js */

function init() {
    let element = document.getElementById('walkBtn');
    element.addEventListener('click', function () {
        walk();
    });

    element = document.getElementById('AdwalkBtn');
    element.addEventListener('click', function () {
        advanvceWalk();
    });

    element = document.getElementById('modifyBtn');
    element.addEventListener('click', function () {
        modify();
    });

    element = document.getElementById('AdmodifyBtn');
    element.addEventListener('click', function () {
        adModify();
    });

    element = document.getElementById('addBtn');
    element.addEventListener('click', function () {
        add();
    });

    element = document.getElementById('AdaddBtn');
    element.addEventListener('click', function () {
        adAdd();
    });

    element = document.getElementById('removeBtn');
    element.addEventListener('click', function () {
        remove();
    });

    element = document.getElementById('safe_removeBtn');
    element.addEventListener('click', function () {
        safe_remove();
    });
    element = document.getElementById('selector_removeBtn');
    element.addEventListener('click', function () {
        selector_remove();
    });
    
}

function walk() {
   let el;

   el = document.getElementById('p1');
   showNode(el);

   el = el.firstChild;
   showNode(el);

   el = el.nextSibling;
   showNode(el);

   el = el.lastChild;
   showNode(el);

   el = el.parentNode.parentNode.parentNode;
   showNode(el);

   el = el.querySelector('section > *');
   showNode(el);


}

function showNode(el) {
    let nodeType = el.nodeType;
    let nodeName = el.nodeName;
    let nodeValue = el.nodeValue;

    let text = document.querySelector("#text_walk");
    text.value += `Node type: ${nodeType}\nNode name: ${nodeName}\nNode value: ${nodeValue}\n\n`;
    
}

function advanvceWalk(){
    
    let element = document.querySelector("html");
    let text = document.querySelector("#text_walk");
    treeTreversal(element,0,text)
}

function treeTreversal(element, level, text){
    
    console.log(`Node type: ${element.nodeType}\nNode name: ${element.nodeName}\nNode value: ${element.nodeValue}`)
    if (element.nodeType == '8' || (element.nodeValue != null && element.nodeValue.trim() == "")){
        return;
    }
    // determind the level
    for (let i = 1; i <= level; i++){
        text.value += "    ";
    }
    
    text.value += `${element.nodeName}\n`
    
    if (!element.firstChild){
        return;
    }
    
    for (let child of element.childNodes){
        treeTreversal(child,level+1,text);
    }

}

function modify() {
    let el = document.getElementById('p1');

    // You can do all the properties one by one if you know them in HTML
    el.title = 'I was changed by JS';

    // you can update the style as a string
    // el.style = 'color: blue; font-size: 1em;';

    // you also may prefer to update on the CSS object.  This is the same as above
    // el.style.color = 'blue';
    // el.style.fontSize = '1em';
    // be careful doing many styles bit by bit it isn't efficent, might be easier just to set a class

    // you can also update the class list
    el.classList.add('fancy');

    // you can also update the dataset which change data-* attributes
    el.dataset.cool = 'true';       // data-cool="true"
    el.dataset.coolFactor = '9000'; //data-cool-factor="9000"

}

function adModify(){
    let h1 = document.querySelector("h1");
    h1.textContent = "DOM Manipulation is Fun!";

    let num = Math.floor(Math.random()*6)+1;
    h1.style = `color: var(--darkcolor${num})`;
    let p1 = document.querySelector("#p1");
    p1.classList.toggle("shmancy");
}

function add() {

    let p, em, txt1, txt2, txt3;

    // first we do things the long old-fashioned standard DOM way
    p = document.createElement('p'); // <p></p>
    em = document.createElement('em'); // <em></em>
    txt1 = document.createTextNode('This is a '); // "This is a"
    txt2 = document.createTextNode('test'); // "test"
    txt3 = document.createTextNode(' of the DOM'); // " of the DOM"

    p.appendChild(txt1); // <p>This is a</p>
    em.appendChild(txt2); // <em>test</em>
    p.appendChild(em); // <p>This is a<em>test</em></p>
    p.appendChild(txt3); // <p>This is a<em>test</em> of the DOM</p>

    // go an insert this new copy below the old one
    let oldP = document.getElementById('p1');
    oldP.parentNode.insertBefore(p, oldP.nextSibling);

    // Alternative method using innerHTML and insertAdjacentHTML
    // let oldP = document.getElementById('p1');
    // oldP.insertAdjacentHTML('afterend', '<p>This is a<em>test</em> of the DOM</p>');
    // clearly short hands are pretty easy!

    
}

function adAdd(){
    let output = document.querySelector("output");
    let textarea = document.querySelector("#add_text");
    let select = document.querySelector("#select1");
    const date = new Date();
    let date_string = date.toLocaleString();

    console.log(select)
    if (select.value == "text_node"){
        
        let text_node;
        if (textarea.value == ""){
            text_node = document.createTextNode(`New Text Node ${date_string}`)
        }
        else{
            text_node = document.createTextNode(`${textarea.value} ${date_string}`);
        }
        
        output.appendChild(text_node);
        output.appendChild(document.createElement("br"))
    }
    else if (select.value == "comment"){
        let comment_node;
        if (textarea.value == ""){
            comment_node = document.createComment(`New Comment ${date_string}`)
        }
        else{
            comment_node = document.createComment(`${textarea.value} ${date_string}`);
        }
        output.appendChild(comment_node);
        
    }
    else{
        let element = document.createElement(textarea.value);
        
        element.textContent = `New element  ${date_string}`
        output.appendChild(element);
        output.appendChild(document.createElement("br"))
    }
}


function remove() {
  document.body.removeChild(document.body.lastChild);
}

function safe_remove(){
    let section = document.querySelector("#controls");
    let body = document.querySelector("body");
    
    
    for (let i = body.childNodes.length-1 ; i >=0; i--){
        if (body.childNodes[i] != section){
            body.removeChild(body.childNodes[i])
        }
        
    }
}

function selector_remove(){
    let css_query = document.querySelector("#selector_text").value;
    let elements = document.querySelectorAll(css_query)
    for (let el of elements){
        el.remove()
    }
}



window.addEventListener('DOMContentLoaded', init);