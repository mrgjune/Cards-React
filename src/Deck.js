import React from 'react';
import Card from "./Card";
import axios from "axios"


const BASE_API_URL = "https://deckofcardsapi.com/api/deck"

class Deck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deckId: '',
            cardKeys : [],
            imgs: [],
            cardsRemaining:52
        }
        this.getCard = this.getCard.bind(this)
    }

    // get deck ID, store in this.state.deckId
    async componentDidMount(){
        let response = await axios.get(`${BASE_API_URL}/new/`)
        this.setState({
            deckId: response.data.deck_id
        })
    }    

    async getCard() {
        if (this.state.cardsRemaining === 0){
            alert("No cards left!");
        } 
        
        let response = await axios.get(`${BASE_API_URL}/${this.state.deckId}/draw/?count=1`)
            
        let cardImg = response.data.cards[0].image;
        let cardsRemaining = response.data.remaining;
        let cardKey = response.data.cards[0].code;

        this.setState ({
            cardKeys: this.state.cardKeys.concat(cardKey),
            imgs : this.state.imgs.concat(cardImg),
            cardsRemaining: cardsRemaining
        })

    }

    render() {
        const cards = this.state.imgs.map((url, idx) => 
            <Card imgURL={url} key={this.state.cardKeys[idx]}/>);

        return (
            <div>
                <button onClick={this.getCard} >Gimme a Card!</button>
                {cards}
            </div>
        )
    }


}

export default Deck; 