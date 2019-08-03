<html>
<head>
 <title>Upload de imagens</title>
 <meta charset="utf-8">
 <meta name="viewport" content="width=device-width, initial-scale=1">
 <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
 <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
 <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
 <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
</head>

<body>
<div class="container">
<h2><strong>Envio de imagens</strong></h2><hr>

<form method="POST" enctype="multipart/form-data">
  <label for="conteudo">Enviar imagem:</label>
  <input type="file" name="file" accept="application/pdf, image/jpeg" class="form-control">

  <div align="center">
    <button type="submit" class="btn btn-success">Enviar imagem</button>
  </div>
</form>
 
<hr>
 
<?php
  if(isset($_FILES['file'])){
    $ext = strtolower(substr($_FILES['file']['name'],-4)); //Pegando extensão do arquivo
    $newName = date("Y.m.d-H.i.s") . $ext; //Definindo um novo nome para o arquivo
    $targetFolder = './imagens/'; //Diretório para uploads
    $targetFile = $targetFolder.$newName;
    $fileType=$_FILES['file']['type'];

    if ($fileType=="application/pdf" || $fileType=="image/jpeg") {

      if(move_uploaded_file($_FILES['file']['tmp_name'], $targetFile)){ //Fazer upload do arquivo

        echo "The file ". basename( $_FILES['file']['name']). " is uploaded";

        if ( $fileType=="image/gif" || $fileType=="image/jpeg") {
          echo '<div class="alert alert-success" role="alert" align="center">
          <img src="./imagens/' . $newName . '" class="img img-responsive img-thumbnail" width="200"> 
          <br>
          Imagem enviada com sucesso!
          <br>
          <a href="exemplo_upload_de_imagens.php">
          <button class="btn btn-default">Enviar nova imagem</button>
          </a></div>';
        }

      } else {

        echo "Problem uploading file";
        
      }
    
    } else {
    
      echo "You may only upload PDFs, JPEGs or GIF files.<br>";
    
    }
    
   
  } 
 ?>


</div>
<body>
</html>