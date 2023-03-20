const inputTarefas = document.querySelector('.input-tarefas')
const btnTarefa = document.querySelector('.btn-tarefa')
const tarefas = document.querySelector('.tarefas')

const criaLi=()=>{
    const li = document.createElement('li');
    return li;
}

const linpaInput=()=>{
    inputTarefas.value = '';
    inputTarefas.focus();
}

const criaBotaoApagar =(li)=>{
    li.innerHTML += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerHTML = 'Apagar';
    botaoApagar.setAttribute('class','apagar')
    botaoApagar.setAttribute('title','click para apagar')
    li.appendChild(botaoApagar)
}

document.addEventListener('click',(e)=>{
    const elemento = e.target
    if(elemento.classList.contains('apagar')){
        elemento.parentElement.remove();
        salvaTarefas();
    }
});



inputTarefas.addEventListener('keypress',(e)=>{
    if(e.keyCode === 13){
        if(!inputTarefas.value)return
        criaTarefa(inputTarefas.value)
        linpaInput();
    }
});

const criaTarefa =(texteInput)=>{
    const li = criaLi();
    li.innerText = texteInput
    tarefas.appendChild(li)
    linpaInput();
    criaBotaoApagar(li);
    salvaTarefas();


}

btnTarefa.addEventListener('click',()=>{
    if(!inputTarefas.value)return
    criaTarefa(inputTarefas.value)
    

});

const salvaTarefas=()=>{
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for(let tarefa of liTarefas ){
        let tarefasTexto = tarefa.innerText;
        tarefasTexto = tarefasTexto.replace('Apagar','').trim();
        listaDeTarefas.push(tarefasTexto);
    }
    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas',tarefasJSON);
}

// ler as tarefas  joga eles de volta no ul e mostra na tela
function adicionaTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas)
    
    for(let tarefa of listaDeTarefas){
        criaTarefa(tarefa);
    }
}
adicionaTarefasSalvas();
