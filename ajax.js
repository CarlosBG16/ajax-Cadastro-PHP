/*
#JAVASCRIPT AJAX - PHP
 #- SIGN-IN
 #- LIVE VALIDATE 
 
@date: 6/05/2020 01:38

*/


//Previnir 'saltos' 
$('#nome').on('keyup', () => {

$('form button').attr( "disabled" , "disabled" );
});


$('form button').click(() => {

if($('#data').val().length > 0)
   novo_usuario();

});



function validate(data,n,id) {

if(/[^A-Za-z0-9\s]/g.test(data)) {

 $('#'+id).addClass('erro');
 $('#info'+n).show().text("Não pode conter símbolos");
 
} else {

 $('#'+id).removeClass('erro');
 $('#info'+n).hide("");
 
 }
  
}



//reverse function ()

function reverse(str) {
 let l = str.length-1;
  let r = "";

  for( l; l >= 0; l--)
  {
    r += str[l];
    }

return r;
}



function encode (str) {

str = reverse(str);
str = btoa(str);

return str;
}


//Valores bolleanos para os campos verificados
let inputs = [
    false, //input text
    false //input password
];



function exibeDisponivel( id ) {

$('.msg'+id)
  .text("")
   .removeClass("red-text blue-text")
   .toggleClass('green-text')
  .text('disponível');

$('#icon'+id)
   .toggleClass('fa-check')

}


function exibeExiste( id ) {

$('.msg'+id)
 .text("")
 .removeClass("green-text blue-text")
 .toggleClass("red-text")
 .text(' já existe');

$('#icon'+id)
  .toggleClass('fa-check');
  

}




/*
@valor [string]
@numeroCampo (1 ou 2) [msg1 , msg2]
*/


/****** VERIFICAR VALOR () *****/


function verifica(valor , numeroCampo) {

if(valor.length <= 0 || valor == "")
  return;
  
  
//encode
valor = encode(valor);


//display loading
$('.msg'+numeroCampo)
  .show('fast')
  .text("")
  .html('')
  .removeClass("red-text green-text")
  .toggleClass('blue-text')
  .html('<img src="loader2.gif" width="30%" /> verificando..');

$('#icon'+numeroCampo)
   .toggleClass('fa-check');



/*
 1 => Nome
 2 => Senha
*/

let ajax = $.ajax({

    type: "POST",
    url: "user.php?t="+numeroCampo,
    data:{ key: valor }
    
  });
  
  ajax.done(function(resposta) {
   
   setTimeout(() => {
        
   if(resposta == 0) {
   
   exibeDisponivel( numeroCampo );
    
   setTimeout(() => $('.msg'+numeroCampo).fadeOut(200).hide() , 1000);
  
   inputs[numeroCampo-1] = true;
  
   } else {

   exibeExiste( numeroCampo );
   
  inputs[numeroCampo-1] = false;
 
   }
  
   // USER - PASSWORD = true?
   //hablitar botão de submit
   
   if(inputs[0]) /* && inputs[1] */
     $('form button').removeAttr("disabled");
          
          
  } , 1000);
  
});
 
 
  ajax.fail(function(erro) {

 // alert(erro);
 
  });
  

  


}








/****** NOVO USUÁRIO () *****/


function novo_usuario() {

let nome =  $('#nome').val() ,
    senha =  $('#senha').val() ,
      dataU =  $('#data').val();

//encoding
nome = encode(nome);
senha = encode(senha);
dataU = encode(dataU);


$('#loading').show('fast');


$.ajax({

    type: "POST" ,
    url: "user.php?new",
   data:{ 
    username: nome,
    password: senha,
    dataUser: dataU
  }
    
  })
  
  
  .done(function(resposta) {
  
  if(resposta) {
  
  setTimeout(() => {
  
  $('#nome , #senha , #data').val('');
  
  $('#loading').hide('fast');
  $('form button').attr( "disabled" , "disabled" );
  
  $('#sucesso').show('slow');
  
  setTimeout(() => $('#sucesso').fadeOut().hide() , 2100);

}, 1000);

} else {
  alert("Erro: "+resposta);
  $('#loading').hide('fast');
}

  })
  
  
  .fail(function(resposta) {
    
   alert(resposta);
    
  });
  
  

}