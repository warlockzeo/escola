
<?php 
    if($_GET['tabela']=='alunos'){
        include("ClassAlunos.php");

        $alunos=new ClassAlunos();

        if($_GET['opcao']=='listar'){
            $alunos->listaAlunos();
        } 

        if($_GET['opcao']=='alunosComMatricula'){
            $alunos->listaAlunosComMatricula($_GET['ano']);
        } 

        if($_GET['opcao']=='alunosSemMatricula'){
            $alunos->listaAlunosSemMatricula($_GET['ano']);
        } 

        if($_GET['opcao']=='exibir'){
            $alunos->exibeAluno($_GET['id']);
        } 
        
        elseif($_GET['opcao']=='apagar') {
            $alunos->apagaAluno($_GET['id']);    
        }
    
        elseif($_GET['opcao']=='gravar') {
            $alunos->gravaAluno();
        }
    
        elseif($_GET['opcao']=='atualizar') {
            $alunos->atualizaAluno();
        }

        elseif($_GET['opcao']=='gravarNota'){
            $alunos->gravarNota();
        }

    }

    elseif($_GET['tabela']=='turmas'){
        include("ClassTurmas.php");

        $turma=new ClassTurmas();

        if($_GET['opcao']=='listarAnos'){
            $turma->listarAnos();
        }

        elseif($_GET['opcao']=='listar'){
            $turma->listarTurmas($_GET['ano']);
        }

        elseif($_GET['opcao']=='gravar'){
            $turma->gravaTurma();
        }

        elseif($_GET['opcao']=='atualizar'){
            $turma->atualizaTurma();
        }

        elseif($_GET['opcao']=='apagar'){
            $turma->apagaTurma($_GET['id']);
        }

        elseif($_GET['opcao']=='mostrar'){
            $turma->exibeTurma($_GET['turma']);
        }
    }

    elseif($_GET['tabela']=='gradesAlunos'){
        include("ClassGradesAlunos.php");

        $gradeAlunos=new ClassGradeAlunos();

        if($_GET['opcao']=='mostrar'){
            $gradeAlunos->mostraGrade($_GET['turma']);
        }

        elseif($_GET['opcao']=='gravar'){
            $gradeAlunos->gravaGrade();
        }

        elseif($_GET['opcao']=='atualizar'){
            $gradeAlunos->atualizaGrade();
        }

        elseif($_GET['opcao']=='apagar'){
            $gradeAlunos->apagaGrade($_GET['id']);
        }
    }

    elseif($_GET['tabela']=='gradesCurriculares'){
        include("ClassGradesCurriculares.php");

        $gradeCurricular=new ClassGradesCurriculares();

        if($_GET['opcao']=='mostrar'){
            $gradeCurricular->mostraGrade($_GET['serie']);
        }

        if($_GET['opcao']=='listar'){
            $gradeCurricular->listaGrades();
        }

        elseif($_GET['opcao']=='gravar'){
            $gradeCurricular->gravaGrade();
        }

        elseif($_GET['opcao']=='apagar'){
            $gradeCurricular->apagaGrade($_GET['id']);
        }
    }

    elseif($_GET['tabela']=='disciplinas'){
        include("ClassDisciplinas.php");

        $disciplina=new ClassDisciplinas();

        if($_GET['opcao']=='listar'){
            $disciplina->listaDisciplinas();
        }

        elseif($_GET['opcao']=='gravar'){
            $disciplina->gravaDisciplina();
        }

        elseif($_GET['opcao']=='apagar'){
            $disciplina->apagaDisciplina($_GET['id']);
        }
    }

    elseif($_GET['tabela']=='professores'){
        include("ClassProfessores.php");

        $professores=new ClassProfessores();

        if($_GET['opcao']=='listar'){
            $professores->listaProfessores();
        }

        elseif($_GET['opcao']=='gravar'){
            $professores->gravaProfessores();
        }

        elseif($_GET['opcao']=='apagar'){
            $professores->apagaProfessores($_GET['id']);
        }
    }

    elseif($_GET['tabela']=='faltas'){
        include("ClassFaltas.php");

        $falta=new ClassFaltas();

        if($_GET['opcao']=='listarFalta'){
            $falta->listarFaltas($_GET['idAluno'], $_GET['idTurma']);
        }

        elseif($_GET['opcao']=='gravar'){
            $falta->gravaFalta();
        }

        elseif($_GET['opcao']=='justificar'){
            $falta->justificaFalta();
        }
    }

    elseif($_GET['tabela']=='avisos'){
        include("ClassAvisos.php");

        $aviso=new ClassAvisos();

        if($_GET['opcao']=='listar'){
            $aviso->listarAvisos();
        }

        elseif($_GET['opcao']=='listarAvisoAluno'){
            $aviso->listarAvisos($_GET['idAluno']);
        }

        elseif($_GET['opcao']=='gravar'){
            $aviso->gravaAviso();
        }

        elseif($_GET['opcao']=='apagar'){
            $aviso->apagaAviso($_GET['id']);
        }
    }

    elseif($_GET['tabela']=='historicos'){
        include("ClassHistoricos.php");

        $historico=new ClassHistoricos();

        if($_GET['opcao']=='listar'){
            $historico->listarHistoricos($_GET['idAluno']);
        }

        elseif($_GET['opcao']=='atualizar') {
            $historico->atualizaHistorico();
        }
    }

    elseif($_GET['tabela']=='users'){
        include("ClassUsers.php");

        $users=new ClassUsers();

        if($_GET['opcao']=='listar'){
            $users->listaUsers();
        } 

        elseif($_GET['opcao']=='apagar') {
            $users->apagaUser($_GET['id']);    
        }
    
        elseif($_GET['opcao']=='gravar') {
            $users->gravaUser();
        }
    
        elseif($_GET['opcao']=='atualizar') {
            $users->atualizaUser();
        }

        elseif($_GET['opcao']=='mudarSenha'){
            $users->mudaSenha();
        }

        elseif($_GET['opcao']=='verificarSenha'){
            $users->verificarSenha();
        }

        elseif($_GET['opcao']=='verificaUser'){
            $users->verificarUser($_GET['id']);
        }

    }
    
    else{
        include("ClassEmail.php");

        $email=new ClassEmail();

        if($_GET['opcao']=='enviarEmail'){
            $email->enviarEmail();
        }
    }
?>