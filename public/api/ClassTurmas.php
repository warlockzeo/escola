<?php 
    include_once("ClassConexao.php");

    class ClassTurmas extends ClassConexao{

        #exibir Turmas com Json
        public function listarTurmas($ano)
        {
            $BFetch=$this->conectaDB()->prepare("SELECT * FROM turmas WHERE ano = $ano ORDER BY descricao ASC");
            $BFetch->execute();

            $j=[];
            $i=0;
            
            while($Fetch=$BFetch->fetch(PDO::FETCH_ASSOC)){
                $j[$i]=[
                    "id"=>$Fetch['id'],
                    "ano"=>$Fetch['ano'],
                    "serie"=>$Fetch['serie'],
                    "descricao"=>$Fetch['descricao'],
                    "horario"=>$Fetch['horario']
                ];
                $i++;
            }

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");

            echo json_encode($j);
        }

        public function exibeTurma($id)
        {
            $sql = "SELECT * FROM turmas WHERE id = $id";
            $BFetch=$this->conectaDB()->prepare($sql);
            $BFetch->execute();

            $j=[];
            $i=0;
            
            while($Fetch=$BFetch->fetch(PDO::FETCH_ASSOC)){
                $j[$i]=[
                    "id"=>$Fetch['id'],
                    "serie"=>$Fetch['serie'],
                    "ano"=>$Fetch['ano'],
                    "descricao"=>$Fetch['descricao'],
                    "horario"=>$Fetch['horario']
                ];
                $i++;
            }

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");

            echo json_encode($j);
        }

        public function listarAnos()
        {
            $BFetch=$this->conectaDB()->prepare("SELECT DISTINCT ano  FROM turmas ORDER BY ano ASC");
            $BFetch->execute();

            $j=[];
            $i=0;
            
            while($Fetch=$BFetch->fetch(PDO::FETCH_ASSOC)){
                $j[$i]=[
                    "ano"=>$Fetch['ano']
                ];
                $i++;
            }

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");

            echo json_encode($j);
        }

        public function apagaTurma($id)
        {
            $BFetch=$this->conectaDB()->prepare("DELETE FROM turmas WHERE id=$id");
            $BFetch->execute();

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");

            echo '{"resp":"ok"}';
        }

        public function gravaTurma()
        {
            $json = file_get_contents('php://input');
            $obj = json_decode($json, TRUE);
            $ano = $obj['ano'];
            $serie = $obj['serie'];
            $descricao = $obj['descricao'];
            $horario = $obj['horario'];
         
            $sql = "INSERT INTO turmas (ano, serie, descricao, horario) VALUES ('$ano', '$serie', '$descricao', '$horario')";
            $BFetch=$this->conectaDB()->prepare($sql);
            $BFetch->execute();

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");
  
            echo '{"resp":"ok", "sql":"'.$sql.'"}';
        }

        public function atualizaTurma()
        {
            $json = file_get_contents('php://input');
            $obj = json_decode($json, TRUE);
            $id = $obj['id'];
            if($id){
                $ano = $obj['ano'];
                $serie = $obj['serie'];
                $descricao = $obj['descricao'];
                $horario = $obj['horario'];

                $sql = "UPDATE turmas SET ano = '$ano', serie = '$serie', descricao = '$descricao', horario = '$horario' WHERE id = $id";
                $BFetch=$this->conectaDB()->prepare($sql);
                $BFetch->execute();
            }

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");
  
            echo '{"resp":"ok", "sql":"'.$sql.'"}';
        }

    }
    
?>