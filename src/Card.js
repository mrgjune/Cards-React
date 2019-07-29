import React from 'react';


class Card extends React.Component {
    render(){
        return(
            <img src={this.props.imgURL} alt="card"/>
        )
    }
}

export default Card;