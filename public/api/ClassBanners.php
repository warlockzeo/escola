<?php 
    include_once("ClassConexao.php");

    header("Access-Control-Allow-Origin:*");
    header("Content-type: application/json");
    header("Access-Control-Allow-Methods: POST, PUT, DELETE, GET, OPTIONS");

    class ClassBanner extends ClassConexao{

        public function listBanner()
        {
            $sql = "SELECT * FROM banners";
            $BFetch=$this->conectaDB()->prepare($sql);
            $BFetch->execute();

            $j=[];
            $i=0;
            
            while($Fetch=$BFetch->fetch(PDO::FETCH_ASSOC)){
                $j[$i]=[
                    "id"=>$Fetch['id'],
                    "urlImage"=>$Fetch['urlImage'],
                    "posicao"=>$Fetch['posicao'],
                ];
                $i++;
            }

            if(count($j)>0){
                echo json_encode($j);
            } else {
                header("HTTP/1.0 404 - NOT FOUND");
            };
        }

        public function deleteBanner($id)
        {
            $sql = "SELECT * FROM banners where id = $id";
            $BFetch=$this->conectaDB()->prepare($sql);
            $BFetch->execute();

            $j=[];
            $i=0;
            while($Fetch=$BFetch->fetch(PDO::FETCH_ASSOC)){
                $j[$i]=[
                    "urlImage"=>$Fetch['urlImage']
                ];
                $i++;
            }

            $BFetch=$this->conectaDB()->prepare("DELETE FROM banners WHERE id=$id");
            if($BFetch->execute()){
                unlink('../assets/banners/' . $j[0]['urlImage']);
            }
            
            //header("HTTP/1.0 204 No Content");
        }

        public function saveBanner()
        {
            $json = file_get_contents('php://input');
            $obj = json_decode($json, TRUE);
            $urlImage = $obj['urlImage'];
            $posicao = $obj['posicao'];

            $sql = "INSERT INTO banners (urlImage, posicao) VALUES ('$urlImage', '$posicao')";
            $BFetch=$this->conectaDB()->prepare($sql);
            $BFetch->execute();
  
            echo '{"resp":"ok", "sql":"'.$sql.'"}';
        }
    }
  
    $banner = new ClassBanner();

    switch($_SERVER['REQUEST_METHOD']){
        case "GET":
            $banner->listBanner();
            break;
        case "POST":
            $banner->saveBanner();
            break;
        case "DELETE":
            $banner->deleteBanner($_GET['id']);
            break;
    }
?>