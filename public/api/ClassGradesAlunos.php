<?php 
    include_once("ClassConexao.php");

    class ClassGradeAlunos extends ClassConexao{

        public function mostraGrade($turma, $show='true')
        {
            $BFetch=$this->conectaDB()->prepare("SELECT g.*, a.nome FROM gradesAlunos as g LEFT JOIN alunos as a on g.idAluno = a.id WHERE g.idTurma = $turma");
            $BFetch->execute();

            $j=[];
            $i=0;
            
            while($Fetch=$BFetch->fetch(PDO::FETCH_ASSOC)){
                $j[$i]=[
                    "id"=>$Fetch['id'],
                    "idTurma"=>$Fetch['idTurma'],
                    "nome"=>$Fetch['nome'],
                    "idAluno"=>$Fetch['idAluno']
                ];
                $i++;
            }

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");

            if($show=='false'){
                return json_encode($j);
            } else {
                echo json_encode($j);
            }
        }

        public function apagaGrade($id)
        {
            $BFetch=$this->conectaDB()->prepare("DELETE FROM gradesAlunos WHERE id=$id");
            $BFetch->execute();

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");

            echo '{"resp":"ok"}';
        }

        public function gravaGrade()
        {
            $json = file_get_contents('php://input');
            $obj = json_decode($json, TRUE);
            $idAluno = $obj['idAluno'];
            $idTurma = $obj['idTurma'];
         
            //grava aluno na grade fazendo a matrícula na turma
            $sql = "INSERT INTO gradesAlunos (idAluno, idTurma) VALUES ($idAluno, $idTurma)";
            $BFetch=$this->conectaDB()->prepare($sql);
            $BFetch->execute();

            //atualiza cadastro do aluno incluindo a turma
            include_once("ClassAlunos.php");
            $alunos = new ClassAlunos();
            $aluno = json_decode($alunos->atualizaTurmaDoAluno($idAluno, $idTurma), TRUE);
            
            //abre grade curricular da turma
            include_once("ClassTurmas.php");
            $turmas = new ClassTurmas();
            $turma = json_decode($turmas->exibeTurma($idTurma,'false'), TRUE);
            
            //abre grade curricular da turma
            include_once("ClassGradesCurriculares.php");
            $grades = new ClassGradesCurriculares();
            $disciplinas = json_decode($grades->mostraGrade($turma[0]['serie'], $turma[0]['horario']), TRUE);

            //print_r($disciplinas);
            include_once("ClassHistoricos.php");
            $historico = new ClassHistoricos();
            //percorre disciplinas da grade
            foreach($disciplinas as $disciplina){
                //adiciona historico para o aluno para cada disciplina para esta turma
                $dados = '{"idAluno":"'.$idAluno.'","idTurma":"'.$idTurma.'","idDisciplina":"'.$disciplina['idDisciplina'].'"}';
                if($historico->gravaHistorico($dados)=="ok"){
                    echo "ok";
                }
            }

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");
  
            echo '{"resp":"ok", "sql":"'.$sql.'"}';
        }

    }
  
    
?>