<?php 
    include("ClassConexao.php");

    class ClassUsers extends ClassConexao{

        #exibir lista completa de Usuários
        public function listaUsers()
        {
            $sql = "SELECT * FROM users ORDER BY user ASC";
            $BFetch=$this->conectaDB()->prepare($sql);
            $BFetch->execute();

            $j=[];
            $i=0;
            
            while($Fetch=$BFetch->fetch(PDO::FETCH_ASSOC)){
                $j[$i]=[
                    "id"=>$Fetch['id'],
                    "user"=>$Fetch['user'],
                    "nivel" => $Fetch['nivel'],
                    "idAluno" => $Fetch['idAluno']
                ];
                $i++;
            }

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");

            echo json_encode($j);
        }

        public function apagaUser($id)
        {
            //apaga user
            $BFetch=$this->conectaDB()->prepare("DELETE FROM users WHERE id=$id");
            $BFetch->execute();

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");

            echo '{"resp":"ok"}';
        }

        public function gravaUser()
        {
            $json = file_get_contents('php://input');
            $obj = json_decode($json, TRUE);
            $user = $obj['user'];
            $nivel = $obj['nivel'];
            $idAluno = $obj['idAluno'];
         
            $sql = "INSERT INTO users (user, nivel, idAluno) VALUES ('$user', $nivel, $idAluno)";
            $BFetch=$this->conectaDB()->prepare($sql);
            $BFetch->execute();

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");
  
            echo '{"resp":"ok", "sql":"'.$sql.'"}';
        }

        public function atualizaUser()
        {
            $json = file_get_contents('php://input');
            $obj = json_decode($json, TRUE);
            $id = $obj['id'];
            if($id){
                $user = $obj['user'];
                $nivel = $obj['nivel'];
                $idAluno = $obj['idAluno'];

                $sql = "UPDATE users SET user = '$user', nivel = $nivel, idAluno = $idAluno WHERE id = $id";
                $BFetch=$this->conectaDB()->prepare($sql);
                $BFetch->execute();
            }

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");
  
            echo '{"resp":"ok"}';
        }

        public function mudarSenha()
        {
            $json = file_get_contents('php://input');
            $obj = json_decode($json, TRUE);
            $id = $obj['id'];
            if($id){
                $user = $obj['user'];
                $senha = md5("seguranca".$obj['senha']);

                $sql = "UPDATE users SET user = '$user', senha = '$senha' WHERE id = $id";
                $BFetch=$this->conectaDB()->prepare($sql);
                $BFetch->execute();
            }

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");
  
            echo '{"resp":"ok"}';
        }

        public function verificarSenha()
        {
            $json = file_get_contents('php://input');
            $obj = json_decode($json, TRUE);
            $user = $obj['user'];
            $senha = $obj['senha'];
            if($user&$senha){

                $senha = md5("seguranca".$obj['senha']);

                $sql = "SELECT u.user, u.senha, u.idAluno, u.nivel, a.* FROM alunos as a LEFT JOIN users as u  on a.id = u.idAluno WHERE u.user = '$user' AND u.senha = '$senha'";
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
                        "user" => $Fetch['user'],
                        "nivel" => $Fetch['nivel']

                    ];
                    $i++;
                }
                
            }

            header("Access-Control-Allow-Origin:*");
            header("Content-type: application/json");
  
            if(count($j)>0){
                echo '{"resp":' . json_encode($j[0]) . '}';
            }else{
                echo '{"resp":"erro", "sql":"'.$sql.'"}';
                //echo $sql;
            }
            
        }


    }
    
?>