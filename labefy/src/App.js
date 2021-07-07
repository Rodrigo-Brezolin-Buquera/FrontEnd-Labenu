import React from "react";
import styled from "styled-components";
import axios from "axios";
import './App.css';
import beemo2 from "./img/Beemo2.png"
import beemo from "./img/Beemo.png"
// import Forms from "./components/Forms/Forms";
// import Playlists from "./components/Playlists/Playlists";
// import Musics from "./components/Musics/Musics";

const Img = styled.img`
max-width: 90px;
max-height: 120px;
`

const Img2 = styled.img`
max-width: 90px;
max-height: 120px;
`
const MainContainer = styled.div`
width: 100vw;
height: 100vh;
display: flex;
flex-direction: column;
background-color: #000000; 
color: #ffffff;
`
const Header = styled.div`
display: flex;
justify-content: space-evenly;
align-items: center;
width: 100vw;
height:15%; 
background-color: #000000; 
color: #ffffff;
`
const ContainerItens = styled.div`
width: 100%;
height: 60%;
display: flex;
background-color: #000000; 
color: #ffffff;
gap: 5px;
`

const ContainerForms =styled.div`
display: flex;
flex-direction: column;
justify-content: space-evenly;
width: 20%;
align-items: flex-start;
border: 1px solid #4fd761;
height: 100%;
background-color: #000000; 
color: #ffffff;
`
const ContainerCP = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 10px;
width: 100%;
`

const ContainerCM = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 10px;
width: 100%;
`

const ContainerPlaylists =styled.div`
display: flex;
flex-direction: column;
width: 30%;
border: 1px solid #4fd761;
color: #ffffff;
gap: 15px;
padding: 5px;
`
const Playlists = styled.div`
display: flex;
justify-content: space-between;
background-color: #000000; 
color: #ffffff;
`

const ContainerMusics =styled.div`
display: flex;
flex-direction: column;
width: 50%;
border: 1px solid #4fd761;
background-color: #000000; 
color: #ffffff;
gap: 15px;
padding: 5px;
`

const Musics =styled.div`
display: flex;
justify-content: space-between;
background-color: #000000; 
color: #ffffff;
`

const Playing = styled.div`
display: flex;
justify-content: space-evenly;
align-items: center;
border: 1px solid #4fd761;
width: 100%;
background-color: #000000; 
color: #ffffff;
height: 15%;
margin-top: 5px;
`
const NowPlaying = styled.div`
display: flex;
gap:1em;
` 
const GreenButton = styled.button`
color: #2c4dab ;
background-color: #4fd761;
border-radius: 500px;
padding: 5px 8px;

&:hover{
  cursor: pointer;
  background-color: #2ea93e;
}
`
const GreenP = styled.p`
font-weight: bolder;
&:hover{
  cursor: pointer;
  color: #4fd761;
}
`

const baseURL = "https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists"
const headers = { headers: { Authorization: "rodrigo-brezolin-paiva"}}

export default class App extends React.Component { 
  state = { 
    playlists: [],
    inputPlaylist: "",
    musics: [],
    inputMusic: "",
    inputArtist: "",
    inputURL: "",
    idPlay: "",
    playButton: false,
    nowPlaying: {}
  }

  componentDidMount () {
    this.getPlaylists()
  }

  getPlaylists = () => {
    axios.get(baseURL, headers)
    .then((res)=>{
      this.setState({playlists: res.data.result.list})
    })
    .catch((err)=>{
      alert(err.message)
    })
  }

  handlePlaylist = (e) => {
    this.setState({inputPlaylist: e.target.value})
  }

  handleIDPlaylist = (id) => {
    this.setState({
      addMusic: !this.state.addMusic,
      idPlay: id
    })
  }

  handleMusic = (e) => {
    this.setState({inputMusic: e.target.value})
  }

  handleArtist = (e) => {
    this.setState({inputArtist: e.target.value})
  }

  handleUrl = (e) => {
    this.setState({inputURL: e.target.value})
  }

  addPlaylist = () => {
    const body = { name: `${this.state.inputPlaylist}`}
    axios.post(baseURL, body, headers)
    .then((res)=>{
      this.getPlaylists()
    })
    .catch((err)=>{
      alert(err.message)
    })
  }

  deletePlay = (id) => {
    const URL = `${baseURL}/${id}`
    axios.delete(URL, headers)
    .then((res)=>{
      alert("playlist excluida")
      this.getPlaylists()
    })
    .catch((err)=>{
      alert(err.message)
    })
  }

