<?php 
    include_once("ClassConexao.php");

    header("Access-Control-Allow-Origin:*");
    header("Content-type: application/json");
    header("Access-Control-Allow-Methods: POST, PUT, GET, OPTIONS");
    
    class ClassEscola extends ClassConexao{

        public function showEscola()
        {
            $where = $_GET['id']>0 ?"WHERE id = $_GET[id]":"";
            $sql = "SELECT * FROM escola $where";
            $BFetch=$this->conectaDB()->prepare($sql);
            $BFetch->execute();
            
            $j=[];
            $i=0;

            while($Fetch=$BFetch->fetch(PDO::FETCH_ASSOC)){
                $j[$i]=[
                    "id"=>$Fetch['id'],
                    "nomeEscola"=>$Fetch['nomeEscola'],
                    "telefones"=>$Fetch['telefones'],
                    "email"=>$Fetch['email'],
                    "endereco" => $Fetch['endereco'],
                    "cidade" => $Fetch['cidade'],
                    "uf" => $Fetch['uf'],
                    "sobre" => $Fetch['sobre'],
                    "infantil" => $Fetch['infantil'],
                    "fundamental1" => $Fetch['fundamental1'],
                    "fundamental2" => $Fetch['fundamental2']
                ];
                $i++;
            }
        
            if(count($j)>1){
                echo json_encode($j);
            }else if(count($j)==0){
                header("HTTP/1.0 404 - NOT FOUND");
            }else {
                echo json_encode($j[0]);
            }
        }

        public function deleteEscola()
        {
            $sql = "DELETE FROM escola WHERE id = $_GET[id]";
            $BFetch=$this->conectaDB()->prepare($sql);
            $BFetch->execute();
 
            header("HTTP/1.0 204 No Content");
        }

        public function saveEscola()
        {
            $json = file_get_contents('php://input');
            $obj = json_decode($json, TRUE);

            $nomeEscola = $obj['nomeEscola'];
            $telefones = $obj['telefones'];
            $email = $obj['email']?$obj['email']:'';
            $endereco = $obj['endereco'];
            $cidade = $obj['cidade'];
            $uf = $obj['uf'];
            $sobre = isset($obj['sobre'])?$obj['sobre']:'';
            $infantil = isset($obj['infantil'])?$obj['infantil']:'';
            $fundamental1 = isset($obj['fundamental1'])?$obj['fundamental1']:'';
            $fundamental2 = isset($obj['fundamental2'])?$obj['fundamental2']:'';
         
            $sqlInsert = "INSERT INTO escola (nomeEscola, telefones, email, endereco, cidade, uf, sobre, infantil, fundamental1, fundamental2) VALUES ('$nomeEscola', '$telefones', '$email', '$endereco', '$cidade', '$uf', '$sobre', '$infantil', '$fundamental1', '$fundamental2')";
            $BFetch = $this->conectaDB()->prepare($sqlInsert);
            $BFetch->execute(); 
            
            $sqlSelect = "SELECT id FROM escola ORDER BY id DESC LIMIT 1";
            $BFetch = $this->conectaDB()->prepare($sqlSelect);
            $BFetch->execute();
            $Fetch = $BFetch->fetch(PDO::FETCH_ASSOC);

            $id = $Fetch['id'];

            //header("Location: /api/escola/$id");
  
            echo '{"resp":"ok", "sql":"'.$sqlInsert.'"}';
        }

        public function updateEscola()
        {
            $json = file_get_contents('php://input');
            $obj = json_decode($json, TRUE);
            
            //echo $json;

            $id = $obj['id'];

            if($id){
                $virgula = count($obj)>2?",":'';
                $nomeEscola = isset($obj['nomeEscola'])? "nomeEscola='".$obj['nomeEscola']."'".$virgula:'';
                $telefones = isset($obj['telefones'])? "telefones='".$obj['telefones']."'".$virgula:'';
                $email = isset($obj['email'])? "email='".$obj['email']."'".$virgula:'';
                $endereco = isset($obj['endereco'])? "endereco='".$obj['endereco']."'".$virgula:'';
                $cidade = isset($obj['cidade'])? "cidade='".$obj['cidade']."'".$virgula:'';
                $uf = isset($obj['uf'])? "uf='".$obj['uf']."'":'';
                $sobre = isset($obj['sobre'])? "sobre='".$obj['sobre']."'":'';
                $infantil = isset($obj['infantil'])? "infantil='".$obj['infantil']."'".$virgula:'';
                $fundamental1 = isset($obj['fundamental1'])? "fundamental1='".$obj['fundamental1']."'".$virgula:'';
                $fundamental2 = isset($obj['fundamental2'])? "fundamental2='".$obj['fundamental2']."'":'';

                $sql = "UPDATE escola SET $nomeEscola $telefones $email $cidade $uf $sobre $infantil $fundamental1 $fundamental2 WHERE id = $id";
                $BFetch=$this->conectaDB()->prepare($sql);
                $BFetch->execute();
            }
            //header("HTTP/1.0 204 No Content");
            echo "{'resp':'ok'}";
        }

    }
  
    $escola = new ClassEscola();

    switch($_SERVER['REQUEST_METHOD']){
        case "GET":
            $escola->showEscola();
            break;
        case "POST":
            $escola->saveEscola();
            break;
        case "PUT":
            $escola->updateEscola();
            break;
        case "DELETE":
            $escola->deleteEscola();
            break;
    }
?>