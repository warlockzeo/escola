<?php 
    include("ClassConexao.php");

    class ClassFaltas extends ClassConexao{

        #exibir Faltas com Json
        public function listarFaltas($idAluno,$idTurma)
        {
            $BFetch=$this->conectaDB()->prepare("SELECT * FROM faltas WHERE idAluno=$idAluno AND idTurma = $idTurma GROUP BY data");
            $BFetch->execute();

            $j=[];
            $i=0;
            
            while($Fetch=$BFetch->fetch(PDO::FETCH_ASSOC)){
                $j[$i]=[
                    "id"=>$Fetch['id'],
                    "data"=>$Fetch['data'],
                    "disciplina"=>$Fetch['disciplina'],
                    "justificativa"=>$Fetch['justificativa']
                ];
                $i++;
            }

            //header("Access-Control-Allow-Origin:*");
            //header("Content-type: application/json");

            echo json_encode($j);
        }

        public function gravaFalta()
        {
            $json = file_get_contents('php://input');
            $obj = json_decode($json, TRUE);
            $data = $obj['data'];
            $idAluno = $obj['idAluno'];
            $idTurma = $obj['idTurma'];
            $disciplina = $obj['disciplina'];
         
            $sql = "INSERT INTO faltas (data, idAluno, idTurma, disciplina) VALUES ('$data', $idAluno, $idTurma, '$disciplina')";
            $BFetch=$this->conectaDB()->prepare($sql);
            $BFetch->execute();

            //header("Access-Control-Allow-Origin:*");
            //header("Content-type: application/json");
  
            echo '{"resp":"ok", "sql":"'.$sql.'"}';
        }

        public function justificaFalta()
        {
            $json = file_get_contents('php://input');
            $obj = json_decode($json, TRUE);
            $data = $obj['data'];
            if($data){
                $data = $obj['data'];
                $justificativa = $obj['justificativa'];

                $sql = "UPDATE faltas SET justificativa = '$justificativa' WHERE data = '$data'";
                $BFetch=$this->conectaDB()->prepare($sql);
                $BFetch->execute();
            }

            //header("Access-Control-Allow-Origin:*");
            //header("Content-type: application/json");
  
            echo '{"resp":"ok", "sql":"'.$sql.'"}';
        }

    }
    
?>