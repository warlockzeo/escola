<?php 
    include("ClassConexao.php");

    class ClassDisciplinas extends ClassConexao{

        #exibir Alunos com Json
        public function listaDisciplinas()
        {
            $BFetch=$this->conectaDB()->prepare("SELECT * FROM disciplinas ORDER BY disciplina ASC");
            $BFetch->execute();

            $j=[];
            $i=0;
            
            while($Fetch=$BFetch->fetch(PDO::FETCH_ASSOC)){
                $j[$i]=[
                    "id"=>$Fetch['id'],
                    "disciplina"=>$Fetch['disciplina']
                ];
                $i++;
            }

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");

            if(count($j)>0){
                echo json_encode($j);
            }else{
                echo '{"resp":"erro"}';
            }
        }

        public function apagaDisciplina($id)
        {
            $BFetch=$this->conectaDB()->prepare("DELETE FROM disciplinas WHERE id=$id");
            $BFetch->execute();

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");

            echo '{"resp":"ok"}';
        }

        public function gravaDisciplina()
        {
            $json = file_get_contents('php://input');
            $obj = json_decode($json, TRUE);
            $disciplina = $obj['disciplina'];
         
            $sql = "INSERT INTO disciplinas (disciplina) VALUES ('$disciplina')";
            $BFetch=$this->conectaDB()->prepare($sql);
            $BFetch->execute();

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");
  
            echo '{"resp":"ok", "sql":"'.$sql.'"}';
        }

    }
    
?>