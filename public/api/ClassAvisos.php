<?php 
    include("ClassConexao.php");

    class ClassAvisos extends ClassConexao{

        #exibir Avisos com Json
        public function listarAvisos($idAluno)
        {
            $where = $idAluno ? 'WHERE idAluno = $idaluno' : '';
            $BFetch=$this->conectaDB()->prepare("SELECT * FROM avisos $where");
            $BFetch->execute();

            $j=[];
            $i=0;
            
            while($Fetch=$BFetch->fetch(PDO::FETCH_ASSOC)){
                $j[$i]=[
                    "id"=>$Fetch['id'],
                    "titulo"=>$Fetch['titulo'],
                    "texto"=>$Fetch['texto'],
                    "foto"=>$Fetch['foto'],
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
            $idAluno = $obj['idAluno'];
            $titulo = $obj['titulo'];
            $texto = $obj['texto'];
            $foto = $obj['foto'];
            $dataPostagem = $obj['dataPostagem'];
         
            $sql = "INSERT INTO avisos (idAluno, titulo, texto, foto, dataPostagem) VALUES ('$idAluno', $titulo, $texto, '$foto', '$dataPostagem')";
            $BFetch=$this->conectaDB()->prepare($sql);
            $BFetch->execute();

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");
  
            echo '{"resp":"ok", "sql":"'.$sql.'"}';
        } 

    }
    
?>