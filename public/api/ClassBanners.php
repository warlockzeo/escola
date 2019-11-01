<?php 
    include_once("ClassConexao.php");

    header("Access-Control-Allow-Origin:*");
    header("Content-type: application/json");
    header("Access-Control-Allow-Methods: POST, PUT, GET, OPTIONS");

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
                ];
                $i++;
            }

            if(count($j)>1){
                echo json_encode($j);
            }else if(count($j)==0){
                header("HTTP/1.0 404 - NOT FOUND");
            }else {
                echo json_encode($j[0]);
            };
        }

        public function deleteBanner($id)
        {
            $BFetch=$this->conectaDB()->prepare("DELETE FROM banners WHERE id=$id");
            $BFetch->execute();

            header("HTTP/1.0 204 No Content");
        }

        public function saveBanner()
        {
            $json = file_get_contents('php://input');
            $obj = json_decode($json, TRUE);
            $urlImage = $obj['urlImage'];

            $sql = "INSERT INTO banners (urlImage) VALUES ('$urlImage')";
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
            $banner->deleteBanner();
            break;
    }
?>