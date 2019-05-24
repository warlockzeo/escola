<form method="post" name="dados" enctype="multipart/form-data">
<tr>
      <th scope="row"><div align="right">Foto</div></th>
      <td><input name="logo" type="file" id="logo"></td>
    </tr>

    <tr>
      <th scope="row">&nbsp;</th>
      <td><input name="btnSubmit" type="submit" id="btnSubmit" value="Enviar" /></td>
    </tr>
</form>
<?php 

$json = file_get_contents('php://input');
$obj = json_decode($json, TRUE);



 //RECEBE DADOS DO FORMULÁRIO               
 $pFoto = $_FILES["logo"]["tmp_name"];   
 $pTipo = $_FILES["logo"]["type"];  
 
 //$pFoto = $obj['logo'];   
 //$pTipo = $obj['tipo'];  
 
 //MOVE                                     
 //move_uploaded_file($logo, "latest.img");  
 


// The file
//$filename = 'logo.jpg';
$filename = $pFoto;

// Set a maximum height and width
$width = 200;
$height = 200;

// Content type
//header('Content-Type: image/jpeg');

// Get new dimensions
list($width_orig, $height_orig) = getimagesize($filename);

$ratio_orig = $width_orig/$height_orig;

if ($width/$height > $ratio_orig) {
   $width = $height*$ratio_orig;
} else {
   $height = $width/$ratio_orig;
}

// Resample
$image_p = imagecreatetruecolor($width, $height);
$image = imagecreatefromjpeg($filename);
$foto = imagecopyresampled($image_p, $image, 0, 0, 0, 0, $width, $height, $width_orig, $height_orig);

$dir = '/fotos/';
// Se pasta não existir
if(!is_dir($dir)){
	//cria pasta
	mkdir($dir);
	//cria pasta thumbnail
	mkdir($dir.'thumbnail/');
} 

// Output
imagejpeg($image_p, '/logo.jpg', 100);



 header("Access-Control-Allow-Origin:*");
 header("Content-type: application/json");

 //print_r($obj);
 echo '{"resp": "ok"}';

?>