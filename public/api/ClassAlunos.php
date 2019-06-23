<?php 
    include_once("ClassConexao.php");

    class ClassAlunos extends ClassConexao{

        #exibir lista completa de Alunos
        public function listaAlunos()
        {
            $sql = "SELECT a.*, t.descricao FROM alunos as a LEFT JOIN turmas as t on t.id = a.turma ORDER BY nome ASC";
            //$sql = "SELECT * FROM alunos ORDER BY nome ASC";
            $BFetch=$this->conectaDB()->prepare($sql);
            $BFetch->execute();

            $j=[];
            $i=0;
            
            while($Fetch=$BFetch->fetch(PDO::FETCH_ASSOC)){
                $j[$i]=[
                    "id"=>$Fetch['id'],
                    "nome"=>$Fetch['nome'],
                    "endereco" => $Fetch['endereco'],
                    "cidade" => $Fetch['cidade'],
                    "uf" => $Fetch['uf'],
                    "mae" => $Fetch['mae'],
                    "pai" => $Fetch['pai'],
                    "fonePai" => $Fetch['fonePai'],
                    "foneMae" => $Fetch['foneMae'],
                    "responsavel" => $Fetch['responsavel'],
                    "dataNasc" => $Fetch['dataNasc'],
                    "sexo" => $Fetch['sexo'],
                    "obs" => $Fetch['obs'],
                    //"turma" => $Fetch['turma'],
                    "turma" => $Fetch['descricao'],
                ];
                $i++;
            }

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");

            echo json_encode($j);
        }

        #lista Alunos MATRICULADOS ESTE ANO com Json
        public function listaAlunosComMatricula($ano)
        {
            $sql = "SELECT a.*, g.*, t.* FROM alunos as a LEFT JOIN gradesAlunos as g on g.idAluno = a.id LEFT JOIN turmas as t on g.idTurma = t.id WHERE t.ano = $ano  ORDER BY a.nome";
            $BFetch=$this->conectaDB()->prepare($sql);
            $BFetch->execute();

            $j=[];
            $i=0;
            
            while($Fetch=$BFetch->fetch(PDO::FETCH_ASSOC)){
                $j[$i]=[
                    "id"=>$Fetch['id'],
                    "nome"=>$Fetch['nome'],
                    "endereco" => $Fetch['endereco'],
                    "cidade" => $Fetch['cidade'],
                    "uf" => $Fetch['uf'],
                    "mae" => $Fetch['mae'],
                    "pai" => $Fetch['pai'],
                    "fonePai" => $Fetch['fonePai'],
                    "foneMae" => $Fetch['foneMae'],
                    "responsavel" => $Fetch['responsavel'],
                    "dataNasc" => $Fetch['dataNasc'],
                    "sexo" => $Fetch['sexo'],
                    "obs" => $Fetch['obs']
                ];
                $i++;
            }

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");

            echo json_encode($j);
        }

        #lista Alunos NÃO MATRICULADOS ESTE ANO com Json
        public function listaAlunosSemMatricula($ano)
        {
            $sql = "SELECT * FROM alunos WHERE NOT id IN (SELECT g.idAluno FROM gradesAlunos as g LEFT JOIN turmas as t on g.idTurma = t.id WHERE t.ano = $ano) ORDER BY nome";
            $BFetch=$this->conectaDB()->prepare($sql);
            $BFetch->execute();

            $j=[];
            $i=0;
            
            while($Fetch=$BFetch->fetch(PDO::FETCH_ASSOC)){
                $j[$i]=[
                    "id"=>$Fetch['id'],
                    "nome"=>$Fetch['nome'],
                    "endereco" => $Fetch['endereco'],
                    "cidade" => $Fetch['cidade'],
                    "uf" => $Fetch['uf'],
                    "mae" => $Fetch['mae'],
                    "pai" => $Fetch['pai'],
                    "fonePai" => $Fetch['fonePai'],
                    "foneMae" => $Fetch['foneMae'],
                    "responsavel" => $Fetch['responsavel'],
                    "dataNasc" => $Fetch['dataNasc'],
                    "sexo" => $Fetch['sexo'],
                    "obs" => $Fetch['obs']
                ];
                $i++;
            }

            header('Access-Control-Allow-Origin: *');  
            header("Content-type: application/json");

            echo json_encode($j);
        }
                
        public function exibeAluno($id)
        {
            $sql = "SELECT * FROM alunos WHERE id = $id";
            $BFetch=$this->conectaDB()->prepare($sql);
            $BFetch->execute();

            $j=[];
            $i=0;
            while($Fetch=$BFetch->fetch(PDO::FETCH_ASSOC)){
                $j[$i]=[
                    "id"=>$Fetch['id'],
                    "nome"=>$Fetch['nome'],
                    "endereco" => $Fetch['endereco'],
                    "cidade" => $Fetch['cidade'],
                    "uf" => $Fetch['uf'],
                    "mae" => $Fetch['mae'],
                    "pai" => $Fetch['pai'],
                    "fonePai" => $Fetch['fonePai'],
                    "foneMae" => $Fetch['foneMae'],
                    "responsavel" => $Fetch['responsavel'],
                    "dataNasc" => $Fetch['dataNasc'],
                    "sexo" => $Fetch['sexo'],
                    "obs" => $Fetch['obs']
                ];
                $i++;
            }

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");

            if(count($j)>0){
                echo '{"resp":' . json_encode($j[0]) . '}';
            }else{
                echo '{"resp":"erro"}';
            }
        }

        public function apagaAluno($id)
        {
            //apaga a ficha  do aluno
            $BFetch=$this->conectaDB()->prepare("DELETE FROM alunos WHERE id=$id");
            $BFetch->execute();
            //apaga as faltas do aluno
            $BFetch=$this->conectaDB()->prepare("DELETE FROM faltas WHERE idAluno=$id");
            $BFetch->execute();
            //apaga as notas do aluno
            $BFetch=$this->conectaDB()->prepare("DELETE FROM historicos WHERE idAluno=$id");
            $BFetch->execute();
            //apaga os avisos do aluno
            $BFetch=$this->conectaDB()->prepare("DELETE FROM avisos WHERE idAluno=$id");
            $BFetch->execute();
            //remove o aluno das turmas onde estava matriculado
            $BFetch=$this->conectaDB()->prepare("DELETE FROM gradesAlunos WHERE idAluno=$id");
            $BFetch->execute();

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");

            echo '{"resp":"ok"}';
        }

        public function gravaAluno()
        {
            $json = file_get_contents('php://input');
            $obj = json_decode($json, TRUE);
            $nome = $obj['nome'];
            $endereco = $obj['endereco'];
            $cidade = $obj['cidade'];
            $uf = $obj['uf'];
            $mae = $obj['mae'];
            $pai = $obj['pai']?$obj['pai']:'';
            $fonePai = $obj['fonePai']?$obj['fonePai']:'';
            $foneMae = $obj['foneMae']?$obj['foneMae']:'';
            $responsavel = $obj['responsavel'];
            $dataNasc = $obj['dataNasc'];
            $sexo = $obj['sexo'];
            $obs = $obj['obs']?$obj['obs']:'';
         
            $sql = "INSERT INTO alunos (nome, endereco, cidade, uf, mae, pai, foneMae, fonePai, responsavel, dataNasc, sexo, obs) VALUES ('$nome', '$endereco', '$cidade', '$uf', '$mae', '$pai', '$foneMae', '$fonePai', '$responsavel', '$dataNasc', '$sexo', '$obs')";
            $BFetch=$this->conectaDB()->prepare($sql);
            $BFetch->execute();

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");
  
            echo '{"resp":"ok", "sql":"'.$sql.'"}';
        }

        public function atualizaAluno()
        {
            $json = file_get_contents('php://input');
            $obj = json_decode($json, TRUE);
            $id = $obj['id'];
            if($id){
                $nome = $obj['nome'];
                $endereco = $obj['endereco'];
                $cidade = $obj['cidade'];
                $uf = $obj['uf'];
                $mae = $obj['mae'];
                $pai = $obj['pai'];
                $fonePai = $obj['fonePai'];
                $foneMae = $obj['foneMae'];
                $responsavel = $obj['responsavel'];
                $dataNasc = $obj['dataNasc'];
                $sexo = $obj['sexo'];
                $obs = $obj['obs'];

                $sql = "UPDATE alunos SET nome = '$nome', endereco = '$endereco', cidade = '$cidade', uf = '$uf', mae = '$mae', pai = '$pai', foneMae = '$foneMae', fonePai = '$fonePai', responsavel = '$responsavel', dataNasc = '$dataNasc', sexo = '$sexo', obs = '$obs' WHERE id = $id";
                $BFetch=$this->conectaDB()->prepare($sql);
                $BFetch->execute();
            }

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");
  
            echo '{"resp":"ok"}';
        }

        public function atualizaTurmaDoAluno($id,$turma)
        {
            $sql = "UPDATE alunos SET turma = $turma WHERE id = $id";
            $BFetch=$this->conectaDB()->prepare($sql);
            $BFetch->execute();

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");
  
            return '{"resp":"ok"}';
        }

    }
    
?>