<?php 
    include_once("ClassConexao.php");

    header("Access-Control-Allow-Origin:*");
    header("Content-type: application/json");
    header("Access-Control-Allow-Methods: POST, PUT, GET, OPTIONS");

    class ClassFiles extends ClassConexao {
        public function uploadFile() {
            if(isset($_FILES['file'])){
                $fileName = $_FILES['file']['name'];
                $targetFolder = '../circulares/';
                $targetFile = $targetFolder . $fileName;
                $fileType=$_FILES['file']['type'];
            
                if ($fileType=="application/pdf") {
            
                  if(move_uploaded_file($_FILES['file']['tmp_name'], $targetFile)){
                    echo '{"resp":"O arquivo ' . basename( $_FILES['file']['name']) . ' foi enviado"}';
                  } else { echo '{"resp":"Problema ao enviar arquivo"}'; }
                } else { echo '{"resp":"Somente arquivos do tipo PDF"}'; }
            } 
        }

        public function listFiles() {
            echo '{"resp":"Lista de arquivos"}';
        }

        public function deleteFile() {
            header("HTTP/1.0 204 No Content");
            //codigo para apagar arquivo
        }
    }

    $files = new ClassFiles();

    switch($_SERVER['REQUEST_METHOD']){
    case "GET":
        $files->listFiles();
        break;
    case "POST":
        $files->uploadFile();
        break;
    case "DELETE":
        $files->deleteFile();
        break;
    }

?>