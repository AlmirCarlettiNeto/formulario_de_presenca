const form = document.getElementById("form");
const username = document.getElementById("username");
const cpf = document.getElementById("cpf");
const email = document.getElementById("email");
const sre = document.getElementById("sre")
const escola = document.getElementById("escola");

//funcao atrelada a verificacao dos erros de uma forma geral
function errorInput(input, message){
    const formItem = input.parentElement;
    const textMessage = formItem.querySelector("a")

    textMessage.innerText = message;

    formItem.className = "form-content error"
}

//funcao p impedir que envie o formulário caso de algum erro de preenchimento
function checkForm(){

    checkInputUsername();
    checkInputCpf();
    checkInputEmail();
    checkInputSRE();
    checkInputEscola();
    
    
    const formItems = form.querySelectorAll(".form-content")

    const isValid = [...formItems].every( (item) => {
        return item.className === "form-content"
    });
    
    if(isValid){
        alert("Presença enviada com sucesso.")
    }else{
        alert("Por favor, revise o formulário e preencha todos os campos corretamente.")
    }

}


//funcoes para verificar o preenchimento

function checkInputUsername(){
    const usernameValue = username.value;

    //verifica se o nome do usuário está vazio
    if (usernameValue === ""){
        errorInput(username, "Preencha seu nome completo");
    }else{
        const formItem = username.parentElement;
        formItem.className = "form-content"
    }
}

function checkInputCpf() {
    const cpfValue = cpf.value;

    if (cpfValue === "") {
        errorInput(cpf, "Insira um CPF");
    } else {
        // Remove quaisquer mensagens de erro existentes
        const formItem = cpf.parentElement;
        formItem.className = "form-content";

        // Valida o CPF
        if (!validarCPF(cpfValue)) {
            errorInput(cpf, "CPF inválido.");
        }
    }
}


function checkInputEmail(){
    const emailValue = email.value;

    if (emailValue === ""){
        errorInput(email, "Insira um enderço de e-mail");
    }else{
        const formItem = email.parentElement;
        formItem.className = "form-content"
    }
}

function checkInputSRE() {
    const sreValue = sre.value;

    if (sreValue === "") {
        errorInput(sre, "Por favor, selecione uma SRE.");
    } else {
        const formItem = sre.parentElement;
        formItem.className = "form-content";
    }
}

function checkInputEscola() {
    const escolaValue = escola.value;

    if (escolaValue === "") {
        errorInput(escola, "Por favor, selecione uma escola.");
    } else {
        const formItem = escola.parentElement;
        formItem.className = "form-content";
    }
}

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g,'');    
    if(cpf == '') return false; 
    // Elimina CPFs invalidos conhecidos
    if (cpf.length != 11)
            return false;       
    // Valida 1o digito 
    add = 0;
    for (i=0; i < 9; i ++)       
        add += parseInt(cpf.charAt(i)) * (10 - i);  
        rev = 11 - (add % 11);  
        if (rev == 10 || rev == 11)     
            rev = 0;    
        if (rev != parseInt(cpf.charAt(9)))     
            return false;       
    // Valida 2o digito 
    add = 0;  
    for (i = 0; i < 10; i ++)        
        add += parseInt(cpf.charAt(i)) * (11 - i);  
    rev = 11 - (add % 11);  
    if (rev == 10 || rev == 11) 
        rev = 0;    
    if (rev != parseInt(cpf.charAt(10)))
        return false;       
    return true;   
}

//verificacao durante o preenchimento (sem precisar enviar o formulário)
username.addEventListener("blur", (event) => {
    checkInputUsername();
})

    //a verificacao do cpf é mais sensível, assim que preenche os 11 dígitos já dispara na tela com a condição
cpf.addEventListener("input", (event) => {
    const cpfValue = event.target.value;

    // Verifica se o CPF tem 11 dígitos
    if (cpfValue.length === 11) {
        // Verifica se o CPF é válido
        if (!validarCPF(cpfValue)) {
            errorInput(cpf, "CPF inválido.");
        } else {
            // Remove quaisquer mensagens de erro existentes
            const formItem = cpf.parentElement;
            formItem.className = "form-content";
        }
    }
});

email.addEventListener("blur", (event) => {
    checkInputEmail();
})

sre.addEventListener("input", (event) => {
    checkInputSRE();
})

escola.addEventListener("input", (event) => {
    checkInputEscola();
})

//faz a verificação final do formulário inteiro antes de enviar. Se tiver erro, não envia.
form.addEventListener("submit", (event) => {
    event.preventDefault();

    checkForm();
})
