<?php 
    include_once("ClassConexao.php");

    class ClassGradesCurriculares extends ClassConexao{

        #exibir Grades Curriculares com Json
        public function listaGrades()
        {
            $sql = "SELECT g.*, d.disciplina, p.nome FROM gradesCurriculares as g LEFT JOIN disciplinas as d on d.id = g.idDisciplina LEFT JOIN professores as p on p.id = g.idProfessor ORDER BY g.serie ASC, g.idTurma ASC, d.disciplina ASC";
            $BFetch=$this->conectaDB()->prepare($sql);
            $BFetch->execute();

            $j=[];
            $i=0;
            
            while($Fetch=$BFetch->fetch(PDO::FETCH_ASSOC)){
                $j[$i]=[
                    "id"=>$Fetch['id'],
                    "serie"=>$Fetch['serie'],
                    "horario"=>$Fetch['horario'],
                    "idDisciplina"=>$Fetch['idDisciplina'],
                    "disciplina"=>$Fetch['disciplina'],
                    "idTurma"=>$Fetch['idTurma'],
                    "idProfessor"=>$Fetch['idProfessor'],
                    "professor"=>$Fetch['nome']
                ];
                $i++;
            }

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");

            echo json_encode($j);
        }

        public function mostraGrade($get_serie, $get_horario="")
        {
            if(!$get_serie>0){
                $json = file_get_contents('php://input');
                $obj = json_decode($json, TRUE);
                $serie = $obj['serie'];
            } else {
                $serie = $get_serie;
            }

            
            $horario = $get_horario != "" ? " AND horario = '".$get_horario."'":"";

            $sql = "SELECT g.*, d.disciplina, p.nome FROM gradesCurriculares as g LEFT JOIN disciplinas as d on d.id = g.idDisciplina LEFT JOIN professores as p on p.id = g.idProfessor WHERE g.serie = '".$serie."' ".$horario." ORDER BY g.serie ASC, g.idTurma ASC, d.disciplina ASC";
            $BFetch=$this->conectaDB()->prepare($sql);
            $BFetch->execute();

            $j=[];
            $i=0;
            
            while($Fetch=$BFetch->fetch(PDO::FETCH_ASSOC)){
                $j[$i]=[
                    "id"=>$Fetch['id'],
                    "serie"=>$Fetch['serie'],
                    "horario"=>$Fetch['horario'],
                    "idDisciplina"=>$Fetch['idDisciplina'],
                    "disciplina"=>$Fetch['disciplina'],
                    "idTurma"=>$Fetch['idTurma'],
                    "idProfessor"=>$Fetch['idProfessor'],
                    "professor"=>$Fetch['nome']
                ];
                $i++;
            }

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");

            //echo (sizeof($j));
            if(sizeof($j)>0){
                if($get_serie>0){
                    return json_encode($j);
                } else {
                    $data = json_encode($j);
                    echo '{"resp":"ok", "sql":"'.$sql.'", "data":'.$data.'}';
                }
            } else {
                echo '{"resp":"erro", "sql":"'.$sql.'"}';
            }
        }

        public function apagaGrade($id)
        {
            $BFetch=$this->conectaDB()->prepare("DELETE FROM gradesCurriculares WHERE id=$id");
            $BFetch->execute();

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");

            echo '{"resp":"ok"}';
        }

        public function gravaGrade()
        {
            $json = file_get_contents('php://input');
            $obj = json_decode($json, TRUE);
            $serie = $obj['serie'];
            $horario = $obj['horario'];
            $idDisciplina = $obj['idDisciplina'];
            $idTurma = isset($obj['idTurma']) ? $obj['idTurma'] : "0";
            $idProfessor = isset($obj['idProfessor']) ? $obj['idProfessor'] : "0";
         
            $sql = "INSERT INTO gradesCurriculares (serie, horario, idDisciplina, idTurma, idProfessor) VALUES ('$serie', '$horario', $idDisciplina, $idTurma, $idProfessor)";
            $BFetch=$this->conectaDB()->prepare($sql);
            $BFetch->execute();

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");
  
            echo '{"resp":"ok", "sql":"'.$sql.'"}';
        }

    }
    
?>