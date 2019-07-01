<?php 
    include_once("ClassConexao.php");

    class ClassProfessores extends ClassConexao {

        #exibir Professores com Json
        public function listaProfessores()
        {
            $sql = "SELECT * FROM professores ORDER BY nome ASC";
            $BFetch=$this->conectaDB()->prepare($sql);
            $BFetch->execute();

            $j=[];
            $i=0;
            
            while($Fetch=$BFetch->fetch(PDO::FETCH_ASSOC)){
                $j[$i]=[
                    "id"=>$Fetch['id'],
                    "nome"=>$Fetch['nome']
                ];
                $i++;
            }

            //header("Access-Control-Allow-Origin:*");
            //header("Content-type: application/json");

            if(count($j)>0){
                $data = json_encode($j);
                echo '{"resp":"ok","data":'.$data.'}';
            } else {
                echo '{"resp":"erro","sql":"'.$sql.'"}';
            }
        }

        public function apagaProfessores($id)
        {
            $BFetch=$this->conectaDB()->prepare("DELETE FROM professores WHERE id=$id");
            $BFetch->execute();

            //header("Access-Control-Allow-Origin:*");
            //header("Content-type: application/json");

            echo '{"resp":"ok"}';
        }

        public function gravaProfessores()
        {
            $json = file_get_contents('php://input');
            $obj = json_decode($json, TRUE);
            $nome = $obj['nome'];
         
            $sql = "INSERT INTO professores (nome) VALUES ('$nome')";
            $BFetch=$this->conectaDB()->prepare($sql);
            $BFetch->execute();

            //header("Access-Control-Allow-Origin:*");
            //header("Content-type: application/json");
  
            echo '{"resp":"ok", "sql":"'.$sql.'"}';
        }

    }
    
?>