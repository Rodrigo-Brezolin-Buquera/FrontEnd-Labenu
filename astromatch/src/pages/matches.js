import ListaMatches from "../components/listaMatches/ListaMatches";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Logo from '../assets/logoAstromatch.png';
import Button from '@material-ui/core/Button';
import {LogoAstro, HeaderCard, ContButtons, ContMatches} from "./Styled";

export default function Matches(props) {
  
  return (
    <Card >
      <ContMatches>
        <HeaderCard >

          <LogoAstro src={Logo} alt="Astromatch logo "/>

          <Button size="small">
            <PersonAddIcon 
              fontSize="large" 
              onClick={props.changePage}/>
          </Button>    
                          
        </HeaderCard>
              
        <ListaMatches/>
            
        <ContButtons>

          <Button 
            variant="contained" 
            color="primary"
            onClick={props.clearMatches}
          >Limpar tudo
          </Button>

        </ContButtons> 
      </ContMatches>
    </Card>
  );
}
