<?php 
    include_once("ClassConexao.php");

    class ClassAvisos extends ClassConexao{

        #exibir Avisos com Json
        public function listarAvisos($idAluno = "")
        {
            $where = $idAluno ? "WHERE idAluno = $idAluno" : "";
            $sql = "SELECT * FROM avisos $where";
            $BFetch=$this->conectaDB()->prepare($sql);
            $BFetch->execute();

            $j=[];
            $i=0;
            
            while($Fetch=$BFetch->fetch(PDO::FETCH_ASSOC)){
                $j[$i]=[
                    "id"=>$Fetch['id'],
                    "idAluno"=>$Fetch['idAluno'],
                    "idTurma"=>$Fetch['idTurma'],
                    "titulo"=>$Fetch['titulo'],
                    "texto"=>$Fetch['texto'],
                    "foto"=>$Fetch['foto'],
                    "todos"=>$Fetch['todos'],
                    "status"=>$Fetch['status'],
                    "validade"=>$Fetch['validade'],
                    "dataPostagem"=>$Fetch['dataPostagem']
                ];
                $i++;
            }

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");

            echo json_encode($j);
        }

        public function gravaAviso()
        {
            $json = file_get_contents('php://input');
            $obj = json_decode($json, TRUE);
            $id = isset($obj['id'])?$obj['id']:0;
            $idAluno = isset($obj['aluno'])?$obj['aluno']:0;
            $idTurma = isset($obj['turma'])?$obj['turma']:0;
            $todos = isset($obj['todos'])?1:0;
            $titulo = $obj['titulo'];
            $texto = $obj['texto'];
            $dataPostagem = $obj['dataPostagem'];
         
            if($id>0){
                $sql = "UPDATE avisos SET idAluno=$idAluno, idTurma=$idTurma, titulo='$titulo', texto='$texto', dataPostagem='$dataPostagem' WHERE id = $id";
            } else {
                $sql = "INSERT INTO avisos (idAluno, idTurma, titulo, texto, dataPostagem, todos) VALUES ($idAluno, $idTurma, '$titulo', '$texto', '$dataPostagem', $todos)";
            }

            $BFetch=$this->conectaDB()->prepare($sql);
            $BFetch->execute();

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");
  
            echo '{"resp":"ok", "sql":"'.$sql.'"}';
        } 

        public function apagaAviso($id)
        {
            $BFetch=$this->conectaDB()->prepare("DELETE FROM avisos WHERE id=$id");
            $BFetch->execute();

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");

            echo '{"resp":"ok"}';
        }

    }
    
?>