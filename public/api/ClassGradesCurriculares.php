<?php 
    include_once("ClassConexao.php");

    class ClassGradesCurriculares extends ClassConexao{

        #exibir Grades Curriculares com Json
        public function listaGrades()
        {
            $BFetch=$this->conectaDB()->prepare("SELECT g.*, d.disciplina FROM gradesCurriculares as g LEFT JOIN disciplinas as d on d.id = g.idDisciplina ORDER BY g.serie ASC, g.idTurma ASC, d.disciplina ASC");
            $BFetch->execute();

            $j=[];
            $i=0;
            
            while($Fetch=$BFetch->fetch(PDO::FETCH_ASSOC)){
                $j[$i]=[
                    "id"=>$Fetch['id'],
                    "serie"=>$Fetch['serie'],
                    "idDisciplina"=>$Fetch['idDisciplina'],
                    "disciplina"=>$Fetch['disciplina'],
                    "idTurma"=>$Fetch['idTurma'],
                    "idProfessor"=>$Fetch['idProfessor']
                ];
                $i++;
            }

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");

            echo json_encode($j);
        }

        public function mostraGrade($serie)
        {
            if(!$serie>0){
                $json = file_get_contents('php://input');
                $obj = json_decode($json, TRUE);
                $serie = $obj['serie'];
            }


            $BFetch=$this->conectaDB()->prepare("SELECT g.*, d.disciplina FROM gradesCurriculares as g LEFT JOIN disciplinas as d on d.id = g.idDisciplina WHERE g.serie = '".$serie."' ORDER BY g.serie ASC, g.idTurma ASC, d.disciplina ASC");
            $BFetch->execute();

            $j=[];
            $i=0;
            
            while($Fetch=$BFetch->fetch(PDO::FETCH_ASSOC)){
                $j[$i]=[
                    "id"=>$Fetch['id'],
                    "serie"=>$Fetch['serie'],
                    "idDisciplina"=>$Fetch['idDisciplina'],
                    "disciplina"=>$Fetch['disciplina'],
                    "idTurma"=>$Fetch['idTurma'],
                    "idProfessor"=>$Fetch['idProfessor']
                ];
                $i++;
            }

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");

            //echo json_encode($j);
            return json_encode($j);
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
            $idDisciplina = $obj['idDisciplina'];
            $idTurma = isset($obj['idTurma']) ? $obj['idTurma'] : "0";
            $idProfessor = isset($obj['idProfessor']) ? $obj['idProfessor'] : "0";
         
            $sql = "INSERT INTO gradesCurriculares (serie, idDisciplina, idTurma, idProfessor) VALUES ('$serie', $idDisciplina, $idTurma, $idProfessor)";
            $BFetch=$this->conectaDB()->prepare($sql);
            $BFetch->execute();

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");
  
            echo '{"resp":"ok", "sql":"'.$sql.'"}';
        }

    }
    
?>