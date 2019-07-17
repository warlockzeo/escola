<?php 
    include("ClassConexao.php");

    class ClassAvisos extends ClassConexao{

        #exibir Avisos com Json
        public function listarAvisos($idAluno='')
        {
            $where = $idAluno ? 'WHERE idAluno = $idaluno' : '';
            $BFetch=$this->conectaDB()->prepare("SELECT * FROM avisos $where");
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
                    "dataPostagem"=>$Fetch['dataPostagem']
                ];
                $i++;
            }

            //header("Access-Control-Allow-Origin:*");
            //header("Content-type: application/json");

            echo json_encode($j);
        }

        public function gravaAviso()
        {
            $json = file_get_contents('php://input');
            $obj = json_decode($json, TRUE);
            $id = isset($obj['id'])?$obj['id']:0;
            $idAluno = isset($obj['idAluno'])?$obj['idAluno']:0;
            $idTurma = isset($obj['idTurma'])?$obj['idTurma']:0;
            $titulo = $obj['titulo'];
            $texto = $obj['texto'];
            $dataPostagem = $obj['dataPostagem'];
         
            if($id>0){
                $sql = "UPDATE avisos SET idAluno=$idAluno, idTurma=$idTurma, titulo='$titulo', texto='$texto', dataPostagem='$dataPostagem' WHERE id = $id";
            } else {
                $sql = "INSERT INTO avisos (idAluno, idTurma, titulo, texto, dataPostagem) VALUES ($idAluno, $idTurma, '$titulo', '$texto', '$dataPostagem')";
            }
            
            $BFetch=$this->conectaDB()->prepare($sql);
            $BFetch->execute();

            //header("Access-Control-Allow-Origin:*");
            //header("Content-type: application/json");
  
            echo '{"resp":"ok", "sql":"'.$sql.'"}';
        } 

        public function apagaAviso($id)
        {
            $BFetch=$this->conectaDB()->prepare("DELETE FROM avisos WHERE id=$id");
            $BFetch->execute();

            //header("Access-Control-Allow-Origin:*");
            //header("Content-type: application/json");

            echo '{"resp":"ok"}';
        }

    }
    
?>