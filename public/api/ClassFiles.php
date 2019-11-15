<?php 
    include_once("ClassConexao.php");

    header("Access-Control-Allow-Origin:*");
    header("Content-type: application/json");
    header("Access-Control-Allow-Methods: POST, PUT, GET, DELETE, OPTIONS");

    class ClassFiles extends ClassConexao {
        public function saveFileDb() {
            $json = file_get_contents('php://input');
            $obj = json_decode($json, TRUE);

            $nomeArquivo = $obj['nomeArquivo'];
            $destinatario = $obj['destinatario'];
         
            $sql = "INSERT INTO files (nomeArquivo, destinatario) VALUES ('$nomeArquivo', '$destinatario')";
            $BFetch = $this->conectaDB()->prepare($sql);
            $BFetch->execute(); 

            echo '{"resp":"O arquivo ' . $nomeArquivo . ' foi salvo no DB"}';
        }

        public function uploadFile() {
            $fileName = $_FILES['file']['name'];
            //$targetFolder = '../circulares/';
            //$targetFile = $targetFolder . $fileName;
            $fileType=$_FILES['file']['type'];
        
            switch($fileType) {
                case "application/pdf":
                    if(move_uploaded_file($_FILES['file']['tmp_name'], '../circulares/'.$fileName)){
                        echo '{"resp":"O arquivo ' . basename( $_FILES['file']['name']) . ' foi enviado"}';
                    } else { 
                        echo '{"resp":"Problema ao enviar arquivo"}'; 
                    }
                    break;
                case "image/jpeg":
                    if(move_uploaded_file($_FILES['file']['tmp_name'], '../assets/banners/'.$fileName)){
                        echo '{"resp":"O arquivo ' . basename( $_FILES['file']['name']) . ' foi enviado"}';
                    } else { 
                        echo '{"resp":"Problema ao enviar arquivo"}'; 
                    }
                    break;
                default:
                    echo '{"resp":"Tipo de arquivo não permitido" . '.$fileType.'}'; 
            }
        }

        public function listFiles() {
            $whereEscola = isset($_GET['idEscola']) ?"idEscola = $_GET[idEscola]":"";
            $whereId = $_GET['id']<>0 ?"id = $_GET[id]":"";
            $whereDestinatario = isset($_GET['destinatario']) ?"whereDestinatario = $_GET[destinatario]":"";
            if($whereEscola<>"" AND ($whereId<>"" OR $whereDestinatario<>"")){$whereEscola = $whereEscola . ", "; }
            $where = $whereId<>"" || $whereEscola<>"" || $whereDestinatario<>"" ?"WHERE $whereEscola $whereId $whereDestinatario":"";
            $sql = "SELECT * FROM files $where ORDER BY destinatario";
            $BFetch=$this->conectaDB()->prepare($sql);
            $BFetch->execute();
            
            $j=[];
            $i=0;

            while($Fetch=$BFetch->fetch(PDO::FETCH_ASSOC)){
                $j[$i]=[
                    "id"=>$Fetch['id'],
                    "nomeArquivo"=>$Fetch['nomeArquivo'],
                    "destinatario"=>$Fetch['destinatario']
                ];
                $i++;
            }
        
            if(count($j)>0){
                echo json_encode($j);
            }else if(count($j)==0){
               // header("HTTP/1.0 404 - NOT FOUND");
               echo $sql;
            }else {
                echo json_encode($j[0]);
            }
        }

        public function deleteFile() {
            $json = file_get_contents('php://input');
            $obj = json_decode($json, TRUE);

            $id = $obj['id'];
         
            $sql = "DELETE FROM files WHERE id = $id";
            $BFetch = $this->conectaDB()->prepare($sql);
            $BFetch->execute(); 

            echo '{"resp":"O arquivo ' . $nomeArquivo . ' foi salvo no DB"}';

            header("HTTP/1.0 204 No Content");
        }
    }

    $files = new ClassFiles();

    switch($_SERVER['REQUEST_METHOD']){
    case "GET":
        $files->listFiles();
        break;
    case "POST":
        (isset($_FILES['file']))? $files->uploadFile() : $files->saveFileDb();
        break;
    case "DELETE":
        $files->deleteFile();
        break;
    }

?>