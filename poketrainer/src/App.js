import React from "react";
import styled from "styled-components";
import axios from "axios";

const ContainerCards = styled.div`
 display: flex;
 flex-wrap: wrap;
 gap: 5px;
`
const Cards = styled.div`
 display: flex;
 flex-direction: column;
 border: 1px solid black;
 padding: 0 3px;
`
const BP = styled.div`
font-weight: bold;
`

export default class App extends React.Component {
    state = {
      list: [],
      team: [],
      pokemon: {},
      nomePoke: ""
    }

    componentDidMount() {
      this.getPokemon();
    }

    componentDidUpdate(){
      if (this.state.team.length === 6){
        alert("Você chegou no limite do seu time, se você adicionar mais algum seu time será apagado")
      }
      if (this.state.team.length > 6){
        alert("Você foi avisado")
        this.setState({team: []})
      }
    }

    getPokemon = () => {    
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=891&offset=0")
    .then((res)=>{ this.setState({list:res.data.results})})
    .catch(()=>{alert("Erro ao carregar do servidor")})
    }

    handlePoke = (e) => {
      this.setState({pokemon: e.target.value})
    }

    handleNome = (e) => {
      this.setState({nomePoke: e.target.value})
    }

    clearTeam =() =>{
      this.setState({team: []})
    }

    addPoke = () => {
      const url = this.state.pokemon
      axios.get(url)
      .then((res)=>{ 
        this.setState({team: [...this.state.team, res.data ]})      
      }).catch(()=>{alert("erro ao selecionar lista")})
    }

    addPokeNome = () => {
      const URL = `https://pokeapi.co/api/v2/pokemon/${this.state.nomePoke}/`
      axios.get(`${URL}`)
      .then((res)=>{
        this.setState({
          team: [...this.state.team, res.data ],
          nomePoke: ""
        })  
      })
      .catch(()=>{alert("nome/id inválido")})
    }

    randomPoke = () => {
      const random = Math.floor(Math.random() * 891 + 1)
       const URL =`https://pokeapi.co/api/v2/pokemon/${random}`
      axios.get(`${URL}`)
      .then((res)=>{
        this.setState({team: [...this.state.team, res.data ]})  
      })
      .catch(()=>{alert("erro no número aleatório")})
    }

    render () {
      const pokeList = this.state.list.map((poke) =>{
        return (<option key={poke.name} value={poke.url}> {poke.name} </option>)
      })
    
      const PokeTeam = this.state.team.map((poke) =>{
        return <Cards>
           <img src={poke.sprites.front_default}/>
           <BP>Nome:</BP>
           <p>{poke.name}</p>
           <BP>Tipo(s):</BP>
           <p>{poke.types.map((t)=> {return <div>{t.type.name}</div>})}</p>
           <BP>Habidade(s):</BP>
           <p>{poke.abilities.map((a)=> {return <div>{a.ability.name}</div>})}</p>
           <BP>Status:</BP>
           <p>{poke.stats.map((s)=> {return <div>{s.stat.name}: {s.base_stat} </div>})}</p>
        </Cards>
      })
    
      return (
      <div>
        <h1>Bem vindo treinador pokemon</h1>
        <h3>Escolha seu time:</h3>

        <div>
        <p>Escolha pela lista:</p>       
        <select onChange={this.handlePoke} >  
          <option>Escolha um pokemon</option>
          {pokeList}
        </select>   
        <button onClick={this.addPoke}>Selecionar</button> 
        </div>

        <div>
          <p>Escolha por nome ou ID:</p>
          <input 
          placeholder="nome" 
          value={this.state.nomePoke} 
          onChange={this.handleNome}
          ></input>   
          <button onClick={this.addPokeNome}>Selecionar</button> 
        </div>

        <div>
          <p>Ou sorteie:</p>  
          <button onClick={this.randomPoke}>Selecionar aleatório</button> 
        </div>

        <hr/>
        <button onClick={this.clearTeam}>Recomeçe do zero</button>        
        <hr/>
        <ContainerCards >
        {PokeTeam}
        </ContainerCards>
      </div>
      )
  } 
}


