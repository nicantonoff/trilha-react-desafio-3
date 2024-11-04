import { useNavigate  } from "react-router-dom";
import { MdPerson, MdEmail, MdLock } from 'react-icons/md'
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';

import { useForm } from "react-hook-form";


import { Container, Title, Column, TitleLogin, SubtitleLogin, PoliticasText, LoginText, Span, Wrapper } from './styles';

const Signup = () => {

    const navigate = useNavigate()

    const { control, handleSubmit, formState: { errors  } } = useForm({
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

    const onSubmit = async (formData) => {
        try{
            const {data} = await api.post('/users/signup', {
                nome: formData.nome,
                email: formData.email,
                senha: formData.senha
            });
            
            if(data.length && data[0].id){
                navigate('/feed') 
                return
            }

            alert('Usuário ou senha inválido')
        }catch(e){
            console.error('An error occurred:', e);
            alert('Ocorreu um erro ao tentar fazer o cadastro. Por favor, tente novamente mais tarde.');
        }
    };

    return (<>
        <Header />
        <Container>
            <Column>
                <Title>A plataforma para você aprender com experts, dominar as principais tecnologias
                 e entrar mais rápido nas empresas mais desejadas.</Title>
            </Column>
            <Column>
                <Wrapper>
                <TitleLogin>Comece agora grátis</TitleLogin>
                <SubtitleLogin>Crie sua conta e make the change._</SubtitleLogin>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input placeholder="Nome completo" leftIcon={<MdPerson style={{ color: '#8647AD' }} />} name="nome" control={control} />
                    {errors.nome && <span>Nome é obrigatório</span>}
                    <Input placeholder="E-mail" leftIcon={<MdEmail style={{ color: '#8647AD' }} />} name="email"  control={control} />
                    {errors.email && <span>E-mail é obrigatório</span>}
                    <Input type="password" placeholder="Senha" leftIcon={<MdLock style={{ color: '#8647AD' }} />}  name="senha" control={control} />
                    {errors.senha && <span>Senha é obrigatório</span>}
                    <Button title="Criar minha conta" variant="secondary"/>
                </form>
                <Column>
                    <PoliticasText>Ao clicar em "criar minha conta grátis", declaro que aceito as Políticas de Privacidade e os Termos de Uso da DIO.</PoliticasText>
                    <LoginText>Já tenho conta. <Span onClick={() => navigate('/login')}>Fazer login</Span></LoginText>
                </Column>
                </Wrapper>
            </Column>
        </Container>
    </>)
}

export { Signup }