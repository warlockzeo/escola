<?php 
  class ClassEmail {
    #exibir lista completa de Alunos
    public function enviarEmail()
    {
      $json = file_get_contents('php://input');
      $obj = json_decode($json, TRUE);
      $nome = $obj['nome'];
      $email = $obj['email'];
      $cidade = $obj['cidade'];
      $uf = $obj['uf'];
      $telefone = $obj['telefone'];
      $mensagem = $obj['mensagem'];
              
      // Preparando para enviar email
      /* recipientes */
      $to = "secretaria@sagradocoracaovertentes.com.br"; 
      $to = $to . ", warlockzeo@gmail.com";

      /* assunto */
      $subject = "Mensagem do Educandário Sagrado Coração de Jesus";

      /* menssagem */
      $message = "
      \n
      Nome: $nome \n
      \n
      $cidade - $uf \n
      $telefone \n\n
      $email \n
      \n
      $mensagem
      \n
      ";

      //header("Access-Control-Allow-Origin:*");
      //header("Content-type: application/json");

      $headers='';

      /* enviando o email */
      if(mail($to, $subject, $message, $headers)){
          echo '{"resp":"Enviado"}';
      } else {
          echo '{"resp":"erro"}';
      }

      //email enviado
    }
  }
?>