  selectPlay = (id) => {
    const URL = `${baseURL}/${id}/tracks`
    axios.get(URL, headers)
    .then((res)=>{
      this.setState({
        musics: res.data.result.tracks,
        idPlay: id
      })
    })
    .catch((err)=>{
      alert(err.message)
    })
  }

  addMusic = () => {
    const URL = `${baseURL}/${this.state.idPlay}/tracks` 
    const body = { 
      name: `${this.state.inputMusic}`, 
      artist: `${this.state.inputArtist}`,
      url: `${this.state.inputURL}`
    }
    axios.post(URL, body, headers)
    .then((res)=>{
      this.selectPlay(this.state.idPlay)
      this.setState({
        inputMusic: "",
        inputArtist: "",
        inputURL: "",
      })
    })
    .catch((err)=>{
      alert(err.message)
    })
  }

  playMusic = (music) => {
    this.setState({ 
      nowPlaying: music,
      playButton: !this.state.playButton
    })   
         
  }

  deleteTrack = (id) => {
    const URL = `${baseURL}/${this.state.idPlay}/tracks/${id}`
    console.log(`${URL}`)
    axios.delete(`${URL}`, headers)
    .then((res)=>{
        this.selectPlay(this.state.idPlay)
    })
    .catch((err)=>{
      alert(err.message)
    })
  }

  render () {
    
    return (
      <MainContainer>
        <Header>
          <h1>Bem vindo a Labefy</h1>
          <h3>As melhores playlists desconhecidas</h3>
          <Img src={beemo2}/>
        </Header>
        
        <ContainerItens> 
          <ContainerForms>
            <ContainerCP>
              <h3>Crie sua playlist</h3>
              <input 
              placeholder="nome playlist"
              onChange={this.handlePlaylist}
              value= {this.state.inputPlaylist}
              ></input>
              <GreenButton onClick={this.addPlaylist} >Crie a playlists</GreenButton>                        
            </ContainerCP>
            
            {this.state.addMusic && 
            <ContainerCM>
              <h3>Adicone sua Música:</h3>
              
              <input
                placeholder="nome"
                onChange={this.handleMusic}
                value= {this.state.inputMusic}              
              ></input>
              
              <input
                placeholder="artista"
                onChange={this.handleArtist}
                value= {this.state.inputArtist}
              
              ></input>
              <input
                placeholder="url"
                onChange={this.handleUrl}
                value= {this.state.inputURL}
              ></input>

              <GreenButton  onClick={this.addMusic}> Adicionar</GreenButton>

            </ContainerCM>
            }
          </ContainerForms>

          <ContainerPlaylists>
            <h3>Suas playlists:</h3>
            <hr/>
            {this.state.playlists.map((pl)=>{
              return <Playlists key={pl.id}>
                <GreenP  onClick={()=> this.selectPlay(pl.id)} >{pl.name}</GreenP>
                <div>
                  <GreenButton onClick={()=> this.handleIDPlaylist(pl.id)} >Add Música</GreenButton>
                  <GreenButton onClick={()=> this.deletePlay(pl.id)} >Deletar</GreenButton>
                </div>
              </Playlists> 
            })}            
          </ContainerPlaylists>

          <ContainerMusics>
            <h3>Músicas da playlist:</h3>
            <hr/>
            {this.state.musics.map((music) =>{
              return <Musics key={music.id} >
                  <p>Música: {music.name}</p>
                  <p>Artista: {music.artist}</p>
                  <div>
                    <GreenButton onClick={()=> this.playMusic(music)}>Tocar</GreenButton>                  
                    <GreenButton onClick={()=> this.deleteTrack(music.id)}>Exluir</GreenButton>
                  </div>
              </Musics>
            })}
          </ContainerMusics>          
        </ContainerItens>
        
        { this.state.playButton && 
        <Playing> 

          <Img2 src={beemo}/>

          <NowPlaying >
            <h3>Tocando agora:</h3>
            <h3>{this.state.nowPlaying.name}</h3>
            <h3>-</h3>
            <h3>  {this.state.nowPlaying.artist}</h3>
          </NowPlaying>
          <audio  controls autoplay>
            <source src={this.state.nowPlaying.url}></source>
          </audio>           
        </Playing> }
      </MainContainer>
    )
  }
}