<?php 
    include_once("ClassConexao.php");

    class ClassHistoricos extends ClassConexao{

        #exibir lista completa de Historicos
        public function listarHistoricos($idAluno)
        {
            $where = $idAluno!=""?"WHERE idAluno = ".$idAluno:"";
            
            $sql = "SELECT h.*, t.descricao, d.disciplina FROM historicos as h LEFT JOIN turmas as t on h.idTurma = t.id LEFT JOIN disciplinas as d on h.idDisciplina = d.id $where";
            $BFetch=$this->conectaDB()->prepare($sql);
            $BFetch->execute();

            $j=[];
            $i=0;
            
            while($Fetch=$BFetch->fetch(PDO::FETCH_ASSOC)){
                $j[$i]=[
                    "id"=>$Fetch['id'],
                    "idTurma"=>$Fetch['idTurma'],
                    "turma"=>$Fetch['descricao'],
                    "idDisciplina"=>$Fetch['idDisciplina'],
                    "disciplina"=>$Fetch['disciplina'],
                    "teste1"=>$Fetch['teste1'],
                    "teste2"=>$Fetch['teste2'],
                    "teste3"=>$Fetch['teste3'],
                    "teste4"=>$Fetch['teste4'],
                    "prova1"=>$Fetch['prova1'],
                    "prova2"=>$Fetch['prova2'],
                    "prova3"=>$Fetch['prova3'],
                    "prova4"=>$Fetch['prova4'],
                    "media1"=>$Fetch['media1'],
                    "media2"=>$Fetch['media2'],
                    "media3"=>$Fetch['media3'],
                    "media4"=>$Fetch['media4'],
                    "mediaAnual"=>$Fetch['mediaAnual'],
                    "recup"=>$Fetch['recup'],
                    "mediaFinal"=>$Fetch['mediaFinal']
                ];
                $i++;
            }

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");

            echo json_encode($j);
        }

        public function apagaHistorico($id)
        {
            //apaga Historico
            $BFetch=$this->conectaDB()->prepare("DELETE FROM historicos WHERE id=$id");
            $BFetch->execute();

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");

            echo '{"resp":"ok"}';
        }

        public function gravaHistorico($dados)
        {
            //$json = file_get_contents('php://input');
            $obj = json_decode($dados, TRUE);
            $idAluno = $obj['idAluno'];
            $idTurma = $obj['idTurma'];
            $idDisciplina = $obj['idDisciplina'];
         
            $sql = "INSERT INTO historicos (idAluno, idTurma, idDisciplina) VALUES ('$idAluno', '$idTurma', '$idDisciplina')";
            $BFetch=$this->conectaDB()->prepare($sql);
            $BFetch->execute();

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");
  
            //echo '{"resp":"ok"}';
        }

        public function atualizaHistorico()
        {
            $json = file_get_contents('php://input');
            $obj = json_decode($json, TRUE);

            $id = $obj['id'];
            $media1 = $obj['media1'];
            $media2 = $obj['media2'];
            $media3 = $obj['media3'];
            $media4 = $obj['media4'];
            $mediaAnual = $obj['mediaAnual'];
            $recup = $obj['recup'];
            $mediaFinal = $obj['mediaFinal'];

            $sql = "UPDATE historicos SET media1 = '$media1', media2 = '$media2', media3 = '$media3', media4 = '$media4', mediaAnual = '$mediaAnual', recup = '$recup', mediaFinal = '$mediaFinal' WHERE id = $id";
            $BFetch=$this->conectaDB()->prepare($sql);
            $BFetch->execute();

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");
  
            echo '{"resp":"ok", "sql":"'.$sql.'"}';
        }

    }
    
?>