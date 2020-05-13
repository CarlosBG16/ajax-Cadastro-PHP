<?php
include_once("db.php");

function decode($dado) {
//decode
$dado = base64_decode($dado);
$dado = strrev($dado);

return $dado;
}



function clean($dado , $replace = true ) {
//clear
$dado = htmlspecialchars($dado);
$dado = stripcslashes($dado);
$dado = trim($dado);

//replaced
return $replace ? preg_replace("/[^A-Za-z0-9\s]/","",$dado) : $dado;
}


/**********   ***********/

class User {

//Dados do usuário
private $nome;
private $senha;
private $data;

//instância MYSQLI
private $Database;


public function __construct() {

//Objecto de conexão a base de dados
$this->Database = DB::getInstancia();


}


private function hashPassword( $text ) {

$text = password_hash( $text , PASSWORD_BCRYPT , [ 'cost' => 11 ] );

return $text;

}


public function existe( $valor , $campo ) {

$SQL = "SELECT ID FROM `USER` WHERE `$campo` =  ?  LIMIT 5";

if($cmd = $this->Database->prepare($SQL)) {

  $cmd->bind_param("s" , $valor );

   if($cmd->execute()) {
   
       if($cmd->fetch() >= 1)
           echo true;
          else
           echo false;
          
   } else
       die("Erro: ".$cmd->error);
   
   
  } else {
    die("Erro: ".$this->Database->error);
  }
  
$this->Database->close();
}



public function setUser( $nome , $senha , $data ) {

//receber os dados e validar
$this->nome =  $nome ;
$this->data =  $data;
$this->senha = $senha;

//criptografar
$this->senha = $this->hashPassword( $this->senha );


$SQL = "INSERT INTO USER VALUES (0,?,?,?) ;";

if($cmd = $this->Database->prepare($SQL)) {
 
    $cmd->bind_param("sss", $this->nome , $this->senha , $this->data );
 
    if($cmd->execute())
         echo 'adicionado com sucesso';
      else
         echo print_r($cmd->error);
      
 } else {
    echo $this->Database->error;
 }
 

$this->Database->close();
}


}



/**********   ***********/


if(isset($_GET['t'])) {

$usuario = new User();

$campo = (int) $_GET['t'] == 1 ? "NOME" : "SENHA" ;

$valor = $_POST['key'];

$valor = clean( decode( $valor ) );


$usuario->existe( $valor , $campo );
}


 
 
if(isset($_GET['new'])) {

$usuario = new User();

$nome = clean( decode( $_POST['username'] ) );
$senha = clean( decode( $_POST['password'] ) );
$data = clean( decode( $_POST['dataUser'] , false));

$usuario->setUser( $nome , $senha , $data );

}
  
unset($usuario);
?>