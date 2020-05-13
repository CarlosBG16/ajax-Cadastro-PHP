<?
class DB {

//Dados de conexão
private static $info = [
"HOST" => "localhost",
"DB" => "teste",
"USER" => "root",
"PSWD" => ""
];




private static $instancia;


 public static function getInstancia() {
 
    if(!isset(self::$instancia)) {
    
      self::$instancia = new mysqli(
      self::$info["HOST"], self::$info["USER"] , 
      self::$info["PSWD"], self::$info["DB"]
      );
      
     if(!self::$instancia)
        die('Error ao Conectar: '.mysqli_connect_error());
     
     
 }
 
 return self::$instancia;
 }



 
 
 }

?>