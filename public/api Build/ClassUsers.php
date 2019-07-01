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

            //header("Access-Control-Allow-Origin:*");
            //header("Content-type: application/json");

            echo json_encode($j);
        }

        public function apagaUser($id)
        {
            //apaga user
            $BFetch=$this->conectaDB()->prepare("DELETE FROM users WHERE id=$id");
            $BFetch->execute();

            //header("Access-Control-Allow-Origin:*");
            //header("Content-type: application/json");

            echo '{"resp":"ok"}';
        }

        public function gravaUser()
        {
            $json = file_get_contents('php://input');
            $obj = json_decode($json, TRUE);
            $user = $obj['user'];
            $senha = md5("seguranca".$obj['senha']);
            $idAluno = $obj['idAluno'];
         
            $sql = "INSERT INTO users (user, senha, idAluno) VALUES ('$user', '$senha', $idAluno)";
            $BFetch=$this->conectaDB()->prepare($sql);
            $BFetch->execute();

            //header("Access-Control-Allow-Origin:*");
            //header("Content-type: application/json");
  
            echo '{"resp":"ok", "sql":"'.$sql.'"}';
        }

        public function atualizaUser()
        {
            $json = file_get_contents('php://input');
            $obj = json_decode($json, TRUE);
            $id = $obj['id'];
            if($id){
                $user = $obj['user'];
                $senha = md5("seguranca".$obj['senha']);
                $idAluno = $obj['idAluno'];

                $sql = "UPDATE users SET user = '$user', senha = '$senha', idAluno = $idAluno WHERE id = $id";
                $BFetch=$this->conectaDB()->prepare($sql);
                $BFetch->execute();
            }

            //header("Access-Control-Allow-Origin:*");
            //header("Content-type: application/json");
  
            echo '{"resp":"ok", "sql":"'.$sql.'"}';
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

            //header("Access-Control-Allow-Origin:*");
            //header("Content-type: application/json");
  
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

                $sql = "SELECT u.user, u.senha, u.idAluno, u.nivel FROM users as u  WHERE u.user = '$user' AND u.senha = '$senha'";
                $BFetch=$this->conectaDB()->prepare($sql);
                $BFetch->execute();

                while($Fetch=$BFetch->fetch(PDO::FETCH_ASSOC)){

                    $sql2 = "SELECT * FROM alunos WHERE id = $Fetch[idAluno]";
                    $BFetch2=$this->conectaDB()->prepare($sql2);
                    $BFetch2->execute();
        
                    $Fetch2=$BFetch2->fetch(PDO::FETCH_ASSOC);
                    $j[0]=[
                        "id"=>$Fetch2['id'],
                        "nome"=>$Fetch2['nome'],
                        "endereco" => $Fetch2['endereco'],
                        "cidade" => $Fetch2['cidade'],
                        "uf" => $Fetch2['uf'],
                        "mae" => $Fetch2['mae'],
                        "pai" => $Fetch2['pai'],
                        "fonePai" => $Fetch2['fonePai'],
                        "foneMae" => $Fetch2['foneMae'],
                        "responsavel" => $Fetch2['responsavel'],
                        "dataNasc" => $Fetch2['dataNasc'],
                        "sexo" => $Fetch2['sexo'],
                        "obs" => $Fetch2['obs'],
                        "user" => $Fetch['user'],
                        "nivel" => $Fetch['nivel']
                    ];
                }
            }

            //header("Access-Control-Allow-Origin:*");
            //header("Content-type: application/json");
  
            if(isset($j[0])){
                echo '{"resp":' . json_encode($j[0]) . '}';
            }else{
                echo '{"resp":"erro", "sql":"'.$sql.'"}';
            }
            
        }

        public function verificarUser($id){
            $sql = "SELECT * FROM users WHERE idAluno = $id";
            $BFetch=$this->conectaDB()->prepare($sql);
            $BFetch->execute();
            $Fetch=$BFetch->fetch(PDO::FETCH_ASSOC);

            //header("Access-Control-Allow-Origin:*");
            //header("Content-type: application/json");

            if($Fetch['id']==''){
                echo '{"resp":"erro", "sql":"'.$sql.'"}';
            } else {
                echo '{"resp":"ok", "id":"'.$Fetch['id'].'", "sql":"'.$sql.'"}';
            }
        }

    }
    
?>