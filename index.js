let sys = {
     LoginsPermitidos: [{
        user:"Leal" , 
        password: "123"},{
        user:"Giovanna", 
        password: "123",
        }],
    adicionarUser: function() {
        LoginAcesso = document.getElementById('textUserlogin').value
        SenhaAcesso = document.getElementById('textUserpass').value

        let checar = this.LoginsPermitidos.some(function(e){
            return e.user == LoginAcesso && e.password == SenhaAcesso
        })
        checar == true  ? location.href = "./transactions.html" : alert('Login e senha invalidos')
    }
};

document.getElementById("primeiroBotao").addEventListener("click", sys.adicionarUser.bind(sys));